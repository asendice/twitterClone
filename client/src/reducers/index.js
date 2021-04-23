import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import boxReducer from "./boxReducer";
import selectBoxReducer from "./selectBoxReducer";
import commentReducer from "./commentReducer";

export default combineReducers({
  box: boxReducer,
  comment: commentReducer,
  selectedBox: selectBoxReducer,
  form: formReducer,
});
