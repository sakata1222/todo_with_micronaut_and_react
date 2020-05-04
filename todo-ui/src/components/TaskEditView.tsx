import React from "react";
import Popover from "@material-ui/core/Popover";
import TaskSubmitView from "./TaskSubmitView";
import Task from "../model/Task";
import "./TaskEditView.css";

type TaskEditViewProps = {
  task: Task;
  anchorEl: HTMLButtonElement | null;
  onOk: (task: Task) => void;
  onCancel: () => void;
};

function TaskEditView(props: TaskEditViewProps) {
  const task = props.task;
  return (
    <Popover
      className="Task-edit-popover"
      id={"task-edit" + task.id}
      open={Boolean(props.anchorEl)}
      onClose={props.onCancel}
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <div className="Task-creation-container">
        <TaskSubmitView
          task={task}
          onOkCallbak={props.onOk}
          onCancelCallback={props.onCancel}
        ></TaskSubmitView>
      </div>
    </Popover>
  );
}

export default TaskEditView;
