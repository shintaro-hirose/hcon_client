import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    position: 'relative',
  },
  progress: {
    position: 'absolute'
  },
}));

function Settings(props) {
  const classes = useStyles();

  const [form, setForm] = useState({});

  const { UI:{loading, errors} } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginUser(form, props.history);
  };
  const handleChange = (event) => {
    setForm({
        ...form,
        [event.target.name]: event.target.value
    });
  };
 
  return (
    <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Settings
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={errors.email}
            error={errors.email ? true : false}
            onChange={handleChange}
            value={form.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={errors.password}
            error={errors.password ? true : false}
            onChange={handleChange}
            value={form.password}            
          />
          {errors.general && (
              <Typography variant="body2" color="error">
                {errors.general}
              </Typography>
            )}
          <Button
            type="submit"
            
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Save
            {loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
          </Button>
        </form>
    </Container>
  );
}

Settings.propTypes = {
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
  });
  
  const mapActionsToProps = {
    loginUser
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Settings);