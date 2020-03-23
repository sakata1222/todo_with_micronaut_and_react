package jp.gr.java_conf.saka.todo.server.application.task;

import java.util.List;
import java.util.Optional;
import java.util.function.LongSupplier;
import java.util.stream.Collectors;
import javax.inject.Inject;
import javax.inject.Singleton;
import jp.gr.java_conf.saka.todo.server.domain.model.task.ITaskFactory;
import jp.gr.java_conf.saka.todo.server.domain.model.task.ITaskRepository;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskDeadline;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskId;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskName;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskPriority;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskState;
import jp.gr.java_conf.saka.todo.server.domain.service.ITaskService;

@Singleton
public class TaskApplicationService implements ITaskApplicationService {

  @Inject
  private final LongSupplier currentTimeSupplier;

  @Inject
  private final ITaskFactory taskFactory;

  @Inject
  private final ITaskService taskService;

  @Inject
  private final ITaskRepository taskRepository;

  public TaskApplicationService(LongSupplier currentTimeSupplier,
    ITaskFactory taskFactory,
    ITaskService taskService,
    ITaskRepository taskRepository) {
    this.currentTimeSupplier = currentTimeSupplier;
    this.taskFactory = taskFactory;
    this.taskService = taskService;
    this.taskRepository = taskRepository;
  }

  @Override
  public List<TaskApplicationDto> findAllTasks() {
    return taskRepository.findAll().stream()
      .map(TaskApplicationDto::of)
      .collect(Collectors.toList());
  }

  @Override
  public Optional<TaskApplicationDto> find(TaskId id) {
    return taskRepository.find(id).map(TaskApplicationDto::of);
  }

  @Override
  public synchronized TaskApplicationDto createTask(TaskCreateCommand command) {
    var createdTask = taskFactory.create(
      TaskName.of(command.getName()),
      command.getState().map(TaskState::ofStringValue).orElse(TaskState.TODO),
      currentTimeSupplier.getAsLong());
    taskService.validateNotConflict(createdTask);
    taskRepository.saveAsNew(createdTask);
    return find(createdTask.getId())
      .orElseThrow(() ->
        new IllegalStateException("Saved task does not exist:" + createdTask.getId())
      );
  }

  @Override
  public TaskApplicationDto updateTask(TaskUpdateCommand command) {
    var existingTask = taskRepository.find(TaskId.of(command.getId()))
      .orElseThrow(
        () -> new IllegalArgumentException("Specified task is not found:" + command.getId()));
    existingTask.changeName(TaskName.of(command.getName()));
    existingTask.changeState(TaskState.ofStringValue(command.getState()));
    existingTask.changeDescription(command.getDescription().orElse(null));
    existingTask.changePriority(command.getPriority().map(TaskPriority::of).orElse(null));
    existingTask.changeDeadline(command.getDeadline().map(TaskDeadline::of).orElse(null));
    existingTask.setLastUpdatedTimestamp(currentTimeSupplier.getAsLong());
    taskService.validateNotConflict(existingTask);
    taskRepository.saveAsUpdate(existingTask);
    return find(existingTask.getId())
      .orElseThrow(() ->
        new IllegalStateException("Updated task does not exist")
      );
  }

  @Override
  public TaskApplicationDto patchTask(TaskPatchCommand command) {
    var existingTask = taskRepository.find(TaskId.of(command.getId()))
      .orElseThrow(
        () -> new IllegalArgumentException("Specified task is not found:" + command.getId()));
    command.getName().map(TaskName::of).ifPresent(existingTask::changeName);
    command.getState().map(TaskState::ofStringValue).ifPresent(existingTask::changeState);
    command.getDescription().ifPresent(existingTask::changeDescription);
    command.getPriority().map(TaskPriority::of).ifPresent(existingTask::changePriority);
    command.getDeadline().map(TaskDeadline::of).ifPresent(existingTask::changeDeadline);
    existingTask.setLastUpdatedTimestamp(currentTimeSupplier.getAsLong());
    taskService.validateNotConflict(existingTask);
    taskRepository.saveAsUpdate(existingTask);
    return find(existingTask.getId())
      .orElseThrow(() ->
        new IllegalStateException("Updated task does not exist")
      );
  }

  @Override
  public void deleteTask(TaskDeleteCommand command) {
    taskRepository.delete(TaskId.of(command.getId()));
  }
}
