package jp.gr.java_conf.saka.todo.server.controller;

import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import java.util.List;
import java.util.stream.Collectors;
import javax.inject.Inject;
import jp.gr.java_conf.saka.todo.server.controller.dto.TaskPresentationDto;
import jp.gr.java_conf.saka.todo.server.controller.dto.TaskPresentationTranslator;
import jp.gr.java_conf.saka.todo.server.domain.service.ITaskService;

@Controller("/task")
public class TaskController {

  @Inject
  private ITaskService service;

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
      service.createTask(taskPresentationTranslator.toDomainEntity(task))
    );
  }
}
