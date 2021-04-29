import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import boxReducer from "./boxReducer";
import selectBoxReducer from "./selectBoxReducer";
import commentReducer from "./commentReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  box: boxReducer,
  comment: commentReducer,
  selectedBox: selectBoxReducer,
  registerInfo: registerReducer,
  userInfo: loginReducer,
  otherUsers: usersReducer,
  form: formReducer,
});
