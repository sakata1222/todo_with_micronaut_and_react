import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Grid, { GridSize } from "@material-ui/core/Grid";
import { useDrop } from "react-dnd";
import "./TaskArea.css";
import TaskCreationLauncherContainer from "./TaskCreationLauncherContainer";
import DraggableTaskView, { DraggedTask } from "./DraggableTaskView";
import Task, { TaskState } from "../model/Task";
import { changeTaskState } from "../redux-module/ReduxTaskModule";
import { taskSelector } from "../redux-module/Store";

type TaskAreaProps = {
  todoAreaRatio: GridSize;
  doingAreaRatio: GridSize;
  doneAreaRatio: GridSize;
};

const DnDItemType = {
  TASK: "task",
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
      dispatch(changeTaskState(item.taskId, TaskState.TODO)),
  });
  const [, doingDrop] = useDrop({
    accept: DnDItemType.TASK,
    drop: (item: DraggedTask) =>
      dispatch(changeTaskState(item.taskId, TaskState.DOING)),
  });
  const [, doneDrop] = useDrop({
    accept: DnDItemType.TASK,
    drop: (item: DraggedTask) =>
      dispatch(changeTaskState(item.taskId, TaskState.DONE)),
  });
  const boxProps = {
    className: "Task-column-box",
  };
  return (
    <Grid container className="Task-area" spacing={1}>
      <Grid item xs={props.todoAreaRatio} className="Task-column-todo">
        <Box {...boxProps}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TaskCreationLauncherContainer />
            </Grid>
          </Grid>
          <Grid item xs={12} ref={todoDrop} className="Task-column">
            <TaskAreaColumn
              state={TaskState.TODO}
              tasks={tasks.filterTasks(TaskState.TODO)}
            ></TaskAreaColumn>
          </Grid>
        </Box>
      </Grid>
      <Grid
        item
        xs={props.doingAreaRatio}
        ref={doingDrop}
        className="Task-column"
      >
        <Box {...boxProps}>
          <TaskAreaColumn
            state={TaskState.DOING}
            tasks={tasks.filterTasks(TaskState.DOING)}
          ></TaskAreaColumn>
        </Box>
      </Grid>
      <Grid
        item
        xs={props.doneAreaRatio}
        ref={doneDrop}
        className="Task-column"
      >
        <Box {...boxProps}>
          <TaskAreaColumn
            state={TaskState.DONE}
            tasks={tasks.filterTasks(TaskState.DONE)}
          ></TaskAreaColumn>
        </Box>
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
          <Grid key={"task-area-column-" + props.state + i} item xs={6}>
            <DraggableTaskView
              task={task}
              dndItemType={DnDItemType.TASK}
            ></DraggableTaskView>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default TaskArea;
