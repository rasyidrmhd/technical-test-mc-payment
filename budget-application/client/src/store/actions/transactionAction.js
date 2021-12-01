import axios from "axios";
import { server } from "../../apis/server";
import { SET_TRANSACTIONS, SET_LOADING_TRANSACTION, SET_TRANSACTION_BY_ID } from "../actionType";

export function setTransactions(payload) {
  return {
    type: SET_TRANSACTIONS,
    payload,
  };
}

export function setTransactionById(payload) {
  return {
    type: SET_TRANSACTION_BY_ID,
    payload,
  };
}

export function setLoading(payload) {
  return {
    type: SET_LOADING_TRANSACTION,
    payload,
  };
}

export function fetchTransactions() {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    return new Promise((resolve, reject) => {
      axios({
        url: `${server}/transaction`,
        headers: {
          access_token,
        },
      })
        .then((response) => {
          console.log(response.data);
          dispatch(setTransactions(response.data));
        })
        .catch((err) => {
          reject(err.response.data.message);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    });
  };
}

export function fetchTransactionById(id) {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    return new Promise((resolve, reject) => {
      axios({
        url: `${server}/transaction/${id}`,
        headers: {
          access_token,
        },
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.response.data.message);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    });
  };
}
