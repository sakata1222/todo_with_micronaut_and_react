package jp.gr.java_conf.saka.todo.server.infrastrcture.rdb;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.function.Supplier;
import javax.inject.Singleton;
import jp.gr.java_conf.saka.todo.server.domain.model.task.Task;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskDeadline;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskId;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskName;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskPriority;
import jp.gr.java_conf.saka.todo.server.domain.model.task.TaskState;
import jp.gr.java_conf.saka.todo.server.infrastrcture.rdb.h2db.jooq.autogen.tables.records.JooqTaskRecord;

@Singleton
public class TaskRdbTranslator {

  private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;

  Task toDomainEntity(JooqTaskRecord record) {
    return Task.builder()
      .id(TaskId.of(record.getId()))
      .name(TaskName.of(record.getName()))
      .state(TaskState.ofStringValue(record.getState()))
      .description(record.getDescription())
      .createdTimestamp(record.getCreatedTimestamp())
      .lastUpdatedTimestamp(record.getLastUpdatedTimestamp())
      .priority(Optional.ofNullable(record.getPriority())
        .map(TaskPriority::of)
        .orElse(null))
      .deadline(Optional.ofNullable(record.getDeadline())
        .map(FORMATTER::parse)
        .map(LocalDate::from)
        .map(TaskDeadline::of)
        .orElse(null))
      .build();
  }

  JooqTaskRecord toRecord(
    Task entity,
    Supplier<JooqTaskRecord> emptyRecordSupplier) {
    JooqTaskRecord record = emptyRecordSupplier.get()
      .setId(entity.getIdAsValue())
      .setName(entity.getNameAsValue())
      .setState(entity.getStateAsValue())
      .setDescription(entity.getDescription().orElse(null))
      .setCreatedTimestamp(entity.getCreatedTimestamp())
      .setLastUpdatedTimestamp(entity.getLastUpdatedTimestamp())
      .setPriority(entity.getPriorityAsInt().orElse(null))
      .setDeadline(entity.getDeadlineValue().map(FORMATTER::format).orElse(null));
    return record;
  }
}
