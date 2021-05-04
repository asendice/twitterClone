import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import boxReducer from "./boxReducer";
import selectBoxReducer from "./selectBoxReducer";
import commentReducer from "./commentReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import usersReducer from "./usersReducer";
import selectUserReducer from "./selectUserReducer";

export default combineReducers({
  box: boxReducer,
  comment: commentReducer,
  selectedBox: selectBoxReducer,
  registerInfo: registerReducer,
  userInfo: loginReducer,
  allUsers: usersReducer,
  selectedUser: selectUserReducer,
  form: formReducer,
});
