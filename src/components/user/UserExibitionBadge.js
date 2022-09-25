import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// MUI stuff
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";

//images
import harukazeLogo from "../../images/harukaze-logo.svg";
import OTAWarmupLogo from "../../images/OTAWarmupLogo.svg";
import YOGA2022Logo from "../../images/YOGA2022Logo.svg";
import SYUKO2022Logo from "../../images/SYUKO2022Logo.svg";
import firstFont from "../../images/first-font.svg";
import secondFont from "../../images/second-font.svg";
import thirdFont from "../../images/third-font.svg";

function Badge(props) {
  const {place, imgalt, imgsrc, backgroundColor, resultUrl} = props;
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
      backgroundColor: backgroundColor,
    },
    logo: {
      width: "100px",
      height: "47px",
    },
    fontLogo: {
      width: "55px"
    },
  }));

  const classes = useStyles();
  
  return (
    <Paper className={classes.paper}>
      <Tooltip title="コンテストのページに行く">
        <Link  to={resultUrl}>
          <Box display="flex" alignItems="center" padding="0 20px">
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
        </Link>
      </Tooltip>
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
          imgalt="harukazeLogo" 
          imgsrc={harukazeLogo}
          backgroundColor="#fce4ec"
          resultUrl="/exibitionAllResults/breathOfSpring2020"
          />
        ) : (
          <></>
        )
      }
      {
        userData.OTAWarmupResult ? (
          <Badge 
          place={userData.OTAWarmupResult} 
          imgalt="OTAWarmupLogo" 
          imgsrc={OTAWarmupLogo}
          backgroundColor="#b2ebf2"
          resultUrl="/result/20220723"
          />
        ) : (
          <></>
        )
      }
      {
        userData.YOGA2022Result ? (
          <Badge 
          place={userData.YOGA2022Result} 
          imgalt="YOGA2022Logo" 
          imgsrc={YOGA2022Logo}
          backgroundColor="#ffe0b2"
          resultUrl="/result/20220814"
          />
        ) : (
          <></>
        )
      }
      {
        userData.SYUKO2022Result ? (
          <Badge 
          place={userData.SYUKO2022Result} 
          imgalt="SYUKO2022Logo" 
          imgsrc={SYUKO2022Logo}
          backgroundColor="#ff8a80"
          resultUrl="/result/20220925"
          />
        ) : (
          <></>
        )
      }
      
    </Fragment>
  );
}

export default UserExibitionBadge;
