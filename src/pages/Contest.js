import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {red} from '@material-ui/core/colors';

import { connect } from 'react-redux';
import { postContestResult } from '../redux/actions/userActions';

const useStyles = makeStyles(theme => ({
  root: {
  },
}));

const RedRadio = withStyles({
    
    checked: {color: red[600]},
})(props => <Radio color="default" {...props} />);

function Contest(props) {
  const classes = useStyles();
  const [form, setForm] = React.useState({
      contestId: props.match.params.contestId,
      firstInput:"",
      secondInput:"",
      thirdInput:"",
      firstStatus:"",
      secondStatus:"",
      thirdStatus:"",
      firstDnfReason:"",
      secondDnfReason:"",
      thirdDnfReason:""

  });

  const handleChange = event => {
    setForm({
        ...form,
        [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.postContestResult(form, props.history);
  };

  return (
    <React.Fragment>
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12}>
          <div>
              <TextField
              id="outlined-basic" 
              label="First" 
              variant="outlined"
              placeholder="-:--.--"
              name="firstInput"
              onChange={handleChange}
                />
              <FormControl component="fieldset">
                  <RadioGroup aria-label="condition" name="firstStatus" value={form.firstStatus} onChange={handleChange}>
                      <FormControlLabel value="success" control={<Radio color="primary"/>} label="OK" />
                      <FormControlLabel value="plusTwo" control={<Radio />} label="+2" />
                      <FormControlLabel value="DNF" control={<RedRadio />} label="DNF"/>
                  </RadioGroup>
              </FormControl>
              <TextField
              id="firstDnf"
              label="firstDNFReason"
              variant="outlined"
              name="firstDnfReason"
              onChange={handleChange}
              disabled={form.firstStatus === "DNF" ? false : true}
              />
          </div>
        </Grid>
        <Grid item sm={4} xs={12}>
          <div>
              <TextField
              id="outlined-basic" 
              label="Second" 
              variant="outlined"
              placeholder="-:--.--"
              name="secondInput"
              onChange={handleChange}
                />
              <FormControl component="fieldset">
                  <RadioGroup aria-label="condition" name="secondStatus" value={form.secondStatus} onChange={handleChange}>
                      <FormControlLabel value="success" control={<Radio color="primary"/>} label="OK" />
                      <FormControlLabel value="plusTwo" control={<Radio />} label="+2" />
                      <FormControlLabel value="DNF" control={<RedRadio />} label="DNF" />
                  </RadioGroup>
              </FormControl>
              <TextField
              id="secondDnf"
              label="secondDNFReason"
              variant="outlined"
              name="secondDnfReason"
              onChange={handleChange}
              disabled={form.secondStatus === "DNF" ? false : true}
              />
          </div>
        </Grid>
        <Grid item sm={4} xs={12}>
          <div>
              <TextField
              id="outlined-basic" 
              label="Third" 
              variant="outlined"
              placeholder="-:--.--"
              name="thirdInput"
              onChange={handleChange}
                />
              <FormControl component="fieldset">
                  <RadioGroup aria-label="condition" name="thirdStatus" value={form.thirdStatus} onChange={handleChange}>
                      <FormControlLabel value="success" control={<Radio color="primary"/>} label="OK" />
                      <FormControlLabel value="plusTwo" control={<Radio />} label="+2" />
                      <FormControlLabel value="DNF" control={<RedRadio />} label="DNF" />
                  </RadioGroup>
              </FormControl>
              <TextField
              id="thirdDnf"
              label="thirdDNFReason"
              variant="outlined"
              name="thirdDnfReason"
              onChange={handleChange}
              disabled={form.thirdStatus === "DNF" ? false : true}
              />
          </div>
        </Grid>    
      </Grid>
      </form>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Login
      </Button>
    </React.Fragment>
  );
}


Contest.propTypes = {
  postContestResult: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  postContestResult
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Contest);