package jp.gr.java_conf.saka.todo.server.controller.dto;

import com.google.common.annotations.VisibleForTesting;
import java.util.function.LongSupplier;
import javax.inject.Singleton;
import jp.gr.java_conf.saka.todo.server.domain.model.entity.Task;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskDeadline;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskId;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskPriority;

@Singleton
public class TaskPresentationTranslator {

  private final LongSupplier currentTimestampSupplier;

  public TaskPresentationTranslator() {
    this(() -> System.currentTimeMillis());
  }

  @VisibleForTesting
  TaskPresentationTranslator(LongSupplier currentTimestampSupplier) {
    this.currentTimestampSupplier = currentTimestampSupplier;
  }

  public TaskPresentationDto toDto(Task task) {
    return TaskPresentationDto.builder()
      .id(String.valueOf(task.getIdAsLong()))
      .name(task.getName())
      .description(task.getDescription().orElse(null))
      .createdTimestamp(task.getCreatedTimestamp())
      .lastUpdatedTimestamp(task.getLastUpdatedTimestamp())
      .priority(task.getPriorityAsInt())
      .deadline(task.getDeadlineAsIso8601().orElse(null))
      .build();
  }

  public Task toNewDomainEntity(TaskPresentationDto task) {
    long current = currentTimestampSupplier.getAsLong();
    return toCommonDomainEntity(task, current)
      .id(TaskId.notAssigned())
      .createdTimestamp(current)
      .build();
  }

  public Task toUpdatedDomainEntity(TaskPresentationDto task, long createdTimestamp) {
    long current = currentTimestampSupplier.getAsLong();
    return toCommonDomainEntity(task, current)
      .id(TaskId.of(
        task.getId().map(Long::valueOf)
          .orElseThrow(() -> new IllegalArgumentException("ID is not specified"))
        )
      )
      .createdTimestamp(createdTimestamp)
      .build();
  }

  public Task toPatchedDomainEntity(TaskPresentationDto task, Task baseTask) {
    long current = currentTimestampSupplier.getAsLong();
    var clonedBaseTaskBuilder = baseTask.toBuilder()
      .lastUpdatedTimestamp(current);
    task.getName().ifPresent(clonedBaseTaskBuilder::name);
    task.getDeadline().ifPresent(clonedBaseTaskBuilder::description);
    task.getPriority().map(TaskPriority::of).ifPresent(clonedBaseTaskBuilder::priority);
    task.getDeadline().map(TaskDeadline::ofIso8601).ifPresent(clonedBaseTaskBuilder::deadline);
    return clonedBaseTaskBuilder.build();
  }

  private Task.TaskBuilder toCommonDomainEntity(TaskPresentationDto task, long lastUpdatedTime) {
    return Task.builder()
      .name(
        task.getName().orElseThrow(() -> new IllegalArgumentException("Name should be specified")))
      .description(task.getDescription().orElse(null))
      .lastUpdatedTimestamp(lastUpdatedTime)
      .priority(task.getPriority().map(TaskPriority::of).orElseGet(TaskPriority::defaultPriority))
      .deadline(task.getDeadline().map(TaskDeadline::ofIso8601).orElse(null));
  }
}
