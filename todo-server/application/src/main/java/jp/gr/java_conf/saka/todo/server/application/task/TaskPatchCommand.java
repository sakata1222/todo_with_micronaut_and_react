package jp.gr.java_conf.saka.todo.server.application.task;

import java.time.LocalDate;
import java.util.Optional;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

@Builder
@Getter
public class TaskPatchCommand {

  @NonNull
  private final String id;

  private final String name;
  private final String description;

  private final Integer priority;
  private final LocalDate deadline;


  public Optional<String> getName() {
    return Optional.ofNullable(name);
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
