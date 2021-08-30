declare interface PostData {
  id: number;
  userId: number;
  title: string;
  body: string;
}

declare interface AddPostResponseData {
  id: number;
  title: string;
  body: string;
}

declare interface PostStore {
  data: PostData[];
  error?: Error | null;
  addPostResponseData: AddPostResponseData | null;
}

declare interface AddPost {
  title: string;
  body: string;
}
