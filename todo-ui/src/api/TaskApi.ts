import fetch from "cross-fetch";
import Task, { TaskList } from "../model/Task";
import DateFnsUtils from "@date-io/date-fns";

export default interface ITaskApi {
  fetchTasks(): Promise<TaskList>;
  postTask(task: Task): Promise<Task>;
  updateTaskState(id: string, state: string): Promise<Task>;
}
const dateFnsUtils = new DateFnsUtils();
const ContentTypeJson: string = "application/json; charset=utf-8";

type TaskDto = {
  id?: string;
  name?: string;
  state?: string;
  description?: string;
  deadline?: string;
  proority?: Number;
};

export class TaskApi implements ITaskApi {
  fetchTasks(): Promise<TaskList> {
    return fetch("task")
      .then(response => response.json())
      .then(json => json as Array<TaskDto>)
      .then(tasks => {
        return new TaskList(tasks.map(this.toTask));
      });
  }

  postTask(task: Task): Promise<Task> {
    return fetch("task", {
      method: "POST",
      headers: {
        "Content-Type": ContentTypeJson
      },
      body: JSON.stringify(this.toTaskDto(task))
    })
      .then(response => response.json())
      .then(json => json as TaskDto)
      .then(dto => this.toTask(dto));
  }

  updateTaskState(id: string, state: string): Promise<Task> {
    const request: TaskDto = {
      id: id,
      state: state
    };
    return fetch("task/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": ContentTypeJson
      },
      body: JSON.stringify(request)
    })
      .then(response => response.json())
      .then(json => json as TaskDto)
      .then(dto => this.toTask(dto));
  }

  toTask(dto: TaskDto): Task {
    return {
      id: dto.id!,
      name: dto.name!,
      state: dto.state!,
      deadline: dto.deadline ? new Date(dto.deadline) : undefined,
      priority: dto.proority
    };
  }

  toTaskDto(task: Task): TaskDto {
    return {
      name: task.name,
      description: task.description,
      deadline: task.deadline ? this.toIsoLocalDate(task.deadline!) : undefined,
      proority: task.priority
    };
  }

  toIsoLocalDate(d: Date): string {
    return dateFnsUtils.format(d, "yyyy-MM-dd");
  }
}

export let defaultTaskApi: ITaskApi = new TaskApi();
