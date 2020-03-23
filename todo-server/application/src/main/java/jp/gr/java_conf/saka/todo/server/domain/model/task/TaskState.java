package jp.gr.java_conf.saka.todo.server.domain.model.task;

import java.util.Arrays;
import java.util.Optional;

public enum TaskState {
  TODO("TODO"),
  DOING("DOING"),
  DONE("DONE");

  private String stringValue;

  TaskState(String stringValue) {
    this.stringValue = stringValue;
  }

  public String toStringValue() {
    return stringValue;
  }

  public static Optional<TaskState> optionalOfStringValue(String stringValue) {
    return Arrays.stream(values())
      .filter(s -> stringValue.equals(s.stringValue))
      .findFirst();
  }

  public static TaskState ofStringValue(String stringValue) {
    return optionalOfStringValue(stringValue)
      .orElseThrow(() -> new IllegalArgumentException(stringValue));
  }
}
