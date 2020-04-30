import fetch from "cross-fetch";
import Task, { TaskList } from "../model/Task";
import DateFnsUtils from "@date-io/date-fns";

export default interface ITaskApi {
  fetchTasks(): Promise<TaskList>;
  postTask(task: Task): Promise<Task>;
  updateTaskState(id: string, state: string): Promise<Task>;
  deleteTask(id: string): Promise<null>;
}
const dateFnsUtils = new DateFnsUtils();
const ContentTypeJson: string = "application/json; charset=utf-8";

type TaskDto = {
  id?: string;
  name?: string;
  state?: string;
  description?: string;
  deadline?: string;
  priority?: Number;
};

export class TaskApi implements ITaskApi {
  fetchTasks(): Promise<TaskList> {
    return fetch("task")
      .then((response) => response.json())
      .then((json) => json as Array<TaskDto>)
      .then((tasks) => {
        return new TaskList(tasks.map(this.toTask));
      });
  }

  postTask(task: Task): Promise<Task> {
    return fetch("task", {
      method: "POST",
      headers: {
        "Content-Type": ContentTypeJson,
      },
      body: JSON.stringify(this.toTaskDto(task)),
    })
      .then((response) => response.json())
      .then((json) => json as TaskDto)
      .then((dto) => this.toTask(dto));
  }

  updateTaskState(id: string, state: string): Promise<Task> {
    const request: TaskDto = {
      id: id,
      state: state,
    };
    return fetch("task/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": ContentTypeJson,
      },
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .then((json) => json as TaskDto)
      .then((dto) => this.toTask(dto));
  }

  deleteTask(id: string): Promise<null> {
    return fetch("task/" + id, {
      method: "DELETE",
    }).then((_) => null);
  }

  toTask(dto: TaskDto): Task {
    return {
      id: dto.id!,
      name: dto.name!,
      state: dto.state!,
      description: dto.description,
      deadline: dto.deadline ? new Date(dto.deadline) : undefined,
      priority: dto.priority,
    };
  }

  toTaskDto(task: Task): TaskDto {
    return {
      name: task.name,
      state: task.state,
      description: task.description,
      deadline: task.deadline ? this.toIsoLocalDate(task.deadline!) : undefined,
      priority: task.priority,
    };
  }

  toIsoLocalDate(d: Date): string {
    return dateFnsUtils.format(d, "yyyy-MM-dd");
  }
}

export let defaultTaskApi: ITaskApi = new TaskApi();
