package jp.gr.java_conf.saka.todo.server.domain.model.task;

import com.google.common.base.Preconditions;
import java.util.Comparator;
import org.jetbrains.annotations.NotNull;

public class TaskPriority implements Comparable<TaskPriority> {

  private static final int DEFAULT_PRIORITY = 100;

  private static final Comparator<TaskPriority> HIGHER_IS_IMPORTANT = Comparator
    .comparingInt(TaskPriority::getPriority).reversed();

  private final int priority;

  private TaskPriority(int priority) {
    Preconditions.checkArgument(
      0 <= priority && priority <= 10000
    );
    this.priority = priority;
  }

  public static TaskPriority of(int priority) {
    return new TaskPriority(priority);
  }

  public static TaskPriority defaultPriority() {
    return of(DEFAULT_PRIORITY);
  }

  public int getPriority() {
    return priority;
  }

  @Override
  public int compareTo(@NotNull TaskPriority taskPriority) {
    return HIGHER_IS_IMPORTANT.compare(this, taskPriority);
  }

}
