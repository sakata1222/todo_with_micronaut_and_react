package jp.gr.java_conf.saka.todo.server.domain.service;

import java.util.List;
import jp.gr.java_conf.saka.todo.server.domain.model.entity.Task;

public interface ITaskService {

  List<Task> findAllTasks();
}
