import { SET_TRANSACTIONS } from "../actionType";

const initialState = {
  transactions: [],
};

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return { ...state, transactions: action.payload };

    default:
      return state;
  }
}
