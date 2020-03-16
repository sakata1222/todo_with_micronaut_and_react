import React from "react";
import { useDrag, useDrop } from "react-dnd";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Task from "../model/Task";

type TaskViewProps = {
  dndItemType: string;
  task: Task;
};

// https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_hooks_ts/04-sortable/simple?from-embed
export interface DraggedTask {
  taskId: string;
  type: string;
}

function TaskView(props: TaskViewProps) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: props.dndItemType, taskId: props.task.id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: "move"
      }}
    >
      <Card>
        <Typography variant="h5" component="h2">
          {props.task.name}
        </Typography>
      </Card>
    </div>
  );
}

export default TaskView;
