import React from "react";
import Box from "@material-ui/core/Box";
import Grid, { GridSize } from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// https://medium.com/@koss_lebedev/type-aliases-vs-interfaces-in-typescript-based-react-apps-e77c9a1d5fd0
// use type instead of interface
type TaskHeaderProps = {
  todoAreaRatio: GridSize;
  doingAreaRatio: GridSize;
  doneAreaRatio: GridSize;
};

function TaskHeader(props: TaskHeaderProps) {
  const boxProps = {
    bgcolor: "primary.main",
    color: "primary.contrastText",
    fontSize: "h4.fontSize",
    fontWeight: "fontWeightBold"
  };

  return (
    <Grid container className="taskHeader" spacing={1}>
      <Grid item xs={props.todoAreaRatio}>
        <Typography>
          <Box {...boxProps}>Todo</Box>
        </Typography>
      </Grid>
      <Grid item xs={props.doingAreaRatio}>
        <Typography>
          <Box {...boxProps}>Doing</Box>
        </Typography>
      </Grid>
      <Grid item xs={props.doneAreaRatio}>
        <Typography>
          <Box {...boxProps}>Done</Box>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default TaskHeader;
