import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../images/hcon-icon@2x.png'
// MUI stuff
import Box from '@material-ui/core/Box';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { logoutUser } from '../../redux/actions/userActions';
import { openSuccessbar } from '../../redux/actions/uiActions';

const now = new Date();
now.setDate(now.getDate() -1);
let year = String(now.getFullYear());
let month = String(now.getMonth() + 1) ;
let date = String(now.getDate());
month = ('0'+ month).slice(-2);
date = ('0'+ date).slice(-2);
const contestId = year+month+date;

class Navbar extends Component {
    handleLogout = () => {
        this.props.logoutUser();
        this.props.openSuccessbar("ログアウトしました");
      };
    
    handleImgClick = () => {

    }

  render() {
    const { authenticated, authorizedUserSummary } = this.props;
    const user = authorizedUserSummary.userHandle
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <Box component={Link} to="/" edge="start" flexGrow={1}>
              <img src={logo} alt="logo"
              width={50}
              height={50}
              display="inline"
              />
              </Box>
              <Box flexGrow={1}>
              <Button color="inherit" component={Link} to={`/result/${contestId}`}>
                昨日の結果
              </Button>
              <Button color="inherit" component={Link} to="/ranking">
                ランキング
              </Button>
              <Button color="inherit" component={Link} to={`/user/${user}`}>
                マイページ
              </Button>

              <Button color="inherit" component={Link} to="/settings">
                設定
              </Button>
              </Box>
              <Button color="inherit" component={Link} to="/" onClick={this.handleLogout} variant="outlined">
                ログアウト
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Box component={Link} to="/" flexGrow={1}>
              <img src={logo} alt="logo"
              width={50}
              height={50}
              display="inline"
              />
              </Box>
              <Box flexGrow={1}> 
              <Button color="inherit" component={Link} to={`/result/${contestId}`} >
                昨日の結果
              </Button>
              <Button color="inherit" component={Link} to="/ranking">
                ランキング
              </Button>
              </Box>
              <Box>
              <Button color="inherit" component={Link} to="/login" >
                ログイン
              </Button>
              <Button color="inherit" component={Link} to="/signup" variant="outlined">
                登録
              </Button>
              </Box>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapActionsToProps = { logoutUser, openSuccessbar };

Navbar.propTypes = {
  authorizedUserSummary: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  openSuccessbar: PropTypes.func.isRequired

};

const mapStateToProps = (state) => ({
  authorizedUserSummary: state.user.authorizedUserSummary,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, mapActionsToProps)(Navbar);