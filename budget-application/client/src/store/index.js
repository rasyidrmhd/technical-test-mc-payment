import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const initialState = {
  message: "Hello World",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
