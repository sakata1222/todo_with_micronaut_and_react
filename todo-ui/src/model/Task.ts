type Task = {
  id: string;
  name: string;
  state: string;
  description?: string;
  deadline?: Date;
  priority?: Number;
};

export const TaskState = {
  TODO: "TODO",
  DOING: "DOING",
  DONE: "DONE",
};

export class TaskList {
  taskMap: Map<string, Task>;

  constructor(tasks: Array<Task>) {
    this.taskMap = new Map<string, Task>();
    tasks.forEach((task) => this.taskMap.set(task.id, task));
  }

  filterTasks(state: string): Array<Task> {
    return Array.from(this.taskMap.values()).filter((t) => t.state === state);
  }

  addTask(task: Task): TaskList {
    if (this.taskMap.get(task.id)) {
      throw new Error("The task already exists");
    }
    const clone = this.clone();
    clone.taskMap.set(task.id, task);
    return clone;
  }

  updateTask(task: Task): TaskList {
    const clone = this.clone();
    clone.taskMap.set(task.id, task);
    return clone;
  }

  updateState(id: string, state: string): TaskList {
    const clone = this.clone();
    const task = clone.taskMap.get(id);
    if (task) {
      task.state = state;
    }
    return clone;
  }

  deleteTask(id: string): TaskList {
    const clone = this.clone();
    clone.taskMap.delete(id);
    return clone;
  }

  clone(): TaskList {
    const clone = new TaskList([]);
    clone.taskMap = new Map<string, Task>(this.taskMap);
    return clone;
  }
}

export default Task;
