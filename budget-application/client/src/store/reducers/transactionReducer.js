import { SET_LOADING_TRANSACTION, SET_TRANSACTIONS } from "../actionType";

const initialState = {
  transactions: [],
  isLoading: false,
};

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    case SET_LOADING_TRANSACTION:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
