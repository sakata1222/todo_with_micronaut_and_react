import Task, { TaskList, TaskState } from "../model/Task";

// https://redux.js.org/recipes/usage-with-typescript/
// https://github.com/erikras/ducks-modular-redux

const ACTION = {
  LOAD: "todo/task/LOAD",
  CREATE: "todo/task/CREATE",
  CHANGE_STATE: "todo/task/CHANGE_STATE"
};

// Actions
type LoadTaskAction = {
  type: typeof ACTION.LOAD;
};

type CreateTaskAction = {
  type: typeof ACTION.CREATE;
  newTask: Task;
};

type ChangeTaskStateAction = {
  type: typeof ACTION.CHANGE_STATE;
  id: string;
  state: string;
};

type TaskActionTypes = CreateTaskAction | ChangeTaskStateAction;

// Action Creators

export function loadTask(): LoadTaskAction {
  return {
    type: ACTION.LOAD
  };
}

export function createTask(newTask: Task): CreateTaskAction {
  return {
    type: ACTION.CREATE,
    newTask: newTask
  };
}

export function changeTaskState(id: string, state: string) {
  return {
    type: ACTION.CHANGE_STATE,
    id: id,
    state: state
  };
}

// Reducers

export type TodoTaskState = {
  tasks: TaskList;
};

const initialState: TodoTaskState = {
  tasks: new TaskList()
};

function taskReducer(
  state = initialState,
  action: TaskActionTypes
): TodoTaskState {
  switch (action.type) {
    case ACTION.LOAD:
      return state;
    case ACTION.CREATE:
      return {
        tasks: state.tasks.addTask((action as CreateTaskAction).newTask)
      };
    case ACTION.CHANGE_STATE:
      const changeStateAction = action as ChangeTaskStateAction;
      return {
        tasks: state.tasks.updateState(
          changeStateAction.id,
          changeStateAction.state
        )
      };
    default:
      return state;
  }
}

export default taskReducer;
