import { GET_USER_DATA_FAILURE, GET_USER_DATA_SUCCESS } from './actions';

const initialState: UserStore = {
  data: [],
  error: null,
};

type UserPayload = UserData[] & Error;

const user = (
  state = initialState,
  action: ReduxAction<UserPayload>
): UserStore => {
  const { type, payload, error } = action;
  if (!payload) {
    return state;
  }

  switch (type) {
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        data: payload,
        error: null,
      };

    case GET_USER_DATA_FAILURE:
      return { ...state, data: [], error };

    default:
      return state;
  }
};

export default user;
