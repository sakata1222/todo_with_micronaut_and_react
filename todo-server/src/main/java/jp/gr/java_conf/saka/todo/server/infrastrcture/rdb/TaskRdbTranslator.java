package jp.gr.java_conf.saka.todo.server.infrastrcture.rdb;

import javax.inject.Singleton;
import jp.gr.java_conf.saka.todo.server.domain.model.entity.Task;
import jp.gr.java_conf.saka.todo.server.domain.model.vo.TaskId;
import jp.gr.java_conf.saka.todo.server.infrastrcture.rdb.h2db.jooq.autogen.tables.pojos.JooqTaskDto;

@Singleton
public class TaskRdbTranslator {

  Task toDomainEntity(JooqTaskDto dto) {
    return new Task(
      TaskId.from(dto.getId()),
      dto.getName(),
      dto.getDescription()
    );
  }
}
