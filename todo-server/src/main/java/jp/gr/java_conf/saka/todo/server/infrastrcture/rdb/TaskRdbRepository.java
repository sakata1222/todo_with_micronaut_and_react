package jp.gr.java_conf.saka.todo.server.infrastrcture.rdb;

import java.util.List;
import java.util.Optional;
import jp.gr.java_conf.saka.todo.server.domain.model.Task;
import jp.gr.java_conf.saka.todo.server.domain.repository.ITaskRepository;

public class TaskRdbRepository implements ITaskRepository {

  @Override
  public void save(Task task) {

  }

  @Override
  public List<Task> findAll() {
    return null;
  }

  @Override
  public Optional<Task> findById() {
    return Optional.empty();
  }

  @Override
  public void delete(Task task) {

  }
}
