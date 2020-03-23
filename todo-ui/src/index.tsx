import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import "./index.css";
import App from "./App";
import taskReducer from "./redux-module/ReduxTaskModule";
import * as serviceWorker from "./serviceWorker";

// https://redux.js.org/advanced/async-actions
const loggerMiddleware = createLogger();
const store = createStore(
  combineReducers({ taskState: taskReducer }),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
