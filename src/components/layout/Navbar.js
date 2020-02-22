import React, { Component, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../images/hcon-icon.svg'
// MUI stuff
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { logoutUser } from '../../redux/actions/userActions';

const now = new Date();
now.setDate(now.getDate() -1);
let year = String(now.getFullYear());
let month = String(now.getMonth() + 1) ;
let date = String(now.getDate());
month = ('0'+ month).slice(-2);
date = ('0'+ date).slice(-2);
const contestId = year+month+date;

const drawerWidth = 180;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  nav:{
    [theme.breakpoints.up('sm')]: {
      width: "550px",
    },
    [theme.breakpoints.down('xs')]: {
      width: "100%",
    },
    margin: "auto",
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#eeeeee",
    color: "383B55",
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const theme = useTheme();
    const handleLogout = () => {
      setMobileOpen(!mobileOpen);
        props.logoutUser();
      };
    const { authenticated, authorizedUserSummary } = props;
    const user = authorizedUserSummary.userHandle;
    const [selected, setSelected] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
    
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  

    const drawer = (
      <div>
        <Divider />
        {authenticated ? (
          <List>
            <ListItem button component={Link} to="/"　onClick={handleDrawerToggle} color="primary">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="ホーム" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to={`/result/${contestId}`} onClick={handleDrawerToggle}>
              <ListItemIcon><DescriptionIcon /></ListItemIcon>
              <ListItemText primary="昨日の結果" />
            </ListItem>
            <ListItem button component={Link} to="/ranking" onClick={handleDrawerToggle}>
            <ListItemIcon><FormatListNumberedIcon /></ListItemIcon>
              <ListItemText primary="ランキング" />
            </ListItem>
            <ListItem button component={Link} to={`/user/${user}`} onClick={handleDrawerToggle}>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="マイページ" />
            </ListItem>
            <ListItem button component={Link} to="/settings" onClick={handleDrawerToggle}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="設定" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/"　onClick={handleLogout}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="ログアウト" />
            </ListItem>
        </List>
        ) : (
        <List>
          <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="ホーム" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to={`/result/${contestId}`} onClick={handleDrawerToggle}>
            <ListItemIcon><DescriptionIcon /></ListItemIcon>
              <ListItemText primary="昨日の結果" />
            </ListItem>
            <ListItem button component={Link} to="/ranking" onClick={handleDrawerToggle}>
            <ListItemIcon><FormatListNumberedIcon /></ListItemIcon>
              <ListItemText primary="ランキング" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/login" onClick={handleDrawerToggle}>
            <ListItemIcon><LockOpenIcon /></ListItemIcon>
              <ListItemText primary="ログイン" />
            </ListItem>
            <ListItem button component={Link} to="/signup" onClick={handleDrawerToggle}>
            <ListItemIcon><PersonAddIcon /></ListItemIcon>
              <ListItemText primary="登録" />
            </ListItem>
        </List>
        )}
        
      </div>
    );

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
              <Box component={Link} to="/" edge="start" flexGrow={1} onClick={handleSelected0}>
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
              to={`/result/${contestId}`}>
                昨日の結果
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
              <Button color="inherit" component={Link} to="/" onClick={handleLogout} variant="outlined">
                ログアウト
              </Button>
              </Hidden>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
              </IconButton>
            </Fragment>
          ) : (
            <Fragment>
              <Box component={Link} to="/" flexGrow={1} onClick={handleSelected0}>
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
              component={Link} to={`/result/${contestId}`} >
                昨日の結果
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
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
              </IconButton>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp >
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'left' : 'right'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
        </Hidden>
      </nav>
      </div>
    );
}

const mapActionsToProps = { logoutUser };

Navbar.propTypes = {
  authorizedUserSummary: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  authorizedUserSummary: state.user.authorizedUserSummary,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, mapActionsToProps)(Navbar);