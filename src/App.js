import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import themeObject from './util/theme';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { getAuthenticatedUserSummary, logoutUser } from './redux/actions/userActions';
// Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';
//Pages
import Home from './pages/Home';
import Contest from './pages/Contest';
import Results from './pages/Results';
import Rankings from './pages/Rankings';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import User from './pages/User';
import Settings from './pages/Settings';


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

class App extends Component {
  render() {
    return(
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
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
                    <Route exact path="/contest/:contestId" component={Contest} />
                    <Route exact path="/settings" component={Settings} />
                  </Switch>
                </div>
            </Router>
          </Provider>
        </MuiThemeProvider>
    ); 
  }
}

export default App;