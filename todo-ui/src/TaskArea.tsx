import React, { useState } from "react";
import { DndProvider, useDrag, useDrop, DragObjectWithType } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import Grid, { GridSize } from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import "./TaskArea.css";

// https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_hooks_ts/04-sortable/simple?from-embed

type TaskAreaProps = {
  todoAreaRatio: GridSize;
  doingAreaRatio: GridSize;
  doneAreaRatio: GridSize;
};

const DnDItemType = {
  TASK: "task"
};

function TaskArea(props: TaskAreaProps) {
  return (
    <TaskColumns
      todoAreaRatio={props.todoAreaRatio}
      doingAreaRatio={props.doingAreaRatio}
      doneAreaRatio={props.doneAreaRatio}
    ></TaskColumns>
  );
}

type TaskColumnsProps = {
  todoAreaRatio: GridSize;
  doingAreaRatio: GridSize;
  doneAreaRatio: GridSize;
};

interface DragTask {
  taskId: string;
  type: string;
}

class TaskList {
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

function TaskColumns(props: TaskColumnsProps) {
  const [tasks, setTasks] = useState(new TaskList());
  const [, todoDrop] = useDrop({
    accept: DnDItemType.TASK,
    drop: (item: DragTask) =>
      setTasks(tasks.updateState(item.taskId, TaskState.TODO))
  });
  const [, doingDrop] = useDrop({
    accept: DnDItemType.TASK,
    drop: (item: DragTask) =>
      setTasks(tasks.updateState(item.taskId, TaskState.DOING))
  });
  const [, doneDrop] = useDrop({
    accept: DnDItemType.TASK,
    drop: (item: DragTask) =>
      setTasks(tasks.updateState(item.taskId, TaskState.DONE))
  });
  return (
    <Grid container className="taskArea" spacing={1}>
      <Grid item xs={props.todoAreaRatio}>
        <div ref={todoDrop} className="Task-column">
          <TaskAreaColumn
            state={TaskState.TODO}
            tasks={tasks.filterTasks(TaskState.TODO)}
          ></TaskAreaColumn>
        </div>
      </Grid>
      <Grid item xs={props.doingAreaRatio}>
        <div ref={doingDrop} className="Task-column">
          <TaskAreaColumn
            state={TaskState.DOING}
            tasks={tasks.filterTasks(TaskState.DOING)}
          ></TaskAreaColumn>
        </div>
      </Grid>
      <Grid item xs={props.doneAreaRatio}>
        <div ref={doneDrop} className="Task-column">
          <TaskAreaColumn
            state={TaskState.DONE}
            tasks={tasks.filterTasks(TaskState.DONE)}
          ></TaskAreaColumn>
        </div>
      </Grid>
    </Grid>
  );
}

const TaskState = {
  TODO: "todo",
  DOING: "doing",
  DONE: "done"
};

type TaskAreaColumnProps = {
  state: string;
  tasks: Array<Task>;
};

type Task = {
  id: string;
  name: string;
  state: string;
};

function TaskAreaColumn(props: TaskAreaColumnProps) {
  return (
    <Grid container className="taskColumn" spacing={2}>
      {props.tasks.map((task, i) => {
        return (
          <Grid item xs={6}>
            <TaskView task={task}></TaskView>
          </Grid>
        );
      })}
    </Grid>
  );
}

type TaskViewProps = {
  task: Task;
};

function TaskView(props: TaskViewProps) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: DnDItemType.TASK, taskId: props.task.id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: "move"
      }}
    >
      <Card>
        <Typography variant="h5" component="h2">
          {props.task.name}
        </Typography>
      </Card>
    </div>
  );
}

export default TaskArea;
