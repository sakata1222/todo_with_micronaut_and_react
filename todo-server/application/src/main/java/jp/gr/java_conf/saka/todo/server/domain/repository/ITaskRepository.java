package jp.gr.java_conf.saka.todo.server.domain.repository;

import java.util.List;
import java.util.Optional;
import jp.gr.java_conf.saka.todo.server.domain.model.entity.Task;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskId;

public interface ITaskRepository {

  TaskId save(Task task);

  List<Task> findAll();

  Optional<Task> findById(TaskId id);

  void delete(Task task);
}
