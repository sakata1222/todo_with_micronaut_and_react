import React, { useState } from "react";
import Grid, { GridSize } from "@material-ui/core/Grid";
import { useDrop } from "react-dnd";
import "./TaskArea.css";
import TaskCreationLauncher from "./TaskCreationLauncher";
import TaskView, { DraggedTask } from "./TaskView";
import Task, { TaskList, TaskState } from "../common/Task";

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

function TaskColumns(props: TaskColumnsProps) {
  const [tasks, setTasks] = useState(new TaskList());
  const [, todoDrop] = useDrop({
    accept: DnDItemType.TASK,
    drop: (item: DraggedTask) =>
      setTasks(tasks.updateState(item.taskId, TaskState.TODO))
  });
  const [, doingDrop] = useDrop({
    accept: DnDItemType.TASK,
    drop: (item: DraggedTask) =>
      setTasks(tasks.updateState(item.taskId, TaskState.DOING))
  });
  const [, doneDrop] = useDrop({
    accept: DnDItemType.TASK,
    drop: (item: DraggedTask) =>
      setTasks(tasks.updateState(item.taskId, TaskState.DONE))
  });
  const [isAdding, setIsAdding] = useState(false);
  const onTaskSubmitCallback = (t: Task) => {
    setIsAdding(false);
    setTasks(tasks.addTask(t));
  };
  return (
    <Grid container className="taskArea" spacing={1}>
      <Grid item xs={props.todoAreaRatio}>
        <Grid item xs={12}>
          <TaskCreationLauncher
            isAdding={isAdding}
            onAddClickCallback={() => setIsAdding(true)}
            onTaskCanceCallback={() => setIsAdding(false)}
            onTaskSubmitCallback={onTaskSubmitCallback}
          ></TaskCreationLauncher>
        </Grid>
        <Grid item xs={12}>
          <div ref={todoDrop} className="Task-column">
            <TaskAreaColumn
              state={TaskState.TODO}
              tasks={tasks.filterTasks(TaskState.TODO)}
            ></TaskAreaColumn>
          </div>
        </Grid>
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

type TaskAreaColumnProps = {
  state: string;
  tasks: Array<Task>;
};

function TaskAreaColumn(props: TaskAreaColumnProps) {
  return (
    <Grid container className="taskColumn" spacing={2}>
      {props.tasks.map((task, i) => {
        return (
          <Grid item xs={6}>
            <TaskView task={task} dndItemType={DnDItemType.TASK}></TaskView>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default TaskArea;
