import { combineReducers } from "redux";
import userReducer from "store/reducers/UserReducer";
import todoReducer from "store/reducers/TodoReducer";
import postReducer from "store/reducers/PostReducer";

const RootReducer = combineReducers({
  users: userReducer,
  todos: todoReducer,
  posts: postReducer,
});

export default RootReducer;
