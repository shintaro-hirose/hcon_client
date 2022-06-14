import userReducer from "./userReducer";
import uiReducer from "./uiReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
// import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  user: userReducer,
  // data: dataReducer,
  UI: uiReducer,
  firestore: firestoreReducer,
  // firebase: firebaseReducer
});

export default rootReducer;
