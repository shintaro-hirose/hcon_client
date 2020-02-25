import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    paper: {
        width:"100%",
        padding: "10px 0",
        marginTop: "20px",
        boxShadow: theme.shadows[5],
      }
}));


function Updates() {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Box paddingLeft="20px">
            <Typography variant="h6" >β版 修正</Typography>
            </Box>
            <List component="nav">
                <Divider />
                    <ListItem > 
                        <ListItemText primary="結果画面の日付選択範囲を制限しました" secondary="2020-2-25 20:30"/>
                    </ListItem>
                <Divider />
                <ListItem > 
                    <ListItemText primary="タイマー機能を追加しました（スマホ未対応）" secondary="2020-2-25 8:54"/>
                </ListItem>
                
            </List>
        </Paper>
    )
}

export default Updates;