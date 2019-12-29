package jp.gr.java_conf.saka.todo.server.domain.model.vo;

import com.google.common.base.Preconditions;
import java.util.Objects;
import java.util.Optional;

public class TaskId {

  public static TaskId NOT_ASSIGNED = new TaskId(-1L);

  private long id;

  private TaskId(long id) {
    this.id = id;
  }

  public static TaskId of(long id) {
    Preconditions.checkArgument(id > 0, "id should be positive long:" + id);
    return new TaskId(id);
  }

  public static TaskId ofNullable(Long id) {
    return Optional.ofNullable(id).map(TaskId::of).orElse(TaskId.NOT_ASSIGNED);
  }

  public long getId() {
    return id;
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
