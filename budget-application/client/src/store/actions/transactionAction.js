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

export function setLoadingTransaction(payload) {
  return {
    type: SET_LOADING_TRANSACTION,
    payload,
  };
}

export function fetchTransactions(params = {}) {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch(setLoadingTransaction(true));
    return new Promise((resolve, reject) => {
      axios({
        url: `${server}/transaction`,
        headers: {
          access_token,
        },
        params,
      })
        .then((response) => {
          dispatch(setTransactions(response.data));
        })
        .catch((err) => {
          reject(err.response.data.message);
        })
        .finally(() => {
          dispatch(setLoadingTransaction(false));
        });
    });
  };
}

export function fetchTransactionById(id) {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch(setLoadingTransaction(true));
    return new Promise((resolve, reject) => {
      axios({
        url: `${server}/transaction/${id}`,
        headers: {
          access_token,
        },
      })
        .then((response) => {
          dispatch(setTransactionById(response.data));
        })
        .catch((err) => {
          reject(err.response.data.message);
        })
        .finally(() => {
          dispatch(setLoadingTransaction(false));
        });
    });
  };
}

export function postTransaction(data) {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch(setLoadingTransaction(true));
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${server}/transaction`,
        headers: {
          access_token,
        },
        data,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err.response.data.message);
        })
        .finally(() => {
          dispatch(setLoadingTransaction(false));
        });
    });
  };
}
