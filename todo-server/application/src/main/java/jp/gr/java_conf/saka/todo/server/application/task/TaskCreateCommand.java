package jp.gr.java_conf.saka.todo.server.application.task;

import java.time.LocalDate;
import java.util.Optional;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

@Builder
@Getter
public class TaskCreateCommand {

  @NonNull
  private final String name;

  private final String state;

  private final String description;

  private final Integer priority;

  private final LocalDate deadline;

  public Optional<String> getState() {
    return Optional.ofNullable(state);
  }

  public Optional<String> getDescription() {
    return Optional.ofNullable(description);
  }

  public Optional<Integer> getPriority() {
    return Optional.ofNullable(priority);
  }

  public Optional<LocalDate> getDeadline() {
    return Optional.ofNullable(deadline);
  }

}
