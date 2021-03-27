import {
  CLOSE_SUCCESSBAR,
  CLOSE_ERRORBAR,
  OPEN_TWEET_MODAL,
  CLOSE_TWEET_MODAL,
  TOGGLE_DARK_MODE,
} from "../types";
export const closeSuccessbar = () => (dispatch) => {
  dispatch({
    type: CLOSE_SUCCESSBAR,
  });
};
export const closeErrorbar = () => (dispatch) => {
  dispatch({
    type: CLOSE_ERRORBAR,
  });
};
export const openTweetModal = () => (dispatch) => {
  dispatch({
    type: OPEN_TWEET_MODAL,
  });
};
export const closeTweetModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_TWEET_MODAL,
  });
};
export const toggleDarkMode = () => (dispatch) => {
  dispatch({
    type: TOGGLE_DARK_MODE,
  });
  if (localStorage.getItem("hcon_darkmode")) {
    localStorage.removeItem("hcon_darkmode");
  } else {
    localStorage.setItem("hcon_darkmode", "true");
  }
};
