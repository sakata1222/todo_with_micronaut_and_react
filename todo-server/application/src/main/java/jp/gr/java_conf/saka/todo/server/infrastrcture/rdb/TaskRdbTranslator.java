package jp.gr.java_conf.saka.todo.server.infrastrcture.rdb;

import java.util.function.Supplier;
import javax.inject.Singleton;
import jp.gr.java_conf.saka.todo.server.domain.model.entity.Task;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskDeadline;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskId;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskPriority;
import jp.gr.java_conf.saka.todo.server.infrastrcture.rdb.h2db.jooq.autogen.tables.records.JooqTaskRecord;

@Singleton
public class TaskRdbTranslator {

  Task toDomainEntity(JooqTaskRecord record) {
    return Task.builder()
      .id(TaskId.of(record.getId()))
      .name(record.getName())
      .description(record.getDescription())
      .createdTimestamp(record.getCreatedTimestamp())
      .lastUpdatedTimestamp(record.getLastUpdatedTimestamp())
      .priority(TaskPriority.of(record.getPriority()))
      .deadline(TaskDeadline.ofNullableIso8601(record.getDeadline()).orElse(null))
      .build();
  }

  JooqTaskRecord toRecord(Task entity, Supplier<JooqTaskRecord> emptyRecordSupplier) {
    return emptyRecordSupplier.get()
      .setId(entity.getIdAsLong())
      .setName(entity.getName())
      .setDescription(entity.getDescriptionOrNull())
      .setCreatedTimestamp(entity.getCreatedTimestamp())
      .setLastUpdatedTimestamp(entity.getLastUpdatedTimestamp())
      .setPriority(entity.getPriorityAsInt())
      .setDeadline(entity.getDeadlineAsIso8601().orElse(null));
  }
}
