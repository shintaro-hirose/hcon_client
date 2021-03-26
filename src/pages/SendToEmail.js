import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { sendToEmail } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    position: "relative",
  },
  progress: {
    position: "absolute",
  },
}));

function SendToEmail(props) {
  const classes = useStyles();

  const [email, setEmail] = useState("");

  const {
    UI: { loading, errors },
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    props.sendToEmail({ email });
  };
  const handleChange1 = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
            onChange={handleChange1}
            value={email}
          />
          {errors.general && (
            <Typography variant="body2" color="error">
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
            ログイン
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
}

SendToEmail.propTypes = {
  sendToEmail: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  sendToEmail,
};

export default connect(mapStateToProps, mapActionsToProps)(SendToEmail);
