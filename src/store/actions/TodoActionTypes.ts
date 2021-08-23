export const TODO_LOADING = "TODO_LOADING";
export const TODO_FAIL = "TODO_FAIL";
export const TODO_SUCCESS = "TODO_SUCCESS";

export type TodoType = {
  id: number,
  userId: number,
  title: string,
  completed: boolean
};

export interface TodoLoading {
  type: typeof TODO_LOADING;
}

export interface TodoFail {
  type: typeof TODO_FAIL;
}

export interface TodoSuccess {
  type: typeof TODO_SUCCESS;
  payload: TodoType[];
}

export type TodoDispatchTypes = TodoLoading | TodoFail | TodoSuccess;
