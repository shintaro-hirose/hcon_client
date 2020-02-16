import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from  '@material-ui/core/Grid';
import Box from  '@material-ui/core/Box';
import UserBestTable from './UserBestTable';

const useStyles = makeStyles(theme => ({

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },
  table: {
  },
}));

export default function UserSummary(props) {
  const classes = useStyles();
  const userHandle = props.userHandle;
  return (
        <div className={classes.paper}>
            <Box>
                {userHandle}
            </Box>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Box>
                    {userHandle}
                    </Box>
                    <Box>
                        rating: bla
                    </Box>
                    <Box>
                        成功 / 試行 = bla / bla( 60 % )
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <UserBestTable />

                </Grid>
            </Grid>
        </div>
      
  );
}