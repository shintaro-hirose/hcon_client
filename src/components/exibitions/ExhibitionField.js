import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";

import logo from "../../images/syuukou-logo.svg"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 20,
    padding: "20px 0",
    boxShadow: theme.shadows[5],
    backgroundColor: "#ff8a80",
    color: "black",
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    // padding: "10px",
  },
  body: {
    fontSize: 18,
    textAlign: "center",
    // padding: "0 10px",
  },
  annotation: {
    fontSize: 18,
    textAlign: "center",
    // padding: "0 10px",
  },
  logo: {
    width: "40%",
  },
}));

function ExhibitionField(props) {
  const classes = useStyles();
  const { appState } = props;
  const word = () => {
    switch(appState.status){
      // case "pre":
      //   return "を開催します!";
      // case "ongoing":
      //   return "開催中!";
      // case "end":
      //   return "が終了しました!";
      default:
        return "";
    }
  }
  return (
    appState.status === "pre" || appState.status === "ongoing" || appState.status === "end"
     ? 
    <Paper className={classes.root}>
      <img 
      alt="ExhibitionLogo"
      src={logo}
      className={classes.logo}
      />
      <Typography className={classes.title}>
        {word()}
      </Typography>
      <Typography className={classes.body}>
        {appState.body}
      </Typography>
      <Typography className={classes.annotation}>
        {appState.annotation}
      </Typography>
    </Paper> 
    : <></>
  );
}

export default ExhibitionField;
