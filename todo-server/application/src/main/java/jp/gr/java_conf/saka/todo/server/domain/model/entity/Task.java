package jp.gr.java_conf.saka.todo.server.domain.model.entity;

import java.util.Optional;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskDeadline;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskId;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskPriority;
import lombok.Builder;
import lombok.NonNull;

@Builder(toBuilder = true)
public class Task {

  @NonNull
  private TaskId id;

  @NonNull
  private String name;

  private String description;

  private long createdTimestamp;
  private long lastUpdatedTimestamp;
  @NonNull
  private TaskPriority priority;
  private TaskDeadline deadline;

  public TaskId getId() {
    return id;
  }

  public boolean isIdAssigned() {
    return id != TaskId.NOT_ASSIGNED;
  }

  public long getIdAsLong() {
    return getId().getId();
  }

  public String getName() {
    return name;
  }

  public Optional<String> getDescription() {
    return Optional.ofNullable(description);
  }

  public String getDescriptionOrNull() {
    return description;
  }

  public long getCreatedTimestamp() {
    return createdTimestamp;
  }

  public long getLastUpdatedTimestamp() {
    return lastUpdatedTimestamp;
  }

  public TaskPriority getPriority() {
    return priority;
  }

  public int getPriorityAsInt() {
    return priority.getPriority();
  }

  public Optional<TaskDeadline> getDeadline() {
    return Optional.ofNullable(deadline);
  }

  public Optional<String> getDeadlineAsIso8601() {
    return getDeadline().map(TaskDeadline::toIso8601);
  }
}
