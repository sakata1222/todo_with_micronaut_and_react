package jp.gr.java_conf.saka.todo.server.infrastrcture.rdb;

import static jp.gr.java_conf.saka.todo.server.infrastrcture.rdb.h2db.jooq.autogen.Sequences.TASK_ID_SEQUENCE;

import javax.inject.Inject;
import javax.inject.Singleton;
import jp.gr.java_conf.saka.todo.server.domain.model.task.ITaskFactory;
import jp.gr.java_conf.saka.todo.server.domain.model.task.Task;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskId;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskName;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskState;
import org.jooq.DSLContext;

@Singleton
public class TaskRdbFactory implements ITaskFactory {

  @Inject
  private DSLContext dslContext;

  @Inject
  private TaskRdbTranslator translator;

  public TaskRdbFactory(DSLContext dslContext, TaskRdbTranslator translator) {
    this.dslContext = dslContext;
    this.translator = translator;
  }

  @Override
  public Task create(TaskName taskName, TaskState taskState, long timestamp) {
    Long id = dslContext.nextval(TASK_ID_SEQUENCE);
    return Task.builder()
      .id(TaskId.of(String.valueOf(id)))
      .name(taskName)
      .state(taskState)
      .createdTimestamp(timestamp)
      .lastUpdatedTimestamp(timestamp)
      .build();
  }
}
