import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import "./TaskCreationView.css";
import Task, { TaskState } from "../model/Task";

const defaultPriority = "50";

type TaskCreationViewProps = {
  currentDate: Date;
  onOkCallbak: (t: Task) => void;
  onCancelCallback: () => void;
};

function TaskCreationView(props: TaskCreationViewProps) {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const onNameChange = (name: string) => {
    setIsNameValid(name.trim() !== "");
    setName(name);
  };
  const [description, setDescription] = useState<string>("");
  const onDescriptionChange = (description: string) => {
    setDescription(description);
  };
  const [date, setDate] = useState<Date | null>(props.currentDate);
  const onDateChange = (date: Date | null) => {
    setDate(date);
  };
  const [priority, setPriority] = useState(defaultPriority);
  const [isPriorityValid, setIsPriorityValid] = useState(true);
  const onPriorityChange = (priority: string) => {
    const priorityNumber = Number(priority);
    setIsPriorityValid(0 <= priorityNumber && priorityNumber <= 100);
    setPriority(priority);
  };
  const toTask = (name: string) => {
    const task: Task = {
      id: String(new Date().getTime()),
      description: description.trim() !== null ? description : undefined,
      name: name,
      state: TaskState.TODO,
      deadline: date != null ? date : undefined,
      priority: Number(priority)
    };
    return task;
  };
  const onOk = (t: Task) => {
    props.onOkCallbak(t);
    setName("");
    setDescription("");
    setDate(props.currentDate);
    setPriority(defaultPriority);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Paper className="Task-creation-area" elevation={10}>
        <Grid container className="taskArea" spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Name"
              required={true}
              size="medium"
              fullWidth
              onChange={e => onNameChange(e.target.value)}
              error={!isNameValid}
              helperText={isNameValid ? "" : "Name must not be empty"}
              value={name}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              label="Description"
              multiline
              size="small"
              fullWidth
              onChange={e => onDescriptionChange(e.target.value)}
              value={description}
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid item xs={7}>
            <KeyboardDatePicker
              id="date"
              label="Deadline"
              format="MM/dd/yyyy"
              variant="inline"
              onChange={e => onDateChange(e)}
              value={date}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="priority"
              label="Priority"
              type="number"
              onChange={e => onPriorityChange(e.target.value)}
              value={priority}
              error={!isPriorityValid}
              inputProps={{ min: "0", max: "100", step: "10" }}
              fullWidth={true}
              helperText={
                isPriorityValid
                  ? "Lower number is higher priority"
                  : "Priority must be positive and less than or equal to 100"
              }
            ></TextField>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid item xs="auto">
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={name === "" || !isNameValid || !isPriorityValid}
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
    </MuiPickersUtilsProvider>
  );
}

export default TaskCreationView;
