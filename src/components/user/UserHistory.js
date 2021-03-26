import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";

import moment from "moment";
import "moment/locale/ja";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: "10px 0",
    marginTop: "20px",
    boxShadow: theme.shadows[5],
  },
  nested1: {
    textAlign: "center",
  },
  nested2: {
    textAlign: "center",
  },
}));

function UserHistory(props) {
  const classes = useStyles();
  const results = props.userData.results;
  if (results && results !== 0) {
    results.sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1;
      if (a.createdAt < b.createdAt) return 1;
      return 0;
    });
  }

  const dnfCorrespond = {
    observationMiss: "分析ミス",
    memoSlip: "記憶飛び",
    edgeExeMiss: "エッジの実行ミス",
    cornerExeMiss: "コーナーの実行ミス",
    recallMiss: "違うレターペアの想起",
  };

  const timeFormatter = (time, dnfReason) => {
    if (time === 3600) {
      if (dnfReason === "") {
        return "DNF";
      } else {
        return `DNF(${dnfCorrespond[dnfReason]})`;
      }
    } else if (time >= 60) {
      return `${Math.floor(time / 60)}:${(
        "0" + String((time - 60 * Math.floor(time / 60)).toFixed(2))
      ).substr(-5)}`;
    } else {
      return time.toFixed(2);
    }
  };

  return (
    <Paper className={classes.paper}>
      <Box paddingLeft="20px">
        <Typography variant="body1">コンテスト参加履歴</Typography>
      </Box>
      <List component="nav">
        {!results || results.length === 0 ? (
          <div>
            <Divider />
            <ListItem>
              <ListItemText primary="まだデータがありません" align="center" />
            </ListItem>
          </div>
        ) : (
          results.map((item, index) => {
            let firstTime = "-";
            let secondTime = "-";
            let thirdTime = "-";
            let bestTime = "-";
            if (
              item.firstTime &&
              (item.firstDnfReason || item.firstDnfReason === "")
            ) {
              firstTime = timeFormatter(item.firstTime, item.firstDnfReason);
            }
            if (
              item.secondTime &&
              (item.secondDnfReason || item.secondDnfReason === "")
            ) {
              secondTime = timeFormatter(item.secondTime, item.secondDnfReason);
            }
            if (
              item.thirdTime &&
              (item.thirdDnfReason || item.thirdDnfReason === "")
            ) {
              thirdTime = timeFormatter(item.thirdTime, item.thirdDnfReason);
            }
            if (item.bestTime) {
              bestTime = timeFormatter(item.bestTime, "");
            }

            return (
              <div key={index}>
                <Divider />
                <Tooltip title="コンテストのページに行く" placement="left">
                  <ListItem
                    button
                    component={Link}
                    to={`/result/${item.contestId}`}
                  >
                    <ListItemText
                      primary={moment(item.createdAt).format("LLLL")}
                    />
                  </ListItem>
                </Tooltip>
                <ListItem className={classes.nested1}>
                  <ListItemText primary={`単発ベスト ${bestTime}`} />
                </ListItem>
                <ListItem className={classes.nested2}>
                  <ListItemText
                    secondary={`${firstTime}　　　${secondTime}　　　${thirdTime}`}
                  />
                </ListItem>
              </div>
            );
          })
        )}
      </List>
    </Paper>
  );
}

export default UserHistory;
