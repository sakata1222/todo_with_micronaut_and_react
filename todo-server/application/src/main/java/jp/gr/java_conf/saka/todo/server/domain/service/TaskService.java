package jp.gr.java_conf.saka.todo.server.domain.service;

import javax.inject.Inject;
import javax.inject.Singleton;
import jp.gr.java_conf.saka.todo.server.domain.model.task.ITaskRepository;
import jp.gr.java_conf.saka.todo.server.domain.model.task.Task;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskConflictSpecification;

@Singleton
public class TaskService implements ITaskService {

  @Inject
  private final ITaskRepository taskRepository;

  public TaskService(ITaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  @Override
  public void validateNotConflict(Task task) {
    var taskConflictSpecification = new TaskConflictSpecification(task);
    if (taskRepository.hasItem(taskConflictSpecification)) {
      throw taskConflictSpecification.newConflictException();
    }
  }
}
