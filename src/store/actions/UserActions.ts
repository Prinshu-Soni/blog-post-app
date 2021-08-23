import { Dispatch } from "redux";
import {
  USER_FAIL,
  USER_LOADING,
  USER_SUCCESS,
  UserDispatchTypes,
} from "store/actions/UserActionTypes";
import axios from "axios";

export const GetUsers = () => async (dispatch: Dispatch<UserDispatchTypes>) => {
  try {
    dispatch({
      type: USER_LOADING,
    });

    const res = await axios.get("https://jsonplaceholder.typicode.com/users");

    dispatch({
      type: USER_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: USER_FAIL,
    });
  }
};
