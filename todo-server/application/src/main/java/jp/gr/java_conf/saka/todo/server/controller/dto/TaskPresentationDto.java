package jp.gr.java_conf.saka.todo.server.controller.dto;

import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskPresentationDto {

  private String id;

  @NonNull
  private String name;

  private String description;

  private Long createdTimestamp;

  private Long lastUpdatedTimestamp;

  private int priority;

  private String deadline;


  public Optional<String> getId() {
    return Optional.ofNullable(id);
  }

  public Optional<String> getDescription() {
    return Optional.ofNullable(description);
  }

  public Optional<String> getDeadline() {
    return Optional.ofNullable(deadline);
  }

  public Optional<Long> getCreatedTimestamp() {
    return Optional.ofNullable(createdTimestamp);
  }

  public Optional<Long> getLastUpdatedTimestamp() {
    return Optional.ofNullable(lastUpdatedTimestamp);
  }
}
