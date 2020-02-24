import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import themeObject from './util/theme';
//Redux
import { Provider } from 'react-redux';
import { SET_AUTHENTICATED } from './redux/types';
import { getAuthenticatedUserSummary, logoutUser } from './redux/actions/userActions';
// Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';
import UnauthRoute from './util/UnauthRoute';
//Pages
import Home from './pages/Home';
import Contest from './pages/Contest';
import ContestUseTimer from './pages/ContestUseTimer';
import Results from './pages/Results';
import Rankings from './pages/Rankings';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import User from './pages/User';
import Settings from './pages/Settings';
//Firebase
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import store from './redux/store'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'



const theme = createMuiTheme(themeObject);

axios.defaults.baseURL = 
'https://asia-northeast1-hcon-98e1e.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getAuthenticatedUserSummary());
  }
}

const fbConfig = {
  apiKey: "AIzaSyCOsBhiS-gUvJ--rtKeY6eljedeixSS5FI",
    authDomain: "hcon-98e1e.firebaseapp.com",
    databaseURL: "https://hcon-98e1e.firebaseio.com",
    projectId: "hcon-98e1e",
    storageBucket: "hcon-98e1e.appspot.com",
    messagingSenderId: "413063046385",
}

// react-redux-firebase config
const rrfConfig = {
  // userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Create store with reducers and initial state

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}


class App extends Component {
  render() {
    return(
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
            <Router>
              <Navbar />
                <div className="container">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/user/:userId" component={User} />
                    <AuthRoute exact path="/login" component={Login} />
                    <AuthRoute exact path="/signup" component={SignUp} />
                    <Route exact path="/result/:contestId" component={Results} />
                    <Route exact path="/ranking" component={Rankings} />
                    <UnauthRoute exact path="/contest" component={Contest} />
                    <UnauthRoute exact path="/contestUseTimer" component={ContestUseTimer} />
                    <UnauthRoute exact path="/settings" component={Settings} />
                  </Switch>
                </div>
            </Router>
            </ReactReduxFirebaseProvider>
          </Provider>
        </MuiThemeProvider>
    ); 
  }
}

export default App;