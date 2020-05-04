import React from "react";
import { useDrag } from "react-dnd";
import TaskView from "./TaskView";
import Task from "../model/Task";

type DraggableTaskViewProps = {
  dndItemType: string;
  task: Task;
};

// https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_hooks_ts/04-sortable/simple?from-embed
export interface DraggedTask {
  taskId: string;
  type: string;
}

function DraggableTaskView(props: DraggableTaskViewProps) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: props.dndItemType, taskId: props.task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: "move",
      }}
    >
      <TaskView task={props.task}></TaskView>
    </div>
  );
}

export default DraggableTaskView;
