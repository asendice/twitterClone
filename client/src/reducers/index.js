import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import boxReducer from "./boxReducer";

export default combineReducers({
  box: boxReducer,
  form: formReducer,
});
