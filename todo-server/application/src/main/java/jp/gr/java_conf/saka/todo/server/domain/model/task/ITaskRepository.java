package jp.gr.java_conf.saka.todo.server.domain.model.task;

import java.util.List;
import java.util.Optional;
import jp.gr.java_conf.saka.todo.server.domain.specification.ISpecification;

public interface ITaskRepository {

  TaskId saveAsNew(Task task);

  TaskId saveAsUpdate(Task task);

  List<Task> findAll();

  Optional<Task> find(TaskId id);

  List<Task> find(ISpecification<Task> specification);

  boolean hasItem(ISpecification<Task> specification);

  void delete(TaskId id);
}
