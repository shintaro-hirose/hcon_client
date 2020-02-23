import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';

import moment from 'moment';
import 'moment/locale/ja';

const useStyles = makeStyles(theme => ({
    paper: {
        width:"100%",
        padding: "10px 0",
        marginTop: "20px",
        boxShadow: theme.shadows[5],
      }
}));


function Notifications(props) {
    const classes = useStyles();
    const notifications = props.notifications;

    return (
        <Paper className={classes.paper}>
            <Box paddingLeft="20px">
            <Typography variant="h6" >最近のアクティビティ</Typography>
            </Box>
            <List component="nav">
                { notifications && notifications.map((item,index) => {
                    return (
                        <div key={index}>
                        <Divider />
                        <Tooltip title="ユーザーのページに行く" placement="left">
                        <ListItem button component={Link} to={`/user/${item.userHandle}`}> 
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={item.imageUrl}/>
                            </ListItemAvatar>
                            <ListItemText primary={`${item.displayName}さんが今日のコンテストに参加しました`} secondary={moment(item.createdAt).fromNow()}/>
                        </ListItem>
                        </Tooltip>
                        </div>
                    )
                }) 
                }
            </List>
        </Paper>
    )
}

export default Notifications;