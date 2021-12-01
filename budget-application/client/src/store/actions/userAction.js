import axios from "axios";
import { server } from "../../apis/server";
import { SET_USERDATA, SET_LOADING_USER } from "../actionType";

export function setUserdata(payload) {
  return {
    type: SET_USERDATA,
    payload,
  };
}

export function setLoading(payload) {
  return {
    type: SET_LOADING_USER,
    payload,
  };
}

export function register(data) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${server}/register`,
        data,
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

export function login(data) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${server}/login`,
        data,
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

export function fetchUserdata() {
  const access_token = localStorage.getItem("access_token");
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    return new Promise((resolve, reject) => {
      axios({
        url: `${server}/userdata`,
        headers: {
          access_token,
        },
      })
        .then((response) => {
          dispatch(setUserdata(response.data));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    });
  };
}
