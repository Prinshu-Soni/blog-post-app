import { CALL_API } from 'src/middleware/apiMiddleware';
import { LoadingPageType } from 'src/state/common/actions';

export const GET_TODO_DATA_SUCCESS = 'todo/GET_TODO_DATA_SUCCESS';
export const GET_TODO_DATA_FAILURE = 'todo/GET_TODO_DATA_FAILURE';
export const RESET_TODO_DATA = 'todo/RESET_TODO_DATA';

export const getTodoData = (userId: number, page: number): APIAction => ({
  type: CALL_API,
  endpoint: `/todos?userId=${userId}&_page=${page}&_limit=5`,
  method: 'GET',
  authenticated: false,
  actions: {
    success: GET_TODO_DATA_SUCCESS,
    error: GET_TODO_DATA_FAILURE,
  },
  loadingPageType: LoadingPageType.TODO,
});

export const resetTodoData: DefaultReduxAction = () => ({
  type: RESET_TODO_DATA,
});
