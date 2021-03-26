import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    boxShadow: theme.shadows[5],
  },
}));

function SettingSelector() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <List component="nav" aria-label="setting selector">
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="ユーザー名" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="メールアドレス" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary="パスワード" />
          </ListItem>
        </List>
      </Paper>
    </React.Fragment>
  );
}

export default SettingSelector;
