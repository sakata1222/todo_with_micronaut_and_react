package jp.gr.java_conf.saka.todo.server.domain.model.task;

import jp.gr.java_conf.saka.todo.server.domain.specification.ISpecification;

public class TaskConflictSpecification implements ISpecification<Task> {

  private final Task task;

  public TaskConflictSpecification(Task task) {
    this.task = task;
  }

  @Override
  public boolean isSatisfiedBy(Task value) {
    return task.getName().equals(value.getName());
  }

  public IllegalArgumentException newConflictException() {
    return new IllegalArgumentException("Name conflicts:" + task.getName().getValue());
  }
}
