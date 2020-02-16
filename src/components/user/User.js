import React from 'react';
import UserChart from './UserChart';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import UserBestTable from './UserBestTable';


const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 240,

      },
}));


export default function User() {
    
  const classes = useStyles();

  return (
    <div>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Box component="span">
                    MASSAN
                </Box>
                <Box component="span">
                    Shihan
                </Box>
                <Box>
                    rating 8901
                </Box>
                <Box>
                    成功 / 試行 = 60 / 100 ( 60 % )
                </Box>
                <Paper className={classes.paper}>
                    <UserChart />
                </Paper>

            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <UserBestTable />

                    </Grid>
                    <Grid item xs={6}>
                        <UserBestTable />
                    
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
    </div>
  );
}