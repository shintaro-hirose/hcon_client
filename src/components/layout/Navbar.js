import React, {  Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../images/hcon_nav_icon_5.svg'
import LogoutModal from '../../util/LogoutModal';
// MUI stuff
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 180;
const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  nav:{
    [theme.breakpoints.up('sm')]: {
      width: "550px",
      margin: "auto",
    },
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      padding: 0,

    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#eeeeee",
    color: "383B55",
  },
  hconLogo:{
    [theme.breakpoints.up('sm')]: {
      flexGrow: 1,
    edge: "start",
    },
    [theme.breakpoints.down('xs')]: {
     margin: "0 auto"
    },
  }
}));

function Navbar(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
    const handleLogout = () => {
        setOpen(true);
      };
    const { authenticated, authorizedUserSummary } = props;
    const user = authorizedUserSummary.userHandle;
    const [selected, setSelected] = useState("");
    

    const handleSelected0 = () => {
      setSelected("");
    }
    const handleSelected1 = () => {
      setSelected("results");
    }
    const handleSelected2 = () => {
      setSelected("ranking");
    }
    const handleSelected3 = () => {
      setSelected("mypage");
    }
    const handleSelected4 = () => {
      setSelected("settings");
    }
    const handleSelected5 = () => {
      setSelected("login");
    }
    const handleSelected6 = () => {
      setSelected("signup");
    }

    return (
      <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.nav}>
          {authenticated ? (
            <Fragment>
              <Box component={Link} to="/" onClick={handleSelected0} className={classes.hconLogo}>
              <img src={logo} alt="logo"
              width={50}
              height={50}
              display="inline"
              />
              </Box>
              <Hidden xsDown >
              <Box flexGrow={1}>
              <Button 
              color={selected === "results" ? "secondary" : "inherit"} 
              onClick={handleSelected1}
              component={Link} 
              to={`/resultMap`}>
                過去の大会
              </Button>
              <Button 
              color={selected === "ranking" ? "secondary" : "inherit"} 
              onClick={handleSelected2} 
              component={Link} to="/ranking">
                ランキング
              </Button>
              <Button 
              color={selected === "mypage" ? "secondary" : "inherit"} 
              onClick={handleSelected3}
              component={Link} to={`/user/${user}`}>
                マイページ
              </Button>

              <Button 
              color={selected === "settings" ? "secondary" : "inherit"} 
              onClick={handleSelected4}
              component={Link} to="/settings">
                設定
              </Button>
              </Box>
              <Button color="inherit"  onClick={handleLogout} variant="outlined">
                ログアウト
              </Button>
              <LogoutModal open={open} setOpen={setOpen} />
              </Hidden>
            </Fragment>
          ) : (
            <Fragment>
              <Box component={Link} to="/" className={classes.hconLogo} onClick={handleSelected0}>
              <img src={logo} alt="logo"
              width={50}
              height={50}
              display="inline"
              />
              </Box>
              <Hidden xsDown >
              <Box flexGrow={1}> 
              <Button
              color={selected === "results" ? "secondary" : "inherit"} 
              onClick={handleSelected1}
              component={Link} to={`/resultMap`} >
                過去の大会
              </Button>
              <Button
              color={selected === "ranking" ? "secondary" : "inherit"} 
              onClick={handleSelected2}
              component={Link} to="/ranking">
                ランキング
              </Button>
              </Box>
              <Box>
              <Button 
              color={selected === "login" ? "secondary" : "inherit"} 
              onClick={handleSelected5}
              component={Link} to="/login" >
                ログイン
              </Button>
              <Button
              color={selected === "signup" ? "secondary" : "inherit"} 
              onClick={handleSelected6}
              component={Link} to="/signup" variant="outlined">
                登録
              </Button>
              </Box>
              </Hidden>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      </div>
    );
}


Navbar.propTypes = {
  authorizedUserSummary: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,

};

const mapStateToProps = (state) => ({
  authorizedUserSummary: state.user.authorizedUserSummary,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);