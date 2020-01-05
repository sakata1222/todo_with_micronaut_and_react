package jp.gr.java_conf.saka.todo.server.infrastrcture.rdb;

import static jp.gr.java_conf.saka.todo.server.infrastrcture.rdb.h2db.jooq.autogen.Tables.TASK;

import java.util.List;
import java.util.Optional;
import javax.inject.Inject;
import javax.inject.Singleton;
import jp.gr.java_conf.saka.todo.server.domain.model.entity.Task;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskId;
import jp.gr.java_conf.saka.todo.server.domain.repository.ITaskRepository;
import org.jooq.DSLContext;

@Singleton
public class TaskRdbRepository implements ITaskRepository {

  @Inject
  private DSLContext dslContext;

  @Inject
  private TaskRdbTranslator translator;

  @Override
  public TaskId saveAsNew(Task task) {
    var newRecord = translator.toRecord(task, () -> dslContext.newRecord(TASK));
    newRecord.store();
    return TaskId.of(newRecord.getId());
  }

  @Override
  public TaskId saveAsUpdate(Task task) {
    var existingRecord = dslContext.fetchOne(TASK, TASK.ID.eq(task.getIdAsLong()));
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
  public Optional<Task> findById(TaskId id) {
    return Optional.ofNullable(
      dslContext.fetchOne(TASK, TASK.ID.eq(id.getId()))
    ).map(translator::toDomainEntity);
  }

  @Override
  public void delete(Task task) {
    dslContext
      .deleteFrom(TASK)
      .where(TASK.ID.eq(task.getIdAsLong()))
      .execute();
  }
}
