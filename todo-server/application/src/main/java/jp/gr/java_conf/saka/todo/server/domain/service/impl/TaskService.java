package jp.gr.java_conf.saka.todo.server.domain.service.impl;

import java.util.List;
import java.util.Optional;
import javax.inject.Inject;
import javax.inject.Singleton;
import jp.gr.java_conf.saka.todo.server.domain.model.entity.Task;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskId;
import jp.gr.java_conf.saka.todo.server.domain.repository.ITaskRepository;
import jp.gr.java_conf.saka.todo.server.domain.service.ITaskService;

@Singleton
public class TaskService implements ITaskService {

  @Inject
  private ITaskRepository repository;

  @Override
  public List<Task> findAllTasks() {
    return repository.findAll();
  }

  @Override
  public Optional<Task> findTaskById(TaskId id) {
    return repository.findById(id);
  }

  @Override
  public Task createTask(Task task) {
    var clonedTask = task.toBuilder().id(TaskId.notAssigned()).build();
    var assignedId = repository.saveAsNew(clonedTask);
    return repository.findById(assignedId).orElseThrow(() ->
      new IllegalStateException("Saved task does not exist:" + task.getId())
    );
  }

  @Override
  public Task overwriteTask(Task task) {
    if (!task.isIdAssigned()) {
      throw new IllegalArgumentException("ID is not specified");
    }
    var assignedId = repository.saveAsUpdate(task);
    return repository.findById(assignedId).orElseThrow(() ->
      new IllegalStateException("Saved task does not exist:" + task.getId())
    );
  }


}
