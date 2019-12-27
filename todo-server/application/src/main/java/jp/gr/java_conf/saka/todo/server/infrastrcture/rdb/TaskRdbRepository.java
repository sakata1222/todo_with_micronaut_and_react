package jp.gr.java_conf.saka.todo.server.infrastrcture.rdb;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.inject.Inject;
import javax.inject.Singleton;
import jp.gr.java_conf.saka.todo.server.domain.model.entity.Task;
import jp.gr.java_conf.saka.todo.server.domain.repository.ITaskRepository;
import jp.gr.java_conf.saka.todo.server.infrastrcture.rdb.h2db.jooq.autogen.Tables;
import jp.gr.java_conf.saka.todo.server.infrastrcture.rdb.h2db.jooq.autogen.tables.JooqTask;
import jp.gr.java_conf.saka.todo.server.infrastrcture.rdb.h2db.jooq.autogen.tables.pojos.JooqTaskDto;
import org.jooq.DSLContext;

@Singleton
public class TaskRdbRepository implements ITaskRepository {

  @Inject
  private DSLContext dslContext;

  @Inject
  private TaskRdbTranslator translator;

  @Override
  public void save(Task task) {

  }

  @Override
  public List<Task> findAll() {
    JooqTask task = Tables.TASK;
    return dslContext
      .select(task.fields())
      .from(task)
      .fetchInto(JooqTaskDto.class)
      .stream()
      .map(translator::toDomainEntity)
      .collect(Collectors.toList());
  }

  @Override
  public Optional<Task> findById() {
    return Optional.empty();
  }

  @Override
  public void delete(Task task) {

  }
}
