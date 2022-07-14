import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 20,
    padding: "20px 0",
    boxShadow: theme.shadows[5],
    backgroundColor: "#b2ebf2",
    color: "black",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    padding: "10px",
  },
  body: {
    fontSize: 18,
    textAlign: "center",
    padding: "0 10px",
  },
  annotation: {
    fontSize: 18,
    textAlign: "center",
    padding: "0 10px",
  },
}));

function ExhibitionField(props) {
  const classes = useStyles();
  const { appState } = props;
  const word = () => {
    switch(appState.status){
      case "pre":
        return "を開催します!";
      case "ongoing":
        return "開催中!";
      case "end":
        return "が終了しました!";
      default:
        return "";
    }
  }
  return (
    !appState.status || appState.status === "" || appState.status === "none" ? <></> :
    <Paper className={classes.root}>
      <Typography className={classes.title}>
        {appState.title + word()}
      </Typography>
      <Typography className={classes.body}>
        {appState.body}
      </Typography>
      <Typography className={classes.annotation}>
        {appState.annotation}
      </Typography>
    </Paper>
  );
}

export default ExhibitionField;
