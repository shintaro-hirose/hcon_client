import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import MyButton from '../../util/MyButton';
// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    float: 'right'
  },
}));

function EditDetails(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    twitter: props.authorizedUserSummary.twitter,
    belong: props.authorizedUserSummary.belong
  })


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name] : event.target.value
    });
  };

  const handleSubmit = () => {

    props.editUserDetails(form);
    handleClose();
  };
  return (
      <Fragment>
        <MyButton
          tip="プロフィールを編集する"
          onClick={handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>プロフィールを編集する</DialogTitle>
          <DialogContent>
            <form>
            <TextField
                name="belong"
                tpye="text"
                label="所属団体"
                placeholder=""
                className={classes.textField}
                value={form.belong}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="twitter"
                tpye="text"
                label="Twitter"
                placeholder="@"
                className={classes.textField}
                value={form.twitter}
                onChange={handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              キャンセル
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained">
              保存
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
  )
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    authorizedUserSummary: state.user.authorizedUserSummary
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(EditDetails);