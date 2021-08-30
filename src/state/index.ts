import { combineReducers } from 'redux';
import common from 'src/state/common/reducer';
import post from 'src/state/post/reducer';
import todo from 'src/state/todo/reducer';
import user from 'src/state/user/reducer';

export default combineReducers({
  common,
  user,
  todo,
  post,
});
