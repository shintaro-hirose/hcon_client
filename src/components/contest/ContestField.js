import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import TimerIcon from "@material-ui/icons/Timer";
import CreateIcon from "@material-ui/icons/Create";

import { connect } from "react-redux";

const now = new Date();
let year = String(now.getFullYear());
let month = String(now.getMonth() + 1);
let date = String(now.getDate());
month = ("0" + month).slice(-2);
date = ("0" + date).slice(-2);
const contestId = year + month + date;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 20,
    padding: "20px 0",
    boxShadow: theme.shadows[5],
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    padding: 0,
    marginBottom: 20,
    padding: "10px",
  },
  todaysResultButton: {
    textAlign: "center",
    border: "solid 2px green",
    color: "green",
    borderRadius: "10px",
    padding: "10px 30px",
  },
}));

function ContestField(props) {
  const [isPostable, setIsPostable] = useState(true);
  const classes = useStyles();
  const authenticated = props.user.authenticated;
  if (isPostable) {
    if (props.user.authorizedUserSummary.lastPostedDate) {
      const lastPostedDate = props.user.authorizedUserSummary.lastPostedDate;
      if (contestId === lastPostedDate) setIsPostable(false);
    }
  }
  function isMobile() {
    var regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return window.navigator.userAgent.search(regexp) !== -1;
  }

  let contentMarkup = authenticated ? (
    isPostable ? (
      <Grid container>
        <Grid item sm={6} xs={12} align="center">
          <Box marginBottom="10px">
            {isMobile() ? (
              <Button
                component={Link}
                to={`/contestUseTimerPhone`}
                color="primary"
                variant="outlined"
              >
                <TimerIcon />
                <Typography variant="h6">タイマーを使用する</Typography>
              </Button>
            ) : (
              <Button
                component={Link}
                to={`/contestUseTimer`}
                color="primary"
                variant="outlined"
              >
                <TimerIcon />
                <Typography variant="h6">タイマーを使用する</Typography>
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item sm={6} xs={12} align="center">
          <Button
            component={Link}
            to={`/contest`}
            color="primary"
            variant="outlined"
          >
            <CreateIcon />
            <Typography variant="h6">タイムを手入力する</Typography>
          </Button>
        </Grid>
      </Grid>
    ) : (
      <Box textAlign="center" marginBottom="20px">
        <Tooltip title="今日の暫定結果を確認する">
          <Box
            className={classes.todaysResultButton}
            component={Link}
            to={`/result/${contestId}`}
          >
            参加済み
          </Box>
        </Tooltip>
      </Box>
    )
  ) : (
    <div align="center">
      <Button component={Link} to="/login" variant="contained" color="primary">
        ログイン
      </Button>
      <Typography display="inline" variant="body2">
        {"  または  "}
      </Typography>
      <Button
        component={Link}
        to="/signup"
        variant="contained"
        color="secondary"
      >
        登録
      </Button>
      <Typography display="inline" variant="body2">
        {"  して参加する  "}
      </Typography>
    </div>
  );
  return (
    <Paper className={classes.root}>
      <Typography className={classes.title}>
        {year}/{month}/{date} のコンテスト開催中
      </Typography>
      <Typography className={classes.title}>
        ※3x3x3目隠しの大会です。
        <br />
        間違えて参加した場合は管理者にお知らせください。
      </Typography>
      {contentMarkup}
    </Paper>
  );
}

ContestField.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ContestField);
