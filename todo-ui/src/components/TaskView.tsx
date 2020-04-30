import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import DetailsIcon from "@material-ui/icons/Details";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Task from "../model/Task";
import DateFnsUtils from "@date-io/date-fns";
import Tooltip from "@material-ui/core/Tooltip";
import TaskDeleteConfirmationDialog from "./TaskDeleteConfirmationDialog";
import "./TaskView.css";

type TaskViewProps = {
  task: Task;
};

function TaskView(props: TaskViewProps) {
  const task = props.task;
  const [deleteDialogOepn, setDeleteDialogOpen] = useState(false);
  const [displayDescription, setDisplayDescription] = useState(false);
  const descriptionLines: Array<string | JSX.Element> = new Array();
  (task.description ? task.description : "No description")
    .split("\n")
    .forEach((line, i) => {
      descriptionLines.push(line);
      descriptionLines.push(<br key={task.id + i} />);
    });
  const formatter = new DateFnsUtils();
  descriptionLines.pop();
  return (
    <Card>
      <div className="Task-card-content">
        <Grid container spacing={1}>
          <Tooltip title={descriptionLines} placement="top" arrow={true}>
            <Grid item xs={9}>
              <Typography
                className="Task-typography"
                variant="body1"
                display="inline"
              >
                {props.task.name}
              </Typography>
            </Grid>
          </Tooltip>
          <Grid item xs={1}>
            <IconButton
              size="small"
              onClick={(_) => setDisplayDescription(!displayDescription)}
            >
              <DetailsIcon fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              size="small"
              onClick={(_) => {
                console.log("clicked");
                setDeleteDialogOpen(true);
              }}
            >
              <DeleteForeverIcon fontSize="small" />
            </IconButton>
          </Grid>
          <TaskDeleteConfirmationDialog
            task={task}
            open={deleteDialogOepn}
            onOk={() => setDeleteDialogOpen(false)}
            onCancel={() => setDeleteDialogOpen(false)}
          ></TaskDeleteConfirmationDialog>
          <Grid item xs={12}>
            <Collapse in={displayDescription}>
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
    </Card>
  );
}

export default TaskView;
