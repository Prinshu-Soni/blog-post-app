import {
  TODO_FAIL,
  TODO_LOADING,
  TODO_SUCCESS,
  TodoDispatchTypes,
  TodoType,
} from "store/actions/TodoActionTypes";

interface DefaultStateI {
  loading: boolean;
  todos?: TodoType[];
}

const defaultState: DefaultStateI = {
  loading: false,
  todos: [],
};

const todoReducer = (
  state: DefaultStateI = defaultState,
  action: TodoDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case TODO_FAIL:
      return {
        loading: false,
      };
    case TODO_LOADING:
      return {
        loading: true,
      };
    case TODO_SUCCESS:
      return {
        loading: false,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
