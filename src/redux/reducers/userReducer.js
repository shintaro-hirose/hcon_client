import {
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    UNLOADING_USER,
    SET_USER_SUMMARIES,
    SET_AUTH_USER_SUMMARY,
    SET_USER_RESULTS,
    SET_CONTEST,
    } from '../types';
  
  const initialState = {
    authenticated: false,
    loading: false,
    authorizedUserSummary:{},
    userSummaries: [],
    authorizedUserCredential:{},
    selectedUserResults: [],
    contest: {
      contestId:"",
      scrambles: {
        first:"",
        second:"",
        third:""
      }
    }
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_AUTHENTICATED:
        return {
          ...state,
          authenticated: true
        };
      case SET_UNAUTHENTICATED:
        return {
          ...state,
          authenticated:false,
          authorizedUserSummary:{},
          authorizedUserCredential:{}
        };
      case SET_AUTH_USER_SUMMARY:
        return {
          ...state,
          authenticated: true,
          loading: false,
          authorizedUserSummary: action.payload
        };
        case SET_USER_RESULTS:
          return {
            ...state,
            loading: false,
            selectedUserResults: action.payload
          };
      case LOADING_USER:
        return {
          ...state,
          loading: true
        };
        case UNLOADING_USER:
          return {
            ...state,
            loading: false
          };
      case SET_USER_SUMMARIES:
        return {
          ...state,
          loading: false,
          userSummaries: action.payload,
        };
      case SET_CONTEST:
        return{
          ...state,
          loading:false,
          contest: action.payload,
        }
      default:
            return state;
    }
  }