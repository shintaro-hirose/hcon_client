import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    SET_USER_SUMMARIES,
    SET_AUTH_USER_SUMMARY,
    SET_USER_RESULTS,
    OPEN_SUCCESSBAR,
    SET_CONTEST,
  } from '../types';
import axios from 'axios';
  
  export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/login', userData)
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getAuthenticatedUserSummary());
        dispatch({ type: CLEAR_ERRORS });
        dispatch({
          type: OPEN_SUCCESSBAR,
          payload: "ログインに成功しました"
        });
        history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  
  export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/signup', newUserData)
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getAuthenticatedUserSummary());
        dispatch({ type: CLEAR_ERRORS });
        dispatch({
          type: OPEN_SUCCESSBAR,
          payload: "アカウント登録に成功しました"
        });
        history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  
  export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
  };
  
  export const getAllUserSummary = () => (dispatch) => {
    dispatch({type: LOADING_USER});

    axios.get('/ranking/rating')
    .then(res => {
      dispatch({
        type: SET_USER_SUMMARIES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
  }

  export const getUserResults = (userHandle) => (dispatch) => {
    dispatch({type: LOADING_USER});

    axios.get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_USER_RESULTS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
  }

  export const getAuthenticatedUserSummary = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .get('/mypage')
      .then((res) => {
        dispatch({
          type: SET_AUTH_USER_SUMMARY,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  
  export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .post('/settings/image', formData)
      .then(() => {
        dispatch(getAuthenticatedUserSummary());
      })
      .catch((err) => console.log(err));
  };
  
  export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .post('/settings', userDetails)
      .then(() => {
        dispatch(getAuthenticatedUserSummary());
      })
      .catch((err) => console.log(err));
  };
  
  
  const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
  };

  export const postContestResult = (form, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/contest', form)
      .then((res) => {
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };

  export const getContest = () => (dispatch) => {
    dispatch({ type: LOADING_USER});
    axios
    .get('/contest')
    .then(res => {
      dispatch({
        type: SET_CONTEST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
          payload: err.response.data
      })
    })
  }