import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: "10px 0",
    marginTop: "20px",
    boxShadow: theme.shadows[5],
  },
  box: {
    textAlign: "center",
  },
}));

function Policy() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Box className={classes.box}>
        <Button component={Link} to="/terms" color="inherit">
          利用規約
        </Button>
        <Divider />
        <Button component={Link} to="/privacyPolicy" color="inherit">
          プライバシーポリシー
        </Button>
      </Box>
    </Paper>
  );
}

export default Policy;
