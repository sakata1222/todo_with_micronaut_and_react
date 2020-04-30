import React from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Task from "../model/Task";
import { deleteTask } from "../redux-module/ReduxTaskModule";

type TaskDeleteConfirmationDialogProps = {
  task: Task;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
};

function TaskDeleteConfirmationDialog(
  props: TaskDeleteConfirmationDialogProps
) {
  const task = props.task;
  const dispatch = useDispatch();
  return (
    <Dialog open={props.open} onClose={() => props.onCancel()}>
      <DialogTitle>Delete Task?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure want to delete the task: "{task.name}"
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onCancel()} color="primary" autoFocus>
          Disagree
        </Button>
        <Button
          onClick={() => {
            dispatch(deleteTask(task.id));
            props.onOk();
          }}
          color="primary"
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskDeleteConfirmationDialog;
