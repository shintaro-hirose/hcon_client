import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ResultsSelecter = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });

    const handleChange = name => event => {
        setState({
        ...state,
        [name]: event.target.value,
        });
    };


    return(
        <Box component="span">
            <FormControl className={classes.formControl}>
                <NativeSelect
                native
                value={state.age}
                onChange={handleChange('age')}
                inputProps={{
                    'aria-label': 'age'
                }}
                >
                <option value={10}>2019/10/01</option>
                <option value={20}>2019/10/02</option>
                <option value={30}>2019/10/03</option>
                </NativeSelect>
            </FormControl>
        </Box>
    )
}

export default ResultsSelecter;