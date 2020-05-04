import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TaskSubmitView from "./TaskSubmitView";
import Task, { TaskState } from "../model/Task";
import "./TaskCreationLauncher.css";

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
  const task: Task = {
    id: "creation-dummy",
    name: "",
    state: TaskState.TODO,
    deadline: props.currentDate,
    priority: 50,
  };
  return (
    <div>
      <Collapse in={isAdding}>
        <Paper className="Task-creation-area" elevation={10}>
          <TaskSubmitView
            task={task}
            onOkCallbak={onSubmit}
            onCancelCallback={onCancel}
          ></TaskSubmitView>
        </Paper>
      </Collapse>
      <Fab
        disabled={isAdding}
        color="primary"
        size="medium"
        onClick={(e) => setIsAdding(true)}
      >
        <AddIcon color={isAdding ? "disabled" : "inherit"} fontSize="large" />
      </Fab>
    </div>
  );
}

export default TaskCreationLauncher;
