import {
    OPEN_SUCCESSBAR,
    CLOSE_SUCCESSBAR,
    LOADING_UI
  } from '../types';
  
export const openSuccessbar = (message) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({
        type: OPEN_SUCCESSBAR,
        payload: message
    });
  };
export const closeSuccessbar = () => (dispatch) => {
    dispatch({
        type: CLOSE_SUCCESSBAR,
    });
  };
