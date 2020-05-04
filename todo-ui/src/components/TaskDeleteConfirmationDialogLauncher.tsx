import React from "react";
import { useDispatch } from "react-redux";
import Task from "../model/Task";
import TaskDeleteConfirmationDialog from "./TaskDeleteConfirmationDialog";
import { deleteTask } from "../redux-module/ReduxTaskModule";

type TaskDeleteConfirmationDialogLauncherProps = {
  task: Task;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
};

function TaskDeleteConfirmationDialogLauncher(
  props: TaskDeleteConfirmationDialogLauncherProps
) {
  const task = props.task;
  const dispatch = useDispatch();
  const onOk = () => {
    dispatch(deleteTask(task.id));
    props.onOk();
  };
  return (
    <TaskDeleteConfirmationDialog
      task={props.task}
      open={props.open}
      onOk={onOk}
      onCancel={props.onCancel}
    ></TaskDeleteConfirmationDialog>
  );
}

export default TaskDeleteConfirmationDialogLauncher;
