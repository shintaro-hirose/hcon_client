import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "20px 0",
    padding: "20px 0",
    boxShadow: theme.shadows[5],
    textAlign: "center",
  },
  github: {
    marginRight: "10px",
  },
  twitter: {
    marginLeft: "10px",
    color: "#1DA1F2",
  },
}));
export default function Contact() {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>
        <Box marginBottom="20px">
          <Typography variant="body1">お問い合わせ・要望・修正依頼</Typography>
        </Box>
        <Tooltip title="Github" aria-label="github">
          <Button
            className={classes.github}
            href="https://github.com/shintaro-hirose/hcon_client"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Twitter" aria-label="twitter">
          <Button
            className={classes.twitter}
            href="https://twitter.com/cubeforworld"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </Button>
        </Tooltip>
      </Paper>
    </div>
  );
}
