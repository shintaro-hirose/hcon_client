import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import { closeSuccessbar } from '../redux/actions/uiActions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function SuccessBar(props) {
  const classes = useStyles();

  const open = props.UI.openSuccessbar;
  const message = props.UI.successbarMessage;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.closeSuccessbar();

  };

  return (
    <div className={classes.root}>
      <Snackbar 
      open={open} 
      autoHideDuration={2500} 
      onClose={handleClose}
      anchorOrigin={{vertical:'top', horizontal:'center'}}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
  });

const mapActionsToProps = { closeSuccessbar };

  
  SuccessBar.propTypes = {
    closeSuccessbar: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI : PropTypes.object.isRequired
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
      )((SuccessBar));