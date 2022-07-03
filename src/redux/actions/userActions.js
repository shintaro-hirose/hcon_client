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
  SET_RESULT,
  SET_USER_CREDENTIAL,
  UNLOADING_USER,
  CLOSE_ERRORBAR,
  OPEN_ERRORBAR,
  SET_EXIBITIONS,
  OPEN_TWEET_MODAL,
  SET_NOTIFICATIONS,
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getAuthenticatedUserSummary());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: OPEN_SUCCESSBAR,
        payload: "ログインしました",
      });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getAuthenticatedUserSummary());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: OPEN_SUCCESSBAR,
        payload: "アカウント登録に成功しました",
      });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  dispatch({
    type: OPEN_SUCCESSBAR,
    payload: "ログアウトしました",
  });
};

export const getAllUserSummary = () => (dispatch) => {
  // dispatch({ type: LOADING_USER });

  axios
    .get("/ranking/rating")
    .then((res) => {
      dispatch({
        type: SET_USER_SUMMARIES,
        payload: res.data,
      });
    })
    .then(() => {
      axios.get("/getExibitions").then((res) => {
        dispatch({
          type: SET_EXIBITIONS,
          payload: res.data,
        });
      });
    })
    .catch((err) => console.log(err));
};

export const getUserResults = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_USER });

  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_USER_RESULTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getAuthenticatedUserSummary = () => (dispatch) => {
  // dispatch({ type: LOADING_USER });
  axios
    .get("/mypage")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_AUTH_USER_SUMMARY,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/settings/image", formData)
    .then(() => {
      setTimeout(function () {
        dispatch(getAuthenticatedUserSummary());
        dispatch({ type: CLEAR_ERRORS });

        dispatch({
          type: OPEN_SUCCESSBAR,
          payload: "プロフィール画像を更新しました",
        });
      }, "1000");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
      dispatch({
        type: OPEN_ERRORBAR,
        payload: err.response.data.error,
      });
    });
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/settings", userDetails)
    .then(() => {
      dispatch(getAuthenticatedUserSummary());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: OPEN_SUCCESSBAR,
        payload: "プロフィール情報を更新しました",
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const postContestResult = (form, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/contest", form)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: OPEN_SUCCESSBAR,
        payload: "コンテスト結果の送信に成功しました",
      });
      dispatch({ type: OPEN_TWEET_MODAL });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getContest = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/contest")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_CONTEST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getResult = (contestId) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get(`/result/${contestId}`)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });

      dispatch({
        type: SET_RESULT,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserCredential = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/getUserCredential")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });

      dispatch({
        type: SET_USER_CREDENTIAL,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateDisplayName = (form) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/updateDisplayName", form)
    .then((res) => {
      dispatch(getAuthenticatedUserSummary());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: OPEN_SUCCESSBAR,
        payload: "表示名を変更しました",
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const sendToEmail = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/sendToEmail", userData)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: OPEN_SUCCESSBAR,
        payload: "指定のメールアドレスにメールを送信しました",
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const sendEmailForPassword = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/sendEmailForPassword", userData)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: OPEN_SUCCESSBAR,
        payload: "指定のメールアドレスにメールを送信しました",
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const updateEmail = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/updateEmail", userData)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: OPEN_SUCCESSBAR,
        payload: "メールアドレスを更新しました",
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const updatePassword = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/updatePassword", userData)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: OPEN_SUCCESSBAR,
        payload: "パスワードを更新しました",
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const finishSignup = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get("/finishSigninFlow")
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: OPEN_SUCCESSBAR,
        payload: "アカウント登録に成功しました",
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const postExibitionResult = (form, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/postExibitionResult", form)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: OPEN_SUCCESSBAR,
        payload: "コンテスト結果の送信に成功しました",
      });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getNotifications = () => (dispatch) => {
  // dispatch({ type: LOADING_USER });
  axios
    .get("/getNotifications")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_NOTIFICATIONS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};