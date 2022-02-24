import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "../../images/hcon-nav-icon-4.svg";
import LogoutModal from "../../util/LogoutModal";
// MUI stuff
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import { toggleDarkMode } from "../../redux/actions/uiActions";

const useStyles = makeStyles((theme) => ({
  root: {
  },
  appbar:{
    backgroundColor: "#383B55",
    color: "#fff"
  },
  nav: {
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      padding: 0,
      display:"flex",
      width: "100%",
      maxWidth:"700px"
    },
  },
  hconLogo: {
    [theme.breakpoints.up("sm")]: {
      marginRight: "auto",
      marginLeft: "15px",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
    },
    "& img":{
      verticalAlign: "middle",
    }
  },
  login:{
    marginRight: 0,
    marginLeft: "auto",
  },
  settings:{
    marginRight: 0,
    marginLeft: "auto",
  },
  togglebutton:{
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      right: 5
    },
    marginLeft:"5px"
  }

}));

function Navbar(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleLogout = () => {
    setOpen(true);
  };
  const { authenticated, authorizedUserSummary, darkmode } = props;
  const user = authorizedUserSummary.userHandle;
  const [selected, setSelected] = useState("");

  const handleSelected0 = () => {
    setSelected("");
  };
  const handleSelected1 = () => {
    setSelected("results");
  };
  const handleSelected2 = () => {
    setSelected("ranking");
  };
  const handleSelected3 = () => {
    setSelected("mypage");
  };
  const handleSelected4 = () => {
    setSelected("settings");
  };
  const handleSelected5 = () => {
    setSelected("login");
  };
  const handleSelected6 = () => {
    setSelected("signup");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar className={classes.nav}>
          <Box
            component={Link}
            to="/"
            onClick={handleSelected0}
            className={classes.hconLogo}
          >
            <img
              src={logo}
              alt="logo"
              width={50}
              height={50}
              display="inline"
            />
          </Box>
          <Hidden xsDown>
          <Button
            color={selected === "results" ? "secondary" : "inherit"}
            onClick={handleSelected1}
            component={Link}
            to={`/resultMap`}
          >
            過去の大会
          </Button>
          <Button
            color={selected === "ranking" ? "secondary" : "inherit"}
            onClick={handleSelected2}
            component={Link}
            to="/ranking"
          >
            ランキング
          </Button>
          {authenticated ? (
            <Fragment>
              <Button
                color={selected === "mypage" ? "secondary" : "inherit"}
                onClick={handleSelected3}
                component={Link}
                to={`/user/${user}`}
              >
                マイページ
              </Button>

              <Button
                color={selected === "settings" ? "secondary" : "inherit"}
                onClick={handleSelected4}
                component={Link}
                to="/settings"
                className={classes.settings}
              >
                設定
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                variant="outlined"
                className={classes.logout}
              >
                ログアウト
              </Button>
              <LogoutModal open={open} setOpen={setOpen} />
            </Fragment>
          ) : (
            <Fragment>
              <Button
                color={selected === "login" ? "secondary" : "inherit"}
                onClick={handleSelected5}
                component={Link}
                to="/login"
                className={classes.login}
              >
                ログイン
              </Button>
              <Button
                color={selected === "signup" ? "secondary" : "inherit"}
                onClick={handleSelected6}
                component={Link}
                to="/signup"
                variant="outlined"
              >
                登録
              </Button>
            </Fragment>
          )}
          </Hidden>
          <Tooltip
            title="ライト/ダークテーマに変更する"
            placement="bottom"
          >
            <Button 
            color="inherit"
            onClick={props.toggleDarkMode}
            className={classes.togglebutton}
            >
              <BrightnessMediumIcon />
            </Button>
          </Tooltip>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  authorizedUserSummary: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  darkmode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizedUserSummary: state.user.authorizedUserSummary,
  authenticated: state.user.authenticated,
  darkmode: state.UI.darkmode,
});

const mapActionsToProps = {
  toggleDarkMode,
};
export default connect(mapStateToProps, mapActionsToProps)(Navbar);
