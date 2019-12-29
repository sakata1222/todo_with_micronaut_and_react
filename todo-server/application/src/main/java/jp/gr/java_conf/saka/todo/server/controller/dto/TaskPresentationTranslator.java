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

  private LongSupplier currentTimestampSupplier;

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

  public Task toDomainEntity(TaskPresentationDto task) {
    long current = currentTimestampSupplier.getAsLong();
    return Task.builder()
      .id(TaskId.ofNullable(
        task.getId().map(Long::valueOf).orElse(null))
      )
      .name(task.getName())
      .description(task.getDescription().orElse(null))
      .createdTimestamp(current)
      .lastUpdatedTimestamp(current)
      .priority(TaskPriority.of(task.getPriority()))
      .deadline(task.getDeadline().map(TaskDeadline::ofIso8601).orElse(null))
      .build();
  }
}
