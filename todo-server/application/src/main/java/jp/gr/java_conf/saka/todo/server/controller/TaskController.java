package jp.gr.java_conf.saka.todo.server.controller;

import io.micronaut.context.annotation.Parameter;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Patch;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import java.util.List;
import java.util.stream.Collectors;
import javax.inject.Inject;
import jp.gr.java_conf.saka.todo.server.application.task.ITaskApplicationService;
import jp.gr.java_conf.saka.todo.server.controller.dto.TaskPresentationDto;
import jp.gr.java_conf.saka.todo.server.controller.dto.TaskPresentationTranslator;

@Controller("/task")
public class TaskController {

  @Inject
  private ITaskApplicationService service;

  @Inject
  private TaskPresentationTranslator taskPresentationTranslator;

  @Get(produces = MediaType.APPLICATION_JSON)
  public List<TaskPresentationDto> get() {
    return service.findAllTasks().stream()
      .map(taskPresentationTranslator::toDto)
      .collect(Collectors.toList());
  }

  @Post(consumes = MediaType.APPLICATION_JSON, produces = MediaType.APPLICATION_JSON)
  public TaskPresentationDto post(TaskPresentationDto task) {
    return taskPresentationTranslator.toDto(
      service.createTask(
        taskPresentationTranslator.toCreateCommand(task.toBuilder().id(null).build())
      )
    );
  }

  @Put(uri = "{id}", consumes = MediaType.APPLICATION_JSON, produces = MediaType.APPLICATION_JSON)
  public TaskPresentationDto put(@Parameter String id, TaskPresentationDto task) {
    return taskPresentationTranslator.toDto(
      service.updateTask(
        taskPresentationTranslator.toUpdatedCommand(id, task)
      )
    );
  }

  @Patch(uri = "{id}", consumes = MediaType.APPLICATION_JSON, produces = MediaType.APPLICATION_JSON)
  public TaskPresentationDto patch(@Parameter String id, TaskPresentationDto task) {
    return taskPresentationTranslator.toDto(
      service.patchTask(
        taskPresentationTranslator.toPatchCommand(id, task)
      )
    );
  }

  @Delete(uri = "{id}")
  public void delete(@Parameter String id) {
    service.deleteTask(taskPresentationTranslator.toDeleteCommand(id));
  }
}
