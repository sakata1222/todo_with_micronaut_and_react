package jp.gr.java_conf.saka.todo.server.service;

import java.util.List;
import jp.gr.java_conf.saka.todo.server.domain.model.Task;

public interface ITaskService {

  List<Task> findAllTasks();
}
