import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TaskCreationView from "./TaskCreationView";
import Task from "../model/Task";

type TaskCreationLauncherProps = {
  currentDate: Date;
  onTaskSubmitCallback: (t: Task) => void;
  onTaskCanceCallback: () => void;
};

function TaskCreationLauncher(props: TaskCreationLauncherProps) {
  const [isAdding, setIsAdding] = useState(false);
  const onSubmit = (t: Task) => {
    props.onTaskSubmitCallback(t);
    setIsAdding(false);
  };
  const onCancel = () => {
    props.onTaskCanceCallback();
    setIsAdding(false);
  };
  return (
    <div>
      <Collapse in={isAdding}>
        <TaskCreationView
          currentDate={props.currentDate}
          onOkCallbak={onSubmit}
          onCancelCallback={onCancel}
        ></TaskCreationView>
      </Collapse>
      <Fab
        disabled={isAdding}
        color="primary"
        size="medium"
        onClick={e => setIsAdding(true)}
      >
        <AddIcon color={isAdding ? "disabled" : "inherit"} fontSize="large" />
      </Fab>
    </div>
  );
}

export default TaskCreationLauncher;
