import {
  ADD_POST_DATA_FAILURE,
  ADD_POST_DATA_SUCCESS,
  GET_POST_DATA_FAILURE,
  GET_POST_DATA_SUCCESS,
  RESET_POST_DATA,
  RESET_ADD_POST_RESPONSE_DATA,
} from './actions';

const initialState: PostStore = {
  data: [],
  error: null,
  addPostResponseData: null,
};

type PostPayload = PostData[] & Error & AddPostResponseData;

const post = (
  state = initialState,
  action: ReduxAction<PostPayload>
): PostStore => {
  const { type, payload, error } = action;

  switch (type) {
    case GET_POST_DATA_SUCCESS:
      return {
        ...state,
        data: payload || [],
        error: null,
      };

    case GET_POST_DATA_FAILURE:
      return { ...state, data: [], error };

    case ADD_POST_DATA_SUCCESS:
      return {
        ...state,
        addPostResponseData: payload || null,
        error: null,
      };

    case ADD_POST_DATA_FAILURE:
      return { ...state, addPostResponseData: null, error };

    case RESET_POST_DATA:
      return { ...state, data: [], error: null };

    case RESET_ADD_POST_RESPONSE_DATA:
      return { ...state, addPostResponseData: null, error: null };

    default:
      return state;
  }
};

export default post;
