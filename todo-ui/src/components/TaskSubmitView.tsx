import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Task, { TaskState } from "../model/Task";
import "./TaskSubmitView.css";

type TaskSubmitView = {
  style?: React.CSSProperties | undefined;
  task: Task;
  onOkCallbak: (t: Task) => void;
  onCancelCallback: () => void;
};

function TaskSubmitView(props: TaskSubmitView) {
  const baseTask = props.task;
  const [name, setName] = useState(baseTask.name);
  const [isNameValid, setIsNameValid] = useState(true);
  const onNameChange = (name: string) => {
    setIsNameValid(name.trim() !== "");
    setName(name);
  };
  const [description, setDescription] = useState<string | undefined>(
    baseTask.description
  );
  const onDescriptionChange = (description: string) => {
    setDescription(description);
  };
  const [date, setDate] = useState<Date | undefined>(baseTask.deadline);
  const onDateChange = (date: Date | undefined) => {
    setDate(date);
  };
  const [priority, setPriority] = useState(
    baseTask.priority ? String(baseTask.priority) : undefined
  );
  const [isPriorityValid, setIsPriorityValid] = useState(true);
  const onPriorityChange = (priority: string) => {
    const priorityNumber = Number(priority);
    setIsPriorityValid(0 <= priorityNumber && priorityNumber <= 100);
    setPriority(priority);
  };
  const formToTask = () => {
    const task: Task = {
      id: baseTask.id,
      description: description ? description.trim() : undefined,
      name: name,
      state: baseTask.state,
      deadline: date != null ? date : undefined,
      priority: Number(priority),
    };
    return task;
  };
  const onOk = (t: Task) => {
    props.onOkCallbak(t);
    setName("");
    setDescription("");
    setDate(t.deadline);
    setPriority(t.priority ? String(t.priority) : undefined);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="name"
            label="Name"
            required={true}
            size="medium"
            fullWidth
            onChange={(e) => onNameChange(e.target.value)}
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
            onChange={(e) => onDescriptionChange(e.target.value)}
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
            onChange={(e) => onDateChange(e ? e : undefined)}
            value={date}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="priority"
            label="Priority"
            type="number"
            onChange={(e) => onPriorityChange(e.target.value)}
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
        <Grid item xs={12} className="Task-creation-buttons">
          <div className="Task-creation-button">
            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={name === "" || !isNameValid || !isPriorityValid}
              startIcon={<SaveIcon />}
              onClick={(_) => onOk(formToTask())}
            >
              Save
            </Button>
          </div>
          <div className="Task-creation-button">
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<CancelIcon />}
              onClick={(e) => props.onCancelCallback()}
            >
              Cancel
            </Button>
          </div>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default TaskSubmitView;
