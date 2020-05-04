import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DetailsIcon from "@material-ui/icons/Details";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import Task from "../model/Task";
import TaskDisplayView from "./TaskDisplayView";
import TaskEditViewContainer from "./TaskEditViewContainer";
import TaskDeleteConfirmationDialogLauncher from "./TaskDeleteConfirmationDialogLauncher";
import "./TaskView.css";

type TaskViewProps = {
  task: Task;
};

function TaskView(props: TaskViewProps) {
  const task = props.task;
  const [
    editViewAnchorEl,
    setEditViewAnchorEl,
  ] = useState<HTMLButtonElement | null>(null);
  const [deleteDialogOepn, setDeleteDialogOpen] = useState(false);
  const [displayDescription, setDisplayDescription] = useState(false);
  const descriptionLines: Array<string | JSX.Element> = new Array();
  (task.description ? task.description : "No description")
    .split("\n")
    .forEach((line, i) => {
      descriptionLines.push(line);
      descriptionLines.push(<br key={task.id + i} />);
    });
  descriptionLines.pop();
  return (
    <Card>
      <div className="Task-card-content">
        <Grid container spacing={1}>
          <Grid item xs={12} className="Task-header">
            <div className="Task-title">
              <Tooltip title={descriptionLines} placement="top" arrow={true}>
                <Typography
                  className="Task-typography"
                  variant="body1"
                  display="inline"
                >
                  {props.task.name}
                </Typography>
              </Tooltip>
            </div>
            <div className="Task-buttons">
              <IconButton
                size="small"
                onClick={(_) => setDisplayDescription(!displayDescription)}
              >
                <DetailsIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={(ev) => setEditViewAnchorEl(ev.currentTarget)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={(_) => setDeleteDialogOpen(true)}
              >
                <DeleteForeverIcon fontSize="small" />
              </IconButton>
            </div>
            <TaskEditViewContainer
              task={task}
              anchorEl={editViewAnchorEl}
              onOk={(_) => setEditViewAnchorEl(null)}
              onCancel={() => setEditViewAnchorEl(null)}
            ></TaskEditViewContainer>
            <TaskDeleteConfirmationDialogLauncher
              task={task}
              open={deleteDialogOepn}
              onOk={() => setDeleteDialogOpen(false)}
              onCancel={() => setDeleteDialogOpen(false)}
            ></TaskDeleteConfirmationDialogLauncher>
          </Grid>
          <Grid item xs={12}>
            <TaskDisplayView
              task={task}
              descriptionLines={descriptionLines}
              displayDescription={displayDescription}
            ></TaskDisplayView>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}

export default TaskView;
