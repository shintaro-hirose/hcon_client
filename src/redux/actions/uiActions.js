import {
  CLOSE_SUCCESSBAR,
  CLOSE_ERRORBAR,
  OPEN_TWEET_MODAL,
  CLOSE_TWEET_MODAL,
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
