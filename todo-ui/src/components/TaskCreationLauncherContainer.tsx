import React from "react";
import { useDispatch } from "react-redux";
import TaskCreationLauncher from "./TaskCreationLauncher";
import Task from "../model/Task";
import { addTask, fetchTasks } from "../redux-module/ReduxTaskModule";

function TaskCreationLauncherContainer() {
  const dispatch = useDispatch();
  const onTaskSubmitCallback = (t: Task) => {
    new Promise(resolve => {
      resolve(dispatch(addTask(t)));
    }).then(_ => dispatch(fetchTasks()));
  };
  return (
    <TaskCreationLauncher
      currentDate={new Date()}
      onTaskCanceCallback={() => null}
      onTaskSubmitCallback={onTaskSubmitCallback}
    ></TaskCreationLauncher>
  );
}

export default TaskCreationLauncherContainer;
