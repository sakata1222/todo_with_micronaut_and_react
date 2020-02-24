package jp.gr.java_conf.saka.todo.server.domain.model.task;

import com.google.common.base.Preconditions;
import java.util.Objects;

public class TaskId {

  private final String id;

  private TaskId(String id) {
    this.id = id;
  }

  public static TaskId of(String id) {
    Preconditions.checkNotNull(id);
    Preconditions.checkArgument(id.length() > 0);
    return new TaskId(id);
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

  public String toStringValue() {
    return id;
  }
}
