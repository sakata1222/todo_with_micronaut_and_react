package jp.gr.java_conf.saka.todo.server.infrastrcture.rdb;

import static jp.gr.java_conf.saka.todo.server.infrastrcture.rdb.h2db.jooq.autogen.Tables.TASK;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.inject.Inject;
import javax.inject.Singleton;
import jp.gr.java_conf.saka.todo.server.domain.model.task.ITaskRepository;
import jp.gr.java_conf.saka.todo.server.domain.model.task.Task;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskId;
import jp.gr.java_conf.saka.todo.server.domain.specification.ISpecification;
import org.jooq.DSLContext;

@Singleton
public class TaskRdbRepository implements ITaskRepository {

  @Inject
  private DSLContext dslContext;

  @Inject
  private TaskRdbTranslator translator;

  public TaskRdbRepository(DSLContext dslContext,
    TaskRdbTranslator translator) {
    this.dslContext = dslContext;
    this.translator = translator;
  }

  @Override
  public TaskId saveAsNew(Task task) {
    var newRecord = translator.toRecord(task, () -> dslContext.newRecord(TASK));
    newRecord.store();
    return TaskId.of(newRecord.getId());
  }

  @Override
  public TaskId saveAsUpdate(Task task) {
    var existingRecord = dslContext.fetchOne(TASK, TASK.ID.eq(task.getIdAsValue()));
    translator.toRecord(task, () -> existingRecord);
    existingRecord.store();
    return TaskId.of(existingRecord.getId());
  }

  @Override
  public List<Task> findAll() {
    return dslContext
      .fetch(TASK)
      .map(translator::toDomainEntity);
  }

  @Override
  public Optional<Task> find(TaskId id) {
    return dslContext.fetchOptional(TASK, TASK.ID.eq(id.toStringValue()))
      .map(translator::toDomainEntity);
  }

  @Override
  public List<Task> find(ISpecification<Task> specification) {
    return dslContext.fetchStream(TASK)
      .map(translator::toDomainEntity)
      .filter(specification::isSatisfiedBy)
      .collect(Collectors.toList());
  }

  @Override
  public boolean hasItem(ISpecification<Task> specification) {
    return find(specification).size() >= 1;
  }

  @Override
  public void delete(TaskId id) {
    dslContext
      .deleteFrom(TASK)
      .where(TASK.ID.eq(id.toStringValue()))
      .execute();
  }
}
