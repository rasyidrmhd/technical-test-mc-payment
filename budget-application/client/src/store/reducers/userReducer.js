import { SET_LOADING_USER, SET_USERDATA } from "../actionType";

const initialState = {
  userdata: {},
  isLoading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERDATA:
      return { ...state, userdata: action.payload };
    case SET_LOADING_USER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
