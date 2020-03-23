package jp.gr.java_conf.saka.todo.server.domain.model.task;

public interface ITaskFactory {

  Task create(TaskName taskName, TaskState taskState, long timestamp);
}
