import {
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    UNLOADING_USER,
    SET_USER_SUMMARIES,
    SET_AUTH_USER_SUMMARY,
    SET_USER_RESULTS,
    SET_CONTEST,
    SET_RESULT,
    SET_USER_CREDENTIAL,
    SET_NOTIFICATIONS,
    } from '../types';
  
  const initialState = {
    authenticated: false,
    loading: false,
    notifications: [],
    authorizedUserSummary:{},
    userSummaries: [],
    authorizedUserCredential:{},
    selectedUserData: {
      bestTime1:{
        time:"",
        contestId:""
      },
      bestTime2:{
        time:"",
        contestId:""
      },
      bestTime3:{
        time:"",
        contestId:""
      },
      bestTime4:{
        time:"",
        contestId:""
      },
      bestTime5:{
        time:"",
        contestId:""
      }
    },
    contest: {
      contestId:"",
      scrambles: {
        first:"",
        second:"",
        third:""
      }
    },
    contestData: {
      scrambles: {
        first: "",
        second: "",
        third: ""
      },
      results:[]
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
            selectedUserData: action.payload
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
        };
      case SET_RESULT:
        return{
          ...state,
          loading:false,
          contestData: action.payload,
        };
      case SET_USER_CREDENTIAL:
        return{
          ...state,
          loading:false,
          authorizedUserCredential: action.payload,
        };
        case SET_NOTIFICATIONS:
          return{
            ...state,
            loading:false,
            notifications: action.payload,
          };

      default:
            return state;
    }
  }