package jp.gr.java_conf.saka.todo.server.domain.repository;

import java.util.List;
import java.util.Optional;
import jp.gr.java_conf.saka.todo.server.domain.model.entity.Task;

public interface ITaskRepository {

  void save(Task task);

  List<Task> findAll();

  Optional<Task> findById();

  void delete(Task task);
}
