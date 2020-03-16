import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCreationLauncher from "./TaskCreationLauncher";
import Task, { TaskState } from "../model/Task";
import { createTask } from "../redux-module/ReduxTaskModule";

function TaskCreationLauncherContainer() {
  const dispatch = useDispatch();
  const onTaskSubmitCallback = (t: Task) => {
    dispatch(createTask(t));
  };
  return (
    <TaskCreationLauncher
      onTaskCanceCallback={() => null}
      onTaskSubmitCallback={onTaskSubmitCallback}
    ></TaskCreationLauncher>
  );
}

export default TaskCreationLauncherContainer;
