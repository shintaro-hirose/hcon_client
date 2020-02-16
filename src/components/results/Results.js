import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import ResultsSelecter from './ResultsSelecter'
import ResultTable from './ResultTable'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        padding: 0,
        backgroundColor: theme.palette.background.paper,
      },
    title: {
        padding:'10px 22px 0 22px',
      },
    listItem:{
          padding:0,
      },
}));


const Results = () => {
    const classes = useStyles();
    return(
        <div>
            <ResultsSelecter />
            
            <Typography variant="h6" component="span" justify="flex-start">の結果</Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" className={classes.title}>スクランブル</Typography>
                    <List className={classes.root}>
                        <ListItem className={classes.listItem}>
                            <ListItemText
                                primary="1. R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2"
                            />
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <ListItemText
                                primary="2. R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2"
                            />
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <ListItemText
                                primary="3. R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2"
                            />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ResultTable />

                </Grid>
            </Grid>
        </div>
    )
}

export default Results;