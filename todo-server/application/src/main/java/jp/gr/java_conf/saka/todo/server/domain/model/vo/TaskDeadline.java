package jp.gr.java_conf.saka.todo.server.domain.model.vo;

import java.time.LocalDate;
import java.util.Objects;
import java.util.Optional;

public class TaskDeadline {

  private final LocalDate deadline;

  private TaskDeadline(LocalDate deadline) {
    this.deadline = deadline;
  }

  public static TaskDeadline ofIso8601(String date) {
    return new TaskDeadline(LocalDate.parse(Objects.requireNonNull(date)));
  }

  public static Optional<TaskDeadline> ofNullableIso8601(String date) {
    return Optional.ofNullable(date).map(TaskDeadline::ofIso8601);
  }

  /**
   * @return uuuu-MM-dd
   */
  public String toIso8601() {
    return deadline.toString();
  }
}
