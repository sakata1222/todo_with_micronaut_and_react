package jp.gr.java_conf.saka.todo.server.domain.service;

import jp.gr.java_conf.saka.todo.server.domain.model.task.Task;

public interface ITaskService {

  /**
   * @param task
   * @throws IllegalArgumentException
   */
  void validateNotConflict(Task task);
}
