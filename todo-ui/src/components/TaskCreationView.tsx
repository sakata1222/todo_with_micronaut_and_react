import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import "./TaskCreationView.css";
import Task, { TaskState } from "../model/Task";

type TaskCreationViewProps = {
  onOkCallbak: (t: Task) => void;
  onCancelCallback: () => void;
};

function TaskCreationView(props: TaskCreationViewProps) {
  const [name, setName] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(true);
  const onTitleChange = (name: string) => {
    setIsTitleValid(name.trim() != "");
    setName(name);
  };
  const toTask = (name: string) => {
    const task: Task = {
      id: String(new Date().getTime()),
      name: name,
      state: TaskState.TODO
    };
    return task;
  };
  const onOk = (t: Task) => {
    props.onOkCallbak(t);
    setName("");
  };
  return (
    <Paper className="Task-creation-area" elevation={10}>
      <Grid container className="taskArea" spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="name"
            label="Name"
            required={true}
            size="medium"
            fullWidth
            onChange={e => onTitleChange(e.target.value)}
            error={!isTitleValid}
            helperText={isTitleValid ? "" : "Name must not be empty"}
            value={name}
          ></TextField>
        </Grid>
        <Grid container justify="center" spacing={2}>
          <Grid item xs="auto">
            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={name === "" || !isTitleValid}
              startIcon={<SaveIcon />}
              onClick={e => onOk(toTask(name))}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs="auto">
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<CancelIcon />}
              onClick={e => props.onCancelCallback()}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TaskCreationView;
