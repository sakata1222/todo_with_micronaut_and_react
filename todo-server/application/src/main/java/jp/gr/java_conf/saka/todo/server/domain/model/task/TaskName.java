package jp.gr.java_conf.saka.todo.server.domain.model.task;

import java.util.Objects;

public class TaskName {

  private final String taskName;

  private TaskName(String taskName) {
    this.taskName = taskName;
  }

  public static TaskName of(String name) {
    return new TaskName(Objects.requireNonNull(name));
  }

  public String getValue() {
    return taskName;
  }
}
