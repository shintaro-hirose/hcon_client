import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// Redux stuff
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Icons

function LogoutModal(props) {
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleLogout = () => {
    props.logoutUser();
    handleClose();
  };

  return (
    <Fragment>
      <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>ログアウトしますか？</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button
            onClick={handleLogout}
            color="primary"
            variant="contained"
            component={Link}
            to="/"
          >
            ログアウト
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

LogoutModal.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { logoutUser })(LogoutModal);
