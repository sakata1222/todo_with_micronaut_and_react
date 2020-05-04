import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import DateFnsUtils from "@date-io/date-fns";
import Task from "../model/Task";
import "./TaskDisplayView.css";

type TaskDisplayViewProps = {
  task: Task;
  descriptionLines: Array<string | JSX.Element>;
  displayDescription: boolean;
};

function TaskDisplayView(props: TaskDisplayViewProps) {
  const task = props.task;
  const descriptionLines = props.descriptionLines;
  const formatter = new DateFnsUtils();
  return (
    <div className="Task-display">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Collapse in={props.displayDescription}>
            <Typography
              color={task.description ? "textPrimary" : "textSecondary"}
              variant="body2"
              align="left"
              component="p"
            >
              {descriptionLines}
            </Typography>
          </Collapse>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                color="textSecondary"
                component="p"
                align="left"
              >
                Deadline
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color={task.deadline ? "textPrimary" : "textSecondary"}
                component="p"
                align="left"
              >
                {task.deadline
                  ? formatter.format(task.deadline, "MM/dd/yyyy")
                  : "-"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                color="textSecondary"
                component="p"
                align="left"
              >
                Priority
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                color={task.priority ? "textPrimary" : "textSecondary"}
                variant="body2"
                component="p"
                align="left"
              >
                {task.priority ? task.priority : "-"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default TaskDisplayView;
