package jp.gr.java_conf.saka.todo.server.domain.service.impl;

import java.util.List;
import javax.inject.Inject;
import javax.inject.Singleton;
import jp.gr.java_conf.saka.todo.server.domain.model.entity.Task;
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
}
