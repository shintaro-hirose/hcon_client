import React from 'react'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        width:"100%",
        padding: "10px 0",
        boxShadow: theme.shadows[5],
    
      },
}));

function UserStats() {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.paper}>
                <Typography variant="h5">
                    Stats
                </Typography>
                <Typography variant="body1">
                    成功率 = 70% (35/70)
                </Typography>
            </Paper>
        </div>
    )
}

export default UserStats;