import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

import Paper from "@material-ui/core/Paper";

function ExibitionResultSummaryButton(props) {
  const {resultUrl, logoAlt, logoSrc, backgroundColor, dayText, partText, winText, timeText} = props;
  const useStyles = makeStyles((theme) => ({
    paper: {
      width: "80%",
      margin: "0 auto",
      marginBottom: 20,
      padding: "20px 0",
      boxShadow: theme.shadows[5],
      textAlign: "center",
      backgroundColor: backgroundColor,
    },
    title: {
      fontSize: 20,
      textAlign: "center",
      padding: 0,
      marginBottom: 20,
      padding: "10px",
    },
    content: {
      fontSize: 20,
      padding: 0,
      marginBottom: 20,
      padding: "10px",
    },
    logo: {
      width: "200px",
    },
  }));
  const classes = useStyles();

  return (
    <Paper
      className={classes.paper}
    >
      <Tooltip title="コンテストのページに行く">
       
          <Link  to={resultUrl}>
          <Grid container p={2} alignItems="center">
            <Grid item sm={6} xs={12}>
              <img
                alt={logoAlt}
                src={logoSrc}
                className={classes.logo}
              />
            </Grid>
            <Grid item sm={6} xs={12} style={{color: "#000"}}>
              <Typography>{dayText}</Typography>
              <Typography>{partText}</Typography>
              <br />
              <Typography>{winText}</Typography>
              <Typography>{timeText}</Typography>
            </Grid>
          </Grid>
          </Link>
       
      </Tooltip>
    </Paper>
  );
}

export default ExibitionResultSummaryButton;
