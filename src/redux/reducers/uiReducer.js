import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  OPEN_SUCCESSBAR,
  CLOSE_SUCCESSBAR,
  OPEN_ERRORBAR,
  CLOSE_ERRORBAR,
  OPEN_TWEET_MODAL,
  CLOSE_TWEET_MODAL,
  TOGGLE_DARK_MODE,
} from "../types";

const initialState = {
  loading: false,
  openSuccessbar: false,
  successbarMessage: "",
  errors: {},
  openErrorbar: false,
  errorbarMessage: "",
  openTweetModal: false,
  darkmode: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: {},
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
        errors: {},
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case OPEN_SUCCESSBAR:
      return {
        ...state,
        successbarMessage: action.payload,
        openSuccessbar: true,
        loading: false,
        errors: {},
      };
    case CLOSE_SUCCESSBAR:
      return {
        ...state,
        successbarMessage: "",
        openSuccessbar: false,
      };
    case OPEN_ERRORBAR:
      return {
        ...state,
        errorbarMessage: action.payload,
        openErrorbar: true,
        loading: false,
      };
    case CLOSE_ERRORBAR:
      return {
        ...state,
        errorbarMessage: "",
        openErrorbar: false,
      };
    case OPEN_TWEET_MODAL:
      return {
        ...state,
        openTweetModal: true,
      };
    case CLOSE_TWEET_MODAL:
      return {
        ...state,
        openTweetModal: false,
      };
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkmode: !state.darkmode,
      };
    default:
      return state;
  }
}
