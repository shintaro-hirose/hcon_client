import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// MUI stuff
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
//images
import sakura from "../../images/sakura.png";
import harukazeLogo from "../../images/harukaze-logo.svg";
import firstFont from "../../images/first-font.svg";
import secondFont from "../../images/second-font.svg";
import thirdFont from "../../images/third-font.svg";

//Redux
import { connect } from "react-redux";
import { getUserResults } from "../../redux/actions/userActions";

function UserExibitionBadge(props) {
  const userData = props.userData;
  const useStyles = makeStyles((theme) => ({
    paper: {
      width: "100%",
      padding: "10px 0",
      boxShadow: theme.shadows[5],
      marginTop: "10px",
      textAlign: "center",
      backgroundImage: `url(${sakura})`,
    },
    logo: {
      width: "100px",
      height: "47px",
    },
    fontLogo: {
      width: "50px",
      height: "24px",
    },
  }));

  const classes = useStyles();

  return (
    <Fragment>
      {userData.breathOfSpring2020Result ? (
        userData.breathOfSpring2020Result === "first" ? (
          <Paper className={classes.paper}>
            <Box display="flex" alignItems="center" padding="0 50px">
              <Box flexGrow={1}>
                <img
                  alt="harukazeLogo"
                  src={harukazeLogo}
                  className={classes.logo}
                />
              </Box>
              <Box flexGrow={1}>
                <img
                  alt="fontLogo"
                  src={firstFont}
                  className={classes.fontLogo}
                />
              </Box>
            </Box>
          </Paper>
        ) : userData.breathOfSpring2020Result === "second" ? (
          <Paper className={classes.paper}>
            <Box display="flex" alignItems="center" padding="0 50px">
              <Box flexGrow={1}>
                <img
                  alt="harukazeLogo"
                  src={harukazeLogo}
                  className={classes.logo}
                />
              </Box>
              <Box flexGrow={1}>
                <img
                  alt="fontLogo"
                  src={secondFont}
                  className={classes.fontLogo}
                />
              </Box>
            </Box>
          </Paper>
        ) : userData.breathOfSpring2020Result === "third" ? (
          <Paper className={classes.paper}>
            <Box display="flex" alignItems="center" padding="0 50px">
              <Box flexGrow={1}>
                <img
                  alt="harukazeLogo"
                  src={harukazeLogo}
                  className={classes.logo}
                />
              </Box>
              <Box flexGrow={1}>
                <img
                  alt="fontLogo"
                  src={thirdFont}
                  className={classes.fontLogo}
                />
              </Box>
            </Box>
          </Paper>
        ) : (
          <p></p>
        )
      ) : (
        <p></p>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { getUserResults };

UserExibitionBadge.propTypes = {
  getUserResults: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(UserExibitionBadge);
