import {
  USER_FAIL,
  USER_LOADING,
  USER_SUCCESS,
  UserDispatchTypes,
  UserType,
} from "store/actions/UserActionTypes";

interface DefaultStateI {
  loading: boolean;
  users?: UserType[];
}

const defaultState: DefaultStateI = {
  loading: false,
  users: []
};

const userReducer = (
  state: DefaultStateI = defaultState,
  action: UserDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case USER_FAIL:
      return {
        loading: false,
      };
    case USER_LOADING:
      return {
        loading: true,
      };
    case USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
