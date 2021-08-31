import { CALL_API } from 'src/middleware/apiMiddleware';
import { LoadingPageType } from 'src/state/common/actions';

export const GET_POST_DATA_SUCCESS = 'post/GET_POST_DATA_SUCCESS';
export const GET_POST_DATA_FAILURE = 'post/GET_POST_DATA_FAILURE';
export const ADD_POST_DATA_SUCCESS = 'post/ADD_POST_DATA_SUCCESS';
export const ADD_POST_DATA_FAILURE = 'post/ADD_POST_DATA_FAILURE';
export const RESET_POST_DATA = 'post/RESET_POST_DATA';
export const RESET_ADD_POST_RESPONSE_DATA = 'post/RESET_ADD_POST_RESPONSE_DATA';

export const getPostData = (userId: number, page: number): APIAction => ({
  type: CALL_API,
  endpoint: `/posts?userId=${userId}&_page=${page}&_limit=5`,
  method: 'GET',
  authenticated: false,
  actions: {
    success: GET_POST_DATA_SUCCESS,
    error: GET_POST_DATA_FAILURE,
  },
  loadingPageType: LoadingPageType.POST,
});

export const addPost = (data: AddPost): APIAction => ({
  type: CALL_API,
  endpoint: '/posts',
  method: 'POST',
  body: data,
  authenticated: false,
  actions: {
    success: ADD_POST_DATA_SUCCESS,
    error: ADD_POST_DATA_FAILURE,
  },
  loadingPageType: LoadingPageType.ADD_POST,
});

export const resetPostData: DefaultReduxAction = () => ({
  type: RESET_POST_DATA,
});

export const resetAddPostResponseData: DefaultReduxAction = () => ({
  type: RESET_ADD_POST_RESPONSE_DATA,
});
