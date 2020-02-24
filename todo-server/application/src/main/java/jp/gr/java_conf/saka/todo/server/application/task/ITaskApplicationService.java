package jp.gr.java_conf.saka.todo.server.application.task;

import java.util.List;
import java.util.Optional;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskId;

public interface ITaskApplicationService {

  List<TaskApplicationDto> findAllTasks();

  Optional<TaskApplicationDto> find(TaskId id);

  TaskApplicationDto createTask(TaskCreateCommand command);

  TaskApplicationDto updateTask(TaskUpdateCommand command);

  TaskApplicationDto patchTask(TaskPatchCommand command);

  void deleteTask(TaskDeleteCommand command);
}
