import {
    CLOSE_SUCCESSBAR,
    CLOSE_ERRORBAR
  } from '../types';
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
