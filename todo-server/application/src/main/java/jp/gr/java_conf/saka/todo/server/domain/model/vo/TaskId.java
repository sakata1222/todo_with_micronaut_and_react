package jp.gr.java_conf.saka.todo.server.domain.model.vo;

import java.util.UUID;

public class TaskId {

  private String id;

  private TaskId(String id) {
    this.id = id;
  }

  public static TaskId from(String id) {
    return new TaskId(id);
  }

  public static TaskId newId(String id) {
    return new TaskId(UUID.randomUUID().toString());
  }
}
