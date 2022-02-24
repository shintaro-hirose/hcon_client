import React, { Component } from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
//Redux
import { Provider, useSelector } from "react-redux";
import { SET_AUTHENTICATED, TOGGLE_DARK_MODE } from "./redux/types";
import {
  getAuthenticatedUserSummary,
  logoutUser,
} from "./redux/actions/userActions";
// Components
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";
import UnauthRoute from "./util/UnauthRoute";
//Pages
import Home from "./pages/Home";
import Contest from "./pages/Contest";
import ContestUseTimer from "./pages/ContestUseTimer";
import ContestUseTimerPhone from "./pages/ContestUseTimerPhone";
import Exibition from "./pages/Exibition";
import ExibitionResult from "./pages/ExibitionResult";
import ExibitionUseTimer from "./pages/ExibitionUseTimer";
import ExibitionUseTimerPhone from "./pages/ExibitionUseTimerPhone";
import ExibitionAllResults from "./pages/ExibitionAllResults";

import Results from "./pages/Results";
import ResultMap from "./pages/ResultMap";
import Rankings from "./pages/Rankings";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import Settings from "./pages/Settings";
import SendEmailForPassword from "./pages/SendEmailForPassword";
import BottomNavBar from "./components/layout/BottomNavBar";
import SuccessBar from "./util/SuccessBar";
import ErrorBar from "./util/SuccessBar";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";

//Firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"; // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import store from "./redux/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { toggleDarkMode } from "./redux/actions/uiActions";

axios.defaults.baseURL =
  "https://asia-northeast1-hcon-98e1e.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getAuthenticatedUserSummary());
  }
}

// darkmodeの処理
if (localStorage.getItem("hcon_darkmode")) {
  store.dispatch({ type: TOGGLE_DARK_MODE });
}
const fbConfig = {
  apiKey: "AIzaSyCOsBhiS-gUvJ--rtKeY6eljedeixSS5FI",
  authDomain: "hcon-98e1e.firebaseapp.com",
  databaseURL: "https://hcon-98e1e.firebaseio.com",
  projectId: "hcon-98e1e",
  storageBucket: "hcon-98e1e.appspot.com",
  messagingSenderId: "413063046385",
};

// react-redux-firebase config
const rrfConfig = {
  // userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Create store with reducers and initial state

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

function App() {
  const darkmode = useSelector((state) => state.UI.darkmode);

  const themeObject = {
    palette: {
      primary: {
        main: darkmode ?"#f5f5f5" : "#383B55",
      },
      secondary: {
        main:  "#e53935"
      },
      type: darkmode ? "dark" : "light",
      background: {
        default: darkmode ? "#1e2130" : "#f5f5f5",
        paper: darkmode ? "#292d42" : "#fff",
      }
    },
    typography: {
      useNextVariants: true,
      fontFamily: [
        'Arial',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  };
  const theme = createMuiTheme(themeObject);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <Navbar />
          <SuccessBar />
          <ErrorBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/user/:userId" component={User} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={SignUp} />
              <AuthRoute
                exact
                path="/sendEmailForPassword"
                component={SendEmailForPassword}
              />
              <Route exact path="/resultMap" component={ResultMap} />
              <Route exact path="/result/:contestId" component={Results} />
              <Route exact path="/ranking" component={Rankings} />
              <UnauthRoute exact path="/contest" component={Contest} />
              <UnauthRoute
                exact
                path="/contestUseTimer"
                component={ContestUseTimer}
              />
              <UnauthRoute
                exact
                path="/contestUseTimerPhone"
                component={ContestUseTimerPhone}
              />

              <UnauthRoute
                exact
                path="/exibition/:contestId/:roundId"
                component={Exibition}
              />
              <UnauthRoute
                exact
                path="/exibitionUseTimer/:contestId/:roundId"
                component={ExibitionUseTimer}
              />
              <UnauthRoute
                exact
                path="/exibitionUseTimerPhone/:contestId/:roundId"
                component={ExibitionUseTimerPhone}
              />
              <Route
                exact
                path="/exibitionResult/:contestId/:roundId"
                component={ExibitionResult}
              />
              <Route
                exact
                path="/exibitionAllResults/:contestId"
                component={ExibitionAllResults}
              />

              <UnauthRoute exact path="/settings" component={Settings} />
              <Route exact path="/terms" component={Terms} />
              <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
            </Switch>
          </div>
          <BottomNavBar />
        </Router>
      </ReactReduxFirebaseProvider>
    </MuiThemeProvider>
  );
}

export default App;
