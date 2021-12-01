import { combineReducers } from "redux";
import userReducer from "./userReducer";
import transactionReducer from "./transactionReducer";

const reducers = combineReducers({
  userReducer,
  transactionReducer,
});

export default reducers;
