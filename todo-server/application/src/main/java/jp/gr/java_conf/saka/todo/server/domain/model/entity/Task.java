package jp.gr.java_conf.saka.todo.server.domain.model.entity;

import java.util.Optional;
import java.util.OptionalLong;
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

  private Long createdTimestamp;
  private Long lastUpdatedTimestamp;
  @NonNull
  private TaskPriority priority;
  private TaskDeadline deadline;

  public TaskId getId() {
    return id;
  }

  public boolean isIdAssigned() {
    return getId().isAssigned();
  }

  public long getIdAsLong() {
    if (!getId().isAssigned()) {
      throw new IllegalStateException("ID is not assigned");
    }
    return getId().getId();
  }

  public OptionalLong getIdAsOptionalLong() {
    if (!getId().isAssigned()) {
      return OptionalLong.empty();
    }
    return OptionalLong.of(getIdAsLong());
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
