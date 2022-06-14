import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import prizeAvatar from "../images/icons8-prize-64.png";

import moment from "moment";
import "moment/locale/ja";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: "10px 0",
    marginTop: "20px",
    boxShadow: theme.shadows[5],
  },
}));

function Notifications(props) {
  const classes = useStyles();
  const notifications = props.notifications;
  const timeFormatter = (time) => {
    if (time >= 60) {
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
        <Typography variant="h6">最近のアクティビティ</Typography>
      </Box>
      <List component="nav">
        {notifications &&
          notifications.map((item, index) => {
            return (
              <div key={index}>
                {item.participantSituation ? (
                  item.participantSituation === "noUser" ? (
                    <div>
                      <Divider />
                      <Tooltip
                        title="コンテストのページに行く"
                        placement="left"
                      >
                        <ListItem
                          button
                          component={Link}
                          to={`/result/${item.contestId}`}
                        >
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={prizeAvatar} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${item.contestId.substr(
                              0,
                              4
                            )}/${item.contestId.substr(
                              4,
                              2
                            )}/${item.contestId.substr(
                              6,
                              2
                            )}のコンテストが終了しました。今回の参加者はいませんでした。`}
                            secondary={moment(item.createdAt).fromNow()}
                          />
                        </ListItem>
                      </Tooltip>
                    </div>
                  ) : item.bestTime === 3600 ? (
                    <div>
                      <Divider />
                      <Tooltip
                        title="コンテストのページに行く"
                        placement="left"
                      >
                        <ListItem
                          button
                          component={Link}
                          to={`/result/${item.contestId}`}
                        >
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={prizeAvatar} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${item.contestId.substr(
                              0,
                              4
                            )}/${item.contestId.substr(
                              4,
                              2
                            )}/${item.contestId.substr(
                              6,
                              2
                            )}のコンテストが終了しました。今回の優勝者はいませんでした。`}
                            secondary={moment(item.createdAt).fromNow()}
                          />
                        </ListItem>
                      </Tooltip>
                    </div>
                  ) : (
                    <div>
                      <Divider />
                      <Tooltip
                        title="コンテストのページに行く"
                        placement="left"
                      >
                        <ListItem
                          button
                          component={Link}
                          to={`/result/${item.contestId}`}
                        >
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={prizeAvatar} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${item.contestId.substr(
                              0,
                              4
                            )}/${item.contestId.substr(
                              4,
                              2
                            )}/${item.contestId.substr(
                              6,
                              2
                            )}のコンテストが終了しました。単発 ${timeFormatter(
                              item.bestTime
                            )} で ${item.displayName} さんが優勝しました。
                            `}
                            secondary={moment(item.createdAt).fromNow()}
                          />
                        </ListItem>
                      </Tooltip>
                    </div>
                  )
                ) : item.exibitionId ? (
                  <div>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={item.imageUrl} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${item.displayName}さんが春風杯2020の${item.roundId}に参加しました`}
                        secondary={moment(item.createdAt).fromNow()}
                      />
                    </ListItem>
                  </div>
                ) : (
                  <div>
                    <Divider />
                    <Tooltip title="ユーザーのページに行く" placement="left">
                      <ListItem
                        button
                        component={Link}
                        to={`/user/${item.userHandle}`}
                      >
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src={item.imageUrl} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${item.displayName}さんがコンテストに参加しました`}
                          secondary={moment(item.createdAt).fromNow()}
                        />
                      </ListItem>
                    </Tooltip>
                  </div>
                )}
              </div>
            );
          })}
      </List>
    </Paper>
  );
}

export default Notifications;
