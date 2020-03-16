import React from "react";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TaskCreationView from "./TaskCreationView";
import Task from "../common/Task";

type TaskCreationLauncherProps = {
  isAdding: boolean;
  onTaskSubmitCallback: (t: Task) => void;
  onTaskCanceCallback: () => void;
  onAddClickCallback: () => void;
};

function TaskCreationLauncher(props: TaskCreationLauncherProps) {
  return (
    <div>
      <Collapse in={props.isAdding}>
        <TaskCreationView
          onOkCallbak={props.onTaskSubmitCallback}
          onCancelCallback={props.onTaskCanceCallback}
        ></TaskCreationView>
      </Collapse>
      <IconButton
        disabled={props.isAdding}
        color="primary"
        size="medium"
        onClick={e => props.onAddClickCallback()}
      >
        <AddIcon
          color={props.isAdding ? "disabled" : "action"}
          fontSize="large"
        />
      </IconButton>
    </div>
  );
}

export default TaskCreationLauncher;
