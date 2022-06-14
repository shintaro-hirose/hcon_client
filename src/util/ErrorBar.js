import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { closeErrorbar } from "../redux/actions/uiActions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function ErrorBar(props) {
  const classes = useStyles();

  const open = props.UI.openErrorbar;
  const message = props.UI.errorbarMessage;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.closeErrorbar();
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = { closeErrorbar };

ErrorBar.propTypes = {
  closeErrorbar: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(ErrorBar);
