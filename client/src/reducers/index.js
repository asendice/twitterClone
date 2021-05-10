import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import boxReducer from "./boxReducer";
import selectBoxReducer from "./selectBoxReducer";
import commentReducer from "./commentReducer";
import replyReducer from "./replyReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import usersReducer from "./usersReducer";
import selectUserReducer from "./selectUserReducer";
import selectCommentReducer from "./selectCommentReducer";

export default combineReducers({
  box: boxReducer,
  selectedComment: selectCommentReducer,
  comment: commentReducer,
  replies: replyReducer,
  selectedBox: selectBoxReducer,
  registerInfo: registerReducer,
  userInfo: loginReducer,
  allUsers: usersReducer,
  selectedUser: selectUserReducer,
  form: formReducer,
});
