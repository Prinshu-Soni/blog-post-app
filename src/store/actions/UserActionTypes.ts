export const USER_LOADING = "USER_LOADING";
export const USER_FAIL = "USER_FAIL";
export const USER_SUCCESS = "USER_SUCCESS";

export type UserType = {
  id: number,
  name: string,
  email: string,
  phone: string,
  website: string
};

export interface UserLoading {
  type: typeof USER_LOADING;
}

export interface UserFail {
  type: typeof USER_FAIL;
}

export interface UserSuccess {
  type: typeof USER_SUCCESS;
  payload: UserType[];
}

export type UserDispatchTypes = UserLoading | UserFail | UserSuccess;
