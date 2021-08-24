import {
  POST_FAIL,
  POST_LOADING,
  POST_SUCCESS,
  ADD_POST_SUCCESS,
  PostDispatchTypes,
  PostType,
  AddPostType,
} from "store/actions/PostActionTypes";

interface DefaultStateI {
  loading: boolean;
  posts?: PostType[];
  addPost?: AddPostType;
}

const defaultState: DefaultStateI = {
  loading: false,
  posts: [],
  addPost: {status: undefined}
};

const postReducer = (
  state: DefaultStateI = defaultState,
  action: PostDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case POST_FAIL:
      return {
        loading: false,
        addPost: {}
      };
    case POST_LOADING:
      return {
        loading: true,
        addPost: {}
      };
    case POST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        addPost: {}
      };
    case ADD_POST_SUCCESS:
      return {
        loading: false,
        addPost: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
