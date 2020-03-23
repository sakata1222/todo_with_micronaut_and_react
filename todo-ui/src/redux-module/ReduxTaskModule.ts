import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./Store";
import Task, { TaskList } from "../model/Task";
import ITaskApi, { defaultTaskApi } from "../api/TaskApi";

// https://redux.js.org/recipes/usage-with-typescript/
// https://github.com/erikras/ducks-modular-redux

const ACTION = {
  REQUEST_TASKS: "todo/task/REQUEST_TASKS",
  RECEIVE_TASKS: "todo/task/RECEIVE_TASKS",
  REQUEST_ADD_TASK: "todo/task/REQUEST_ADD_TASK",
  COMPLETE_ADD_TASK: "todo/task/COMPLETE_ADD_TASK",
  REQUEST_CHANGE_STATE: "todo/task/REQUEST_CHANGE_STATE",
  COMPLETE_CHANGE_STATE: "todo/task/COMPLETE_CHANGE_STATE"
};

export let taskApi: ITaskApi = defaultTaskApi;

// Actions
// fetch
type RequestTasksAction = {
  type: typeof ACTION.REQUEST_TASKS;
};

type ReceiveTasksAction = {
  type: typeof ACTION.RECEIVE_TASKS;
  tasks: TaskList;
};

// add
type RequestAddTaskAction = {
  type: typeof ACTION.REQUEST_TASKS;
  task: Task;
};

type CompleteAddTaskAction = {
  type: typeof ACTION.COMPLETE_ADD_TASK;
  task: Task;
};

// change
type RequestChangeTaskStateAction = {
  type: typeof ACTION.REQUEST_CHANGE_STATE;
  id: string;
  state: string;
};

type CompletChangeTaskStateAction = {
  type: typeof ACTION.COMPLETE_CHANGE_STATE;
  id: string;
  state: string;
  task: Task;
};

type TaskActionTypes =
  | RequestTasksAction
  | ReceiveTasksAction
  | RequestAddTaskAction
  | CompleteAddTaskAction
  | RequestChangeTaskStateAction
  | CompletChangeTaskStateAction;

// Action Creators
// https://redux.js.org/advanced/async-actions

function requestTasks(): RequestTasksAction {
  return {
    type: ACTION.REQUEST_TASKS
  };
}

function receiveTasks(tasks: TaskList): ReceiveTasksAction {
  return {
    type: ACTION.RECEIVE_TASKS,
    tasks: tasks
  };
}

export function fetchTasks(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<String>
> {
  return function(dispatch) {
    dispatch(requestTasks());
    return taskApi.fetchTasks().then(tasks => dispatch(receiveTasks(tasks)));
  };
}

function requestAddTask(newTask: Task): RequestAddTaskAction {
  return {
    type: ACTION.REQUEST_ADD_TASK,
    task: newTask
  };
}

function completeAddTask(createdTask: Task): CompleteAddTaskAction {
  return {
    type: ACTION.COMPLETE_ADD_TASK,
    task: createdTask
  };
}

export function addTask(
  newTask: Task
): ThunkAction<void, RootState, unknown, Action<String>> {
  return function(dispatch) {
    dispatch(requestAddTask(newTask));
    return taskApi
      .postTask(newTask)
      .then(task => dispatch(completeAddTask(task)));
  };
}

function requestChangeTaskState(
  id: string,
  state: string
): RequestChangeTaskStateAction {
  return {
    type: ACTION.REQUEST_CHANGE_STATE,
    id: id,
    state: state
  };
}

function completeChangeTaskState(
  id: string,
  state: string,
  task: Task
): CompletChangeTaskStateAction {
  return {
    type: ACTION.COMPLETE_CHANGE_STATE,
    id: id,
    state: state,
    task: task
  };
}

export function changeTaskState(
  id: string,
  state: string
): ThunkAction<void, RootState, unknown, Action<String>> {
  return function(dispatch) {
    dispatch(requestChangeTaskState(id, state));
    return taskApi
      .updateTaskState(id, state)
      .then(task => dispatch(completeChangeTaskState(id, state, task)));
  };
}

// Reducers

export type TodoTaskState = {
  tasks: TaskList;
};

const initialState: TodoTaskState = {
  tasks: new TaskList([])
};

function taskReducer(
  state = initialState,
  action: TaskActionTypes
): TodoTaskState {
  switch (action.type) {
    case ACTION.RECEIVE_TASKS:
      state.tasks = (action as ReceiveTasksAction).tasks;
      return {
        tasks: state.tasks
      };
    case ACTION.COMPLETE_ADD_TASK:
      return {
        tasks: state.tasks.addTask((action as CompleteAddTaskAction).task)
      };
    case ACTION.REQUEST_CHANGE_STATE:
      const requestChangeTaskStateAction = action as RequestChangeTaskStateAction;
      // update UI before completing request to smooth operation
      // Kind of lag will occur due to wating completion.
      return {
        tasks: state.tasks.updateState(
          requestChangeTaskStateAction.id,
          requestChangeTaskStateAction.state
        )
      };
    case ACTION.COMPLETE_CHANGE_STATE:
      const changeStateAction = action as CompletChangeTaskStateAction;
      return {
        tasks: state.tasks.updateTask(changeStateAction.task)
      };
    default:
      return state;
  }
}

export default taskReducer;
