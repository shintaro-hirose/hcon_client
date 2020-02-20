import {
    CLOSE_SUCCESSBAR,
  } from '../types';
export const closeSuccessbar = () => (dispatch) => {
    dispatch({
        type: CLOSE_SUCCESSBAR,
    });
  };
