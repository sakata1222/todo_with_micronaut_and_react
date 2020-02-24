package jp.gr.java_conf.saka.todo.server.application.task;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

@Builder
@Getter
public class TaskDeleteCommand {

  @NonNull
  private final String id;

}
