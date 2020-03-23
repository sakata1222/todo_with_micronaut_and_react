package jp.gr.java_conf.saka.todo.server.application.task;

import java.time.LocalDate;
import java.util.Optional;
import jp.gr.java_conf.saka.todo.server.domain.model.task.Task;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

@Getter
@Builder
public class TaskApplicationDto {

  @NonNull
  private final String id;

  @NonNull
  private final String name;

  @NonNull
  private final String state;

  private final String description;

  private final long createdTimestamp;

  private final long lastUpdatedTimestamp;

  private final Integer taskPriority;

  private final LocalDate deadline;

  public static TaskApplicationDto of(Task task) {
    var builder = TaskApplicationDto.builder();
    builder.id(task.getIdAsValue());
    builder.name(task.getNameAsValue());
    builder.state(task.getStateAsValue());
    task.getDescription().ifPresent(builder::description);
    builder.createdTimestamp(task.getCreatedTimestamp());
    builder.lastUpdatedTimestamp(task.getLastUpdatedTimestamp());
    task.getPriorityAsInt().ifPresent(builder::taskPriority);
    task.getDeadlineValue().ifPresent(builder::deadline);
    return builder.build();
  }

  public Optional<String> getDescription() {
    return Optional.ofNullable(description);
  }

  public Optional<Integer> getTaskPriority() {
    return Optional.ofNullable(taskPriority);
  }

  public Optional<LocalDate> getDeadline() {
    return Optional.ofNullable(deadline);
  }
}
