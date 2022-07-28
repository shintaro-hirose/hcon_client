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

function Badge(props) {
  const {place, backgroundImage, imgalt, imgsrc} = props;
  let fontsrc = "";
  if(place === "first"){
    fontsrc = firstFont;
  } else if(place === "second"){
    fontsrc = secondFont;
  } else if(place === "third"){
    fontsrc = thirdFont;
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      width: "100%",
      padding: "10px 0",
      boxShadow: theme.shadows[5],
      marginTop: "10px",
      textAlign: "center",
      backgroundImage: `url(${backgroundImage})`,
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
    <Paper className={classes.paper}>
      <Box display="flex" alignItems="center" padding="0 50px">
        <Box flexGrow={1}>
          <img
            alt={imgalt}
            src={imgsrc}
            className={classes.logo}
          />
        </Box>
        <Box flexGrow={1}>
          <img
            alt="fontLogo"
            src={fontsrc}
            className={classes.fontLogo}
          />
        </Box>
      </Box>
    </Paper>
  )
}

function UserExibitionBadge(props) {
  const userData = props.userData;

  return (
    <Fragment>
      {
        userData.breathOfSpring2020Result ? (
          <Badge 
          place={userData.breathOfSpring2020Result} 
          backgroundImage={sakura} 
          imgalt="harukazeLogo" 
          imgsrc={harukazeLogo} 
          />
        ) : (
          <></>
        )
      }
      {
        userData.OTAWarmupResult ? (
          <Badge 
          place={userData.breathOfSpring2020Result} 
          backgroundImage={sakura} 
          imgalt="harukazeLogo" 
          imgsrc={harukazeLogo} 
          />
        ) : (
          <></>
        )
      }
    </Fragment>
  );
}

export default UserExibitionBadge;
