export const POST_LOADING = "POST_LOADING";
export const POST_FAIL = "POST_FAIL";
export const POST_SUCCESS = "POST_SUCCESS";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";

export type PostType = {
  id: number,
  userId: number,
  title: string,
  body: string
};

export type AddPostType = {
  status?: number
};

export interface PostLoading {
  type: typeof POST_LOADING;
}

export interface PostFail {
  type: typeof POST_FAIL;
}

export interface PostSuccess {
  type: typeof POST_SUCCESS;
  payload: PostType[];
}

export interface AddPostSuccess {
  type: typeof ADD_POST_SUCCESS;
  payload: AddPostType;
}

export type PostDispatchTypes = PostLoading | PostFail | PostSuccess | AddPostSuccess;
