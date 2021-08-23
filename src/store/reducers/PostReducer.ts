import {
  POST_FAIL,
  POST_LOADING,
  POST_SUCCESS,
  PostDispatchTypes,
  PostType,
} from "store/actions/PostActionTypes";

interface DefaultStateI {
  loading: boolean;
  posts?: PostType[];
}

const defaultState: DefaultStateI = {
  loading: false,
  posts: [],
};

const postReducer = (
  state: DefaultStateI = defaultState,
  action: PostDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case POST_FAIL:
      return {
        loading: false,
      };
    case POST_LOADING:
      return {
        loading: true,
      };
    case POST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
