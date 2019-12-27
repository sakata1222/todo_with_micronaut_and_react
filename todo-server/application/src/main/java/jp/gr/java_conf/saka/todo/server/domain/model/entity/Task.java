package jp.gr.java_conf.saka.todo.server.domain.model.entity;

import java.util.Objects;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskId;

public class Task {

  private TaskId id;

  private String name;

  private String description;

  public Task(TaskId id, String name, String description) {
    this.id = Objects.requireNonNull(id);
    this.name = Objects.requireNonNull(name);
    this.description = Objects.requireNonNull(description);
  }
}
