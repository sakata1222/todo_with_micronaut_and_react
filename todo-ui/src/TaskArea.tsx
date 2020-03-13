import React, { useState } from "react";
import Grid, { GridSize } from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

type TaskAreaProps = {
  todoAreaRatio: GridSize;
  doingAreaRatio: GridSize;
  doneAreaRatio: GridSize;
};

function TaskArea(props: TaskAreaProps) {
  var max: number = 12;

  return (
    <Grid container className="taskArea" spacing={1}>
      <Grid item xs={props.todoAreaRatio}>
        <TaskAreaColumn></TaskAreaColumn>
      </Grid>
      <Grid item xs={props.doingAreaRatio}>
        <TaskAreaColumn></TaskAreaColumn>
      </Grid>
      <Grid item xs={props.doneAreaRatio}>
        <TaskAreaColumn></TaskAreaColumn>
      </Grid>
    </Grid>
  );
}

type TaskAreaColumnProps = {};

type Task = {
  name: string;
};

function TaskAreaColumn(props: TaskAreaColumnProps) {
  const [tasks, setTasks] = useState<Array<Task>>([
    { name: "Dummy 1" },
    { name: "Dummy 2" }
  ]);
  return (
    <Grid container className="taskColumn" spacing={2}>
      {tasks.map((task, i) => {
        return (
          <Grid item xs={6}>
            <TaskView task={task}></TaskView>
          </Grid>
        );
      })}
    </Grid>
  );
}

type TaskViewProps = {
  task: Task;
};

function TaskView(props: TaskViewProps) {
  return (
    <Card>
      <Typography variant="h5" component="h2">
        {props.task.name}
      </Typography>
    </Card>
  );
}

export default TaskArea;
