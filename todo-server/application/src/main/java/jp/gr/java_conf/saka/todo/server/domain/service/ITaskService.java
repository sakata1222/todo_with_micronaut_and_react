package jp.gr.java_conf.saka.todo.server.domain.service;

import java.util.List;
import java.util.Optional;
import jp.gr.java_conf.saka.todo.server.domain.model.entity.Task;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskId;

public interface ITaskService {

  List<Task> findAllTasks();

  Optional<Task> findTaskById(TaskId id);

  Task createTask(Task task);

  Task overwriteTask(Task task);
}
