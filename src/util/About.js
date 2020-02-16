import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    paper: {
        width:"100%",
        padding: "10px 0",
        boxShadow: theme.shadows[5],
        textAlign: "center",
    
      },
      logo: {
          width: "180px",
          height: "180px",
          marginBottom: "10px",
      }
}));

export default function About() {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.paper}>
                <img 
                src="hcon-icon@2x.png"
                className={classes.logo}
                />
                <Box padding="10px">
                    <Typography variant="h5" color="secondary">
                        Hcon とは?
                    </Typography>
                    <Typography variant="body1">
                        3BLDをするすべての人のための大会プラットフォームです。<br />
                        毎日24：00に更新します。
                    </Typography>
                </Box>
            </Paper>
        </div>
    )
}
