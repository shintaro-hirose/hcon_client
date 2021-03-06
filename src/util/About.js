import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import logo from "../images/hcon-full-icon-4.svg";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: "10px 0",
    boxShadow: theme.shadows[5],
    textAlign: "center",
  },
  logo: {
    color: theme.palette.primary,
    width: "180px",
    height: "180px",
  },
}));

export default function About() {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.paper}>
        <img alt="logo" src={logo} className={classes.logo} />
        <Box padding="10px">
          <Typography variant="body1">
            3BLD競技者のための大会プラットフォームです。
            <br />
            毎日24：00に更新します。
          </Typography>
        </Box>
      </Paper>
    </div>
  );
}
