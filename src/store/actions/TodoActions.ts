import { Dispatch } from "redux";
import {
  TODO_FAIL,
  TODO_LOADING,
  TODO_SUCCESS,
  TodoDispatchTypes,
} from "store/actions/TodoActionTypes";
import axios from "axios";

export const GetTodos =
  (userId: number, page: number) => async (dispatch: Dispatch<TodoDispatchTypes>) => {
    try {
      dispatch({
        type: TODO_LOADING,
      });

      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?userId=${userId}&_page=${page}&_limit=5`
      );

      dispatch({
        type: TODO_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: TODO_FAIL,
      });
    }
  };
