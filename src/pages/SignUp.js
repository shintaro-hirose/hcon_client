import React, {useState} from 'react';
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
import { signupUser } from '../redux/actions/userActions';

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
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    position: 'relateve',
  },
  progress:{
    position: 'absolute',
  }
}));

function SignUp(props) {
  const classes = useStyles();
  const [form, setForm] = useState({
    handle:"",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const { UI:{loading, errors} } = props;

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name] : event.target.value
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.signupUser(form, props.history);
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登録
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="handle"
            label="ユーザID"
            id="handle"
            autoFocus
            helperText={errors.handle}
            error={errors.handle ? true : false}
            onChange={handleChange}
            value={form.handle}            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="displayName"
            label="表示名"
            id="displayName"
            helperText={errors.displayName}
            error={errors.displayName ? true : false}
            onChange={handleChange}
            value={form.displayName}            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
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
            label="パスワード"
            type="password"
            id="password"
            helperText={errors.password}
            error={errors.password ? true : false}
            onChange={handleChange}
            value={form.password}            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="パスワードの確認入力"
            type="password"
            id="confirmPassword"
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            onChange={handleChange}
            value={form.confirmPassword}            
          />
          
          {errors.general && (
              <Typography variant="body2">
                {errors.general}
              </Typography>
            )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            登録
            {loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
          </Button>
        </form>
      </div>
    </Container>
  );
}

SignUp.propTypes = {
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
  });
  
  const mapActionsToProps = {
    signupUser
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(SignUp);