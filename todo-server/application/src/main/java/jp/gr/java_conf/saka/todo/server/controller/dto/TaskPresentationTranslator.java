package jp.gr.java_conf.saka.todo.server.controller.dto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import javax.inject.Singleton;
import jp.gr.java_conf.saka.todo.server.application.task.TaskApplicationDto;
import jp.gr.java_conf.saka.todo.server.application.task.TaskCreateCommand;
import jp.gr.java_conf.saka.todo.server.application.task.TaskDeleteCommand;
import jp.gr.java_conf.saka.todo.server.application.task.TaskPatchCommand;
import jp.gr.java_conf.saka.todo.server.application.task.TaskUpdateCommand;

@Singleton
public class TaskPresentationTranslator {

  /**
   * yyyy-MM-dd
   */
  private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;

  public TaskPresentationDto toDto(TaskApplicationDto task) {
    return TaskPresentationDto.builder()
      .id(String.valueOf(task.getId()))
      .name(task.getName())
      .state(task.getState())
      .description(task.getDescription().orElse(null))
      .createdTimestamp(task.getCreatedTimestamp())
      .lastUpdatedTimestamp(task.getLastUpdatedTimestamp())
      .priority(task.getTaskPriority().orElse(null))
      .deadline(task.getDeadline().map(FORMATTER::format).orElse(null))
      .build();
  }

  public TaskCreateCommand toCreateCommand(TaskPresentationDto task) {
    var builder = TaskCreateCommand.builder()
      .name(
        task.getName().orElseThrow(() -> new IllegalArgumentException("Name must not be null")));
    task.getState().ifPresent(builder::state);
    task.getDescription().ifPresent(builder::description);
    task.getPriority().ifPresent(builder::priority);
    task.getDeadline().map(LocalDate::parse).ifPresent(builder::deadline);
    return builder.build();
  }

  public TaskUpdateCommand toUpdatedCommand(String id, TaskPresentationDto task) {
    var builder = TaskUpdateCommand.builder()
      .id(id)
      .name(
        task.getName().orElseThrow(() -> new IllegalArgumentException("Name must not be null")))
      .state(
        task.getState().orElseThrow(() -> new IllegalArgumentException("State must not be null"))
      );
    task.getDescription().ifPresent(builder::description);
    task.getPriority().ifPresent(builder::priority);
    task.getDeadline().map(this::parse).ifPresent(builder::deadline);
    return builder.build();
  }

  public TaskPatchCommand toPatchCommand(String id, TaskPresentationDto task) {
    var builder = TaskPatchCommand.builder()
      .id(id);
    task.getName().ifPresent(builder::name);
    task.getState().ifPresent(builder::state);
    task.getDescription().ifPresent(builder::description);
    task.getPriority().ifPresent(builder::priority);
    task.getDeadline().map(this::parse).ifPresent(builder::deadline);
    return builder.build();
  }

  public TaskDeleteCommand toDeleteCommand(String id) {
    return TaskDeleteCommand.builder()
      .id(id)
      .build();
  }

  private LocalDate parse(String date) {
    try {
      return LocalDate.from(FORMATTER.parse(date));
    } catch (DateTimeParseException e) {
      throw new IllegalArgumentException(
        "Date format is invalid. " + FORMATTER.toString(), e);
    }
  }
}
