package jp.gr.java_conf.saka.todo.server.controller.dto;

import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class TaskPresentationDto {

  private String id;

  private String name;

  private String description;

  private Long createdTimestamp;

  private Long lastUpdatedTimestamp;

  private Integer priority;

  private String deadline;

  public Optional<String> getId() {
    return Optional.ofNullable(id);
  }

  public Optional<String> getName() {
    return Optional.ofNullable(name);
  }

  public Optional<String> getDescription() {
    return Optional.ofNullable(description);
  }

  public Optional<Long> getCreatedTimestamp() {
    return Optional.ofNullable(createdTimestamp);
  }

  public Optional<Long> getLastUpdatedTimestamp() {
    return Optional.ofNullable(lastUpdatedTimestamp);
  }

  public Optional<Integer> getPriority() {
    return Optional.ofNullable(priority);
  }

  public Optional<String> getDeadline() {
    return Optional.ofNullable(deadline);
  }

}
