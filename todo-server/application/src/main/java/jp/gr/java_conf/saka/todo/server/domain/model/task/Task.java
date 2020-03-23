package jp.gr.java_conf.saka.todo.server.domain.model.task;

import com.google.common.base.Preconditions;
import java.time.LocalDate;
import java.util.Objects;
import java.util.Optional;
import lombok.Builder;
import lombok.NonNull;
import lombok.Setter;

@Builder
public class Task {

  @NonNull
  private final TaskId id;

  @NonNull
  private TaskName name;

  @NonNull
  private TaskState state;

  private String description;

  private TaskPriority priority;
  private TaskDeadline deadline;

  @NonNull
  private Long createdTimestamp;

  @NonNull
  @Setter
  private Long lastUpdatedTimestamp;

  public TaskId getId() {
    return id;
  }

  public String getIdAsValue() {
    return getId().toStringValue();
  }

  public TaskName getName() {
    return name;
  }

  public String getNameAsValue() {
    return name.getValue();
  }

  public void changeName(TaskName name) {
    this.name = Preconditions.checkNotNull(name);
  }

  public TaskState getState() {
    return state;
  }

  public String getStateAsValue() {
    return getState().toStringValue();
  }

  public void changeState(TaskState state) {
    this.state = Preconditions.checkNotNull(state);
  }

  public Optional<String> getDescription() {
    return Optional.ofNullable(description);
  }

  public void changeDescription(String description) {
    this.description = description;
  }

  public Optional<TaskPriority> getPriority() {
    return Optional.ofNullable(priority);
  }

  public Optional<Integer> getPriorityAsInt() {
    return getPriority().map(TaskPriority::getPriority);
  }

  public void changePriority(TaskPriority priority) {
    this.priority = priority;
  }

  public Optional<TaskDeadline> getDeadline() {
    return Optional.ofNullable(deadline);
  }

  public Optional<LocalDate> getDeadlineValue() {
    return getDeadline().map(TaskDeadline::getValue);
  }

  public void changeDeadline(TaskDeadline deadline) {
    this.deadline = deadline;
  }

  public long getCreatedTimestamp() {
    return createdTimestamp;
  }

  public long getLastUpdatedTimestamp() {
    return lastUpdatedTimestamp;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Task task = (Task) o;
    return Objects.equals(id, task.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
