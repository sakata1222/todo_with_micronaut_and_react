type Task = {
  id: string;
  name: string;
  state: string;
  description?: string;
  deadline?: Date;
  priority?: Number;
};

export const TaskState = {
  TODO: "todo",
  DOING: "doing",
  DONE: "done"
};

export class TaskList {
  taskMap: Map<string, Task>;

  constructor() {
    this.taskMap = new Map<string, Task>();
    this.taskMap.set("1", {
      id: "1",
      name: "Dummy 1",
      state: TaskState.TODO
    });
    this.taskMap.set("2", {
      id: "2",
      name: "Dummy 2",
      state: TaskState.TODO
    });
    this.taskMap.set("3", {
      id: "3",
      name: "Dummy 3",
      state: TaskState.DOING
    });
    this.taskMap.set("4", {
      id: "4",
      name: "Dummy 4",
      state: TaskState.DOING
    });
    this.taskMap.set("5", {
      id: "5",
      name: "Dummy 5",
      state: TaskState.DONE
    });
    this.taskMap.set("6", {
      id: "6",
      name: "Dummy 6",
      state: TaskState.DONE
    });
  }

  filterTasks(state: string): Array<Task> {
    return Array.from(this.taskMap.values()).filter(t => t.state === state);
  }

  addTask(task: Task) {
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

  clone(): TaskList {
    const clone = new TaskList();
    clone.taskMap = new Map<string, Task>(this.taskMap);
    return clone;
  }
}

export default Task;
