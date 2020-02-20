import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';

import { connect } from 'react-redux';
import { getUserCredential} from '../redux/actions/userActions';

const useStyles = makeStyles(theme => ({
  paper: {
    width:"100%",
    boxShadow: theme.shadows[5],

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '96%', // Fix IE 11 issue.
    margin: theme.spacing(1),
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
  const [active, setActive] = useState(1);
  const [form, setForm] = useState({
    userId: props.user.authorizedUserCredential.userHandle,
    email: props.user.authorizedUserCredential.email,
    password: "",
    confirmPassword:""
  })
  
  useEffect(() => {
    props.getUserCredential();
  }, [])
  const { UI:{loading, errors} } = props;

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name] : event.target.value
    })
  };
  const handleActiveChange1 = () => {
    setActive(1);
  };
  const handleActiveChange2 = () => {
    setActive(2);
  };
  const handleActiveChange3 = () => {
    setActive(3);
  };
  const handleSubmit1 = (event) => {
    event.preventDefault();

  };
  const handleSubmit2 = (event) => {
    event.preventDefault();
  };
  const handleSubmit3 = (event) => {
    event.preventDefault();
  };
 
  return (
    <React.Fragment>
        <Grid container spacing={2}>
          <Grid item sm={4} xs={12}>
          <Paper className={classes.paper}>
            <List component="nav" aria-label="setting selector">
                <ListItem button onClick={handleActiveChange1} selected={active === 1}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="ユーザ名" />
                </ListItem>
                <ListItem button onClick={handleActiveChange2} selected={active === 2}>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="メールアドレス" />
                </ListItem>
                <ListItem button onClick={handleActiveChange3} selected={active === 3}>
                    <ListItemIcon>
                        <LockIcon />
                    </ListItemIcon>
                    <ListItemText primary="パスワード" />
                </ListItem>
            </List>
          </Paper>
          </Grid>
          <Grid item sm={8} xs={12}>
            {active===1 ? (
              //userIdの変更
              <Paper className={classes.paper}>
            <Box padding="20px">
              <Typography variant="h5">ユーザ名の変更</Typography>
            </Box>                <form className={classes.form} noValidate onSubmit={handleSubmit1}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userId"
            label="ユーザ名"
            name="userId"
            autoFocus
            helperText={errors.userId}
            error={errors.userId ? true : false}
            onChange={handleChange}
            value={form.userId}
          />
          <Button
            type="submit"
            
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            更新する
            {loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
          </Button>
        </form>

              </Paper>
            ) : (
              active === 2 ? (
                <Paper className={classes.paper}>
<Box padding="20px">
              <Typography variant="h5">メールアドレスの変更</Typography>
            </Box>                <form className={classes.form} noValidate onSubmit={handleSubmit2}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={errors.email}
            error={errors.email ? true : false}
            onChange={handleChange}
            value={form.email}
          />
          <Button
            type="submit"
            
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            更新する
            {loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
          </Button>
        </form>

              </Paper>
              ) : (
<Paper className={classes.paper}>
            <Box padding="20px">
              <Typography variant="h5">パスワードの変更</Typography>
            </Box>
                <form className={classes.form} noValidate onSubmit={handleSubmit3}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="新しいパスワード"
            type="password"
            id="password"
            autoComplete="current-password"
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
            label="新しいパスワードの確認入力"
            type="password"
            id="confirmPassword"
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            onChange={handleChange}
            value={form.confirmPassword}            
          />
          <Button
            type="submit"
            
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            更新する
            {loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
          </Button>
        </form>

              </Paper>
              )

            )}
          
          </Grid>
        </Grid>
    </React.Fragment>
  );
}

Settings.propTypes = {
  getUserCredential: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
  });
  
  const mapActionsToProps = {
    getUserCredential,
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Settings);