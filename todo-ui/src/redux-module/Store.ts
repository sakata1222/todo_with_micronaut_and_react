import { createStore, combineReducers } from "redux";
import taskReducer from "./ReduxTaskModule";
import { TaskList } from "../model/Task";

const rootReducer = combineReducers({ taskState: taskReducer });
type RootState = ReturnType<typeof rootReducer>;
const rootStore = createStore(combineReducers({ taskState: taskReducer }));

// selectors

export function taskSelector(state: RootState): TaskList {
  return state.taskState.tasks;
}

export default rootStore;
