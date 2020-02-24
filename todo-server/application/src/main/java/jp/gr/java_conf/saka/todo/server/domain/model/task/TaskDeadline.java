package jp.gr.java_conf.saka.todo.server.domain.model.task;

import com.google.common.base.Preconditions;
import java.time.LocalDate;

public class TaskDeadline {

  private final LocalDate deadline;

  private TaskDeadline(LocalDate deadline) {
    this.deadline = deadline;
  }

  public static TaskDeadline of(LocalDate deadline) {
    return new TaskDeadline(Preconditions.checkNotNull(deadline));
  }

  public LocalDate getValue() {
    return deadline;
  }
}
