package jp.gr.java_conf.saka.todo.server.domain.model.vo;

import com.google.common.base.Preconditions;
import java.util.Objects;

public class TaskId {

  private static TaskId NOT_ASSIGNED = new TaskId(-1L);

  private long id;

  private TaskId(long id) {
    this.id = id;
  }

  public static TaskId of(long id) {
    Preconditions.checkArgument(id > 0, "id should be positive long:" + id);
    return new TaskId(id);
  }

  public static TaskId notAssigned() {
    return NOT_ASSIGNED;
  }

  public long getId() {
    return id;
  }

  public boolean isAssigned() {
    return this != NOT_ASSIGNED;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TaskId taskId = (TaskId) o;
    return id == taskId.id;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  @Override
  public String toString() {
    return "TaskId{" +
      "id=" + id +
      '}';
  }
}
