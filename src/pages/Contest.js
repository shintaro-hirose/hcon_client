import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {red, yellow} from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';

import Loading from '../util/Loading';

import { connect } from 'react-redux';
import { postContestResult, getContest } from '../redux/actions/userActions';

const useStyles = makeStyles(theme => ({
  root: {
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    position: 'relative',
  },
  progress: {
    position: 'absolute'
  },
}));

const RedRadio = withStyles({
    
    checked: {color: red[600]},
})(props => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
    
  checked: {color: yellow[600]},
})(props => <Radio color="default" {...props} />);

function Contest(props) {
  const classes = useStyles();
  const [form, setForm] = useState({
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

  useEffect(() => {
    props.getContest();
  },[]);

  const loading = props.user.loading; 
  const errors = props.UI.errors;
  const uiLoading = props.UI.uiLoading;

  const handleChange = event => {
    setForm({
        ...form,
        [event.target.name]: event.target.value,
        contestId: props.user.contest.contestId
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.postContestResult(form, props.history);
  };

  let contestmarkup = !loading ? (
    <React.Fragment>
      <Box>{props.user.contest.contestId}</Box>
      <Typography>scramble1: {props.user.contest.scrambles.first}</Typography>
      <Typography>scramble2: {props.user.contest.scrambles.second}</Typography>
      <Typography>scramble3: {props.user.contest.scrambles.third}</Typography>
    </React.Fragment>
  ) : (
    <Loading />
  );
  return (
    <React.Fragment>
      {contestmarkup}
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
                      <FormControlLabel value="plusTwo" control={<YellowRadio />} label="+2" />
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
                      <FormControlLabel value="plusTwo" control={<YellowRadio />} label="+2" />
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
                      <FormControlLabel value="plusTwo" control={<YellowRadio />} label="+2" />
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
      {errors.error && (
              <Typography variant="body2" color="error">
                {errors.error}
              </Typography>
            )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={uiLoading}
      >
        結果を送信
        {uiLoading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
      </Button>
      </form>
    </React.Fragment>
  );
}


Contest.propTypes = {
  postContestResult: PropTypes.func.isRequired,
  getContest: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  postContestResult,
  getContest
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Contest);