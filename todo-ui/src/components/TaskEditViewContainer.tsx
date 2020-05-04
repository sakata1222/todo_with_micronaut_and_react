import React from "react";
import { useDispatch } from "react-redux";
import TaskEditView from "./TaskEditView";
import Task from "../model/Task";
import { editTask } from "../redux-module/ReduxTaskModule";

type TaskEditViewContainer = {
  task: Task;
  anchorEl: HTMLButtonElement | null;
  onOk: (t: Task) => void;
  onCancel: () => void;
};

function TaskEditViewContainer(props: TaskEditViewContainer) {
  const dispatch = useDispatch();
  const onTaskSubmitCallback = (t: Task) => {
    dispatch(editTask(t));
    props.onOk(t);
  };
  return (
    <TaskEditView
      task={props.task}
      anchorEl={props.anchorEl}
      onOk={onTaskSubmitCallback}
      onCancel={props.onCancel}
    ></TaskEditView>
  );
}

export default TaskEditViewContainer;
