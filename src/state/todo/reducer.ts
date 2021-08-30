import {
  GET_TODO_DATA_FAILURE,
  GET_TODO_DATA_SUCCESS,
  RESET_TODO_DATA,
} from './actions';

const initialState: TodoStore = {
  data: [],
  error: null,
};

type TodoPayload = TodoData[] & Error;

const todo = (
  state = initialState,
  action: ReduxAction<TodoPayload>
): TodoStore => {
  const { type, payload, error } = action;

  switch (type) {
    case GET_TODO_DATA_SUCCESS:
      return {
        ...state,
        data: payload || [],
        error: null,
      };

    case GET_TODO_DATA_FAILURE:
      return { ...state, data: [], error };

    case RESET_TODO_DATA:
      return { ...state, data: [], error: null };

    default:
      return state;
  }
};

export default todo;
