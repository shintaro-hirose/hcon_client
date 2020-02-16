import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    STOP_LOADING_UI,
    OPEN_SUCCESSBAR,
    CLOSE_SUCCESSBAR
  } from '../types';
  
  const initialState = {
    loading: false,
    openSuccessbar: false,
    successbarMessage:"",
    errors: {}
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_ERRORS:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          loading: false,
          errors: {}
        };
      case LOADING_UI:
        return {
          ...state,
          loading: true
        };
      case STOP_LOADING_UI:
        return {
          ...state,
          loading: false
        };
      case OPEN_SUCCESSBAR:
        return {
          ...state,
          successbarMessage: action.payload,
          openSuccessbar: true,
          loading: false
        };
      case CLOSE_SUCCESSBAR:
          return {
            ...state,
            successbarMessage: "",
            openSuccessbar: false,
        };
      default:
        return state;
    }
  }