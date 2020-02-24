package jp.gr.java_conf.saka.todo.server.domain.model.task;

import java.util.List;
import java.util.Optional;

public interface ITaskRepository {

  TaskId saveAsNew(Task task);

  TaskId saveAsUpdate(Task task);

  List<Task> findAll();

  Optional<Task> findById(TaskId id);

  void delete(TaskId id);
}
