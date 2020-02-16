import React from 'react';
import { TextField, Typography, Box, List, ListItem, ListItemText } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200,
        },
      },
    list: {
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


const Contest = (props) => {
    const classes = useStyles();
    console.log(props);
    const params = props.match.params;
    const [date, id] = [params.date , params.id];
    const [time, setTime] = React.useState('');
    const handleChange = event => {
        setTime(event.target.value);
    };
    return(
        <div>
            <Box>
                20{date.substr(0,2)}/{date.substr(2,2)}/{date.substr(4,2)} {id}
            </Box>
            <Typography variant="h6" className={classes.title}>スクランブル</Typography>
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <ListItemText
                        primary="1. R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2"
                    />
                </ListItem>
                
            </List>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-name" label="time" value={time} onChange={handleChange} />
            </form>
        </div>
    )
}

export default Contest;