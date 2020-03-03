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
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

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
  },
  formControl: {
    margin: theme.spacing(3),
  },
  box1 :{
    marginRight: "20px",
    color: "#1111cc",
    display:"inline",

  }
}));

function SignUp(props) {
  const classes = useStyles();
  const [contact, setContact] = useState({
    terms: false,
    privactPolicy: false
  });
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
  
  const handleCheck1 = () => {
    setContact({
      ...contact,
      terms: !contact.terms
    })
  }

  const handleCheck2 = () => {
    setContact({
      ...contact,
      privactPolicy: !contact.privactPolicy
    })
  }
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
            helperText={errors.handle ? errors.handle : "英数字6文字以上12文字以下(変更できません)"}
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
            helperText={errors.displayName ? errors.displayName : "16文字以下(全体に表示されます)"}
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
            <Box textAlign="center" marginTop="20px">
            <Typography component="div" textAlign="center">
              <a href="/terms" target="_blank" rel="noopener noreferrer" className={classes.box1}>
              利用規約
              </a>
              <a href="/privacyPolicy" target="_blank" rel="noopener noreferrer" className={classes.box1}>
              プライバシーポリシー
              </a>
            </Typography>
            </Box>
          <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup aria-label="position" >
            <FormControlLabel
              value="top"
              control={<Checkbox color="primary" onChange={handleCheck1}/>}
              label="利用規約に同意"
              labelPlacement="end"
            />
            <FormControlLabel
              value="start"
              control={<Checkbox color="primary" onChange={handleCheck2}/>}
              label="プライバシーポリシーに同意"
              labelPlacement="end"
            />
          </FormGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading || (!(contact.terms && contact.privactPolicy))}
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