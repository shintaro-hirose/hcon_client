import userReducer from "./userReducer";
import uiReducer from "./uiReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
  // data: dataReducer,
  UI: uiReducer,
});

export default rootReducer;
