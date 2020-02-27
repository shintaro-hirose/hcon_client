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
import CircularProgress from '@material-ui/core/CircularProgress'
// Icons
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    float: 'right',
  },
  submit:{
    position: 'relative'
  },
  progress: {
    position: 'absolute'
  },
}));

function EditDetails(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    twitter: props.authorizedUserSummary.twitter,
    belong: props.authorizedUserSummary.belong
  })

  const uiLoading = props.UI.loading;
  const errors = props.UI.errors;

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
                helperText={errors.twitter}
                error={errors.twitter ? true : false}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              キャンセル
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained"
            className={classes.submit}
            disabled={uiLoading}
            >
              保存
            </Button>
            {uiLoading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
          </DialogActions>
        </Dialog>
      </Fragment>
  )
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  authorizedUserSummary: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    authorizedUserSummary: state.user.authorizedUserSummary,
    UI: state.UI

});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(EditDetails);