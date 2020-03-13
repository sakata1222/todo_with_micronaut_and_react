import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import TaskHeader from "./TaskHeader";
import TaskArea from "./TaskArea";
import { GridSize } from "@material-ui/core/Grid";

// https://github.com/facebook/create-react-app/pull/8177
// https://github.com/facebook/create-react-app/pull/8412

type AreaRatio = {
  todo: GridSize;
  doing: GridSize;
  done: GridSize;
};
function App() {
  const ratio: AreaRatio = { todo: 4, doing: 4, done: 4 };
  return (
    <div className="App">
      <TaskHeader
        todoAreaRatio={ratio.todo}
        doingAreaRatio={ratio.doing}
        doneAreaRatio={ratio.done}
      ></TaskHeader>
      <TaskArea
        todoAreaRatio={ratio.todo}
        doingAreaRatio={ratio.doing}
        doneAreaRatio={ratio.done}
      ></TaskArea>
    </div>
  );
}

export default App;
