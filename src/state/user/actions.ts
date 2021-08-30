import { CALL_API } from 'src/middleware/apiMiddleware';
import { LoadingPageType } from 'src/state/common/actions';

export const GET_USER_DATA_SUCCESS = 'user/GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILURE = 'user/GET_USER_DATA_FAILURE';

export const getUserData = (): APIAction => ({
  type: CALL_API,
  endpoint: '/users',
  method: 'GET',
  authenticated: false,
  actions: {
    success: GET_USER_DATA_SUCCESS,
    error: GET_USER_DATA_FAILURE,
  },
  loadingPageType: LoadingPageType.USER,
});
