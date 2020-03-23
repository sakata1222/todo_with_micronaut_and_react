package jp.gr.java_conf.saka.todo.server.application.task;

import java.time.LocalDate;
import java.util.Optional;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

@Builder
@Getter
public class TaskUpdateCommand {

  @NonNull
  private final String id;

  @NonNull
  private final String name;

  @NonNull
  private final String state;

  private final String description;

  private final Integer priority;

  private final LocalDate deadline;

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
