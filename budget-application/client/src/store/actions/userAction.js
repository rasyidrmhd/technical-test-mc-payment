import axios from "axios";
import { server } from "../../apis/server";
import { SET_USERDATA } from "../actionType";

export function setUserdata(payload) {
  return {
    type: SET_USERDATA,
    payload,
  };
}

export function register(data) {
  return (dispatch, getState) => {
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
        });
    });
  };
}

export function login(data) {
  return (dispatch, getState) => {
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
        });
    });
  };
}
