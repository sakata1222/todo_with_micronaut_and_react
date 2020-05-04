import React from "react";
import Box from "@material-ui/core/Box";
import Grid, { GridSize } from "@material-ui/core/Grid";
import "./TaskHeader.css";

// https://medium.com/@koss_lebedev/type-aliases-vs-interfaces-in-typescript-based-react-apps-e77c9a1d5fd0
// use type instead of interface
type TaskHeaderProps = {
  todoAreaRatio: GridSize;
  doingAreaRatio: GridSize;
  doneAreaRatio: GridSize;
};

function TaskHeader(props: TaskHeaderProps) {
  const boxProps = {
    height: "100%",
    bgcolor: "primary.main",
    color: "primary.contrastText",
    fontSize: "h4.fontSize",
    fontWeight: "fontWeightBold",
    textAlign: "center",
    mb: "8px",
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={props.todoAreaRatio}>
        <Box {...boxProps}>Todo</Box>
      </Grid>
      <Grid item xs={props.doingAreaRatio}>
        <Box {...boxProps}>Doing</Box>
      </Grid>
      <Grid item xs={props.doneAreaRatio}>
        <Box {...boxProps}>Done</Box>
      </Grid>
    </Grid>
  );
}

export default TaskHeader;
