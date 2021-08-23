import { Dispatch } from "redux";
import {
  POST_FAIL,
  POST_LOADING,
  POST_SUCCESS,
  PostDispatchTypes,
} from "store/actions/PostActionTypes";
import axios from "axios";

export const GetPosts =
  (userId: number) => async (dispatch: Dispatch<PostDispatchTypes>) => {
    try {
      dispatch({
        type: POST_LOADING,
      });

      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );

      dispatch({
        type: POST_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: POST_FAIL,
      });
    }
  };
