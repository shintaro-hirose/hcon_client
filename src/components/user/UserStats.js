import React from "react";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import UserDnf from "./UserDnf";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: "10px 0",
    boxShadow: theme.shadows[5],
  },
}));

function UserStats(props) {
  const classes = useStyles();
  const userData = props.userData;
  const a = userData.totalAttempts;
  const b = userData.totalDnfs;
  return (
    <div>
      <Paper className={classes.paper}>
        <Box padding="0 10px" textAlign="center">
          {a === 0 ? (
            "まだデータがありません"
          ) : b === 0 ? (
            <div>
              <Typography variant="h5">
                成功率 = {(((a - b) * 100) / a).toFixed(1)}% ({a - b}/{a})
              </Typography>
            </div>
          ) : (
            <div>
              <Typography variant="h5">
                成功率 : {(((a - b) * 100) / a).toFixed(1)}% ({a - b}/{a})
              </Typography>
              <UserDnf userData={userData} />
            </div>
          )}
        </Box>
      </Paper>
    </div>
  );
}

export default UserStats;
