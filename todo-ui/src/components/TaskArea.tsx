import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid, { GridSize } from "@material-ui/core/Grid";
import { useDrop } from "react-dnd";
import "./TaskArea.css";
import TaskCreationLauncherContainer from "./TaskCreationLauncherContainer";
import TaskView, { DraggedTask } from "./TaskView";
import Task, { TaskState } from "../model/Task";
import { createTask, changeTaskState } from "../redux-module/ReduxTaskModule";
import { taskSelector } from "../redux-module/Store";

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
  const tasks = useSelector(taskSelector);
  const dispatch = useDispatch();
  const [, todoDrop] = useDrop({
    accept: DnDItemType.TASK,
    drop: (item: DraggedTask) =>
      dispatch(changeTaskState(item.taskId, TaskState.TODO))
  });
  const [, doingDrop] = useDrop({
    accept: DnDItemType.TASK,
    drop: (item: DraggedTask) =>
      dispatch(changeTaskState(item.taskId, TaskState.DOING))
  });
  const [, doneDrop] = useDrop({
    accept: DnDItemType.TASK,
    drop: (item: DraggedTask) =>
      dispatch(changeTaskState(item.taskId, TaskState.DONE))
  });
  const onTaskSubmitCallback = (t: Task) => {
    dispatch(createTask(t));
  };
  return (
    <Grid container className="taskArea" spacing={1}>
      <Grid item xs={props.todoAreaRatio}>
        <Grid item xs={12}>
          <TaskCreationLauncherContainer />
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
