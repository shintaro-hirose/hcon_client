import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {red, yellow} from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Loading from '../util/Loading';

import { connect } from 'react-redux';
import { postContestResult, getContest } from '../redux/actions/userActions';

const useStyles = makeStyles(theme => ({
  root: {
  },
  submit: {
    position: 'relative',
  },
  progress: {
    position: 'absolute'
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  stepper: {
    backgroundColor: 'rgb(245, 245, 245)',
  },
  scramble: {
    margin: "50px 0",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getSteps() {
  return ['1試技目', '2試技目', '3試技目', '確認画面'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
}

const RedRadio = withStyles({
    
    checked: {color: red[600]},
})(props => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
    
  checked: {color: yellow[600]},
})(props => <Radio color="default" {...props} />);

function Contest(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

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
  const contestId = props.user.contest.contestId;

  const handleChange = event => {
    setForm({
        ...form,
        [event.target.name]: event.target.value,
        contestId: contestId
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.postContestResult(form, props.history);
  };

  const handleOpen = (event) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dnfCorrespond = {
    observationMiss: "分析ミス",
    memoSlip: "記憶が飛んだ",
    edgeExeMiss: "エッジの実行ミス",
    cornerExeMiss: "コーナーの実行ミス",
    recallMiss: "違うレターペアの想起"
  }
  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Typography  variant="h4">{contestId.substr(0,4)}/{contestId.substr(4,2)}/{contestId.substr(6,2)} のコンテスト</Typography> 
      )}
      <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
      <div>
        {activeStep === 0 ? (
          <div>
            <Typography variant="h5" align="center" className={classes.scramble}>
              1st: {props.user.contest.scrambles.first}
            </Typography>
            <Box display="block" textAlign="center">
              <TextField
              id="outlined-basic" 
              label="タイムを入力" 
              variant="outlined"
              placeholder="-:--.--"
              name="firstInput"
              onChange={handleChange}
              disabled={form.firstStatus === "DNF" ? true: false}
                />
            </Box>
            <Box margin="10px 0" textAlign="center">
              <Typography variant="body2">※小数点以下2桁での入力をお願いします</Typography>
            </Box>
            <Box display="block" textAlign="center" margin="20px 0">
              <FormControl component="fieldset">
                  <RadioGroup aria-label="condition" name="firstStatus" value={form.firstStatus} onChange={handleChange} row>
                      <FormControlLabel value="success" control={<Radio color="primary" />} label="OK" />
                      <FormControlLabel value="plusTwo" control={<YellowRadio />} label="+2" />
                      <FormControlLabel value="DNF" control={<RedRadio onClick={handleOpen}/>} label={form.firstDnfReason === "" ? ("DNF"): (`DNF(${dnfCorrespond[form.firstDnfReason]})`)}/>
                  </RadioGroup>
              </FormControl>
            </Box>
          <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Box marginBottom="10px">
            <Typography variant="h4">DNFの理由</Typography>
            <Typography variant="body1">※一番近いものを選んでください</Typography>

            </Box>
            <RadioGroup aria-label="dnfReason" name="firstDnfReason" value={form.firstDnfReason} onChange={handleChange} >
              <FormControlLabel value="observationMiss" control={<Radio color="primary" />} label="分析ミス" />
              <FormControlLabel value="memoSlip" control={<Radio color="primary" />} label="記憶が飛んだ" />
              <FormControlLabel value="edgeExeMiss" control={<Radio color="primary" />} label="エッジの実行ミス" />
              <FormControlLabel value="cornerExeMiss" control={<Radio color="primary" />} label="コーナーの実行ミス" />
              <FormControlLabel value="recallMiss" control={<Radio color="primary" />} label="違うレターペアの想起" />
            </RadioGroup>
            <Box textAlign="right" marginTop="10px">
            <Button variant="contained" color="primary" onClick={handleClose}>
              確定
            </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
          <Box textAlign="center">
            <Button variant="contained" color="primary" onClick={handleNext}>
                次へ
              </Button>
              </Box>
      </div>
        ): ( activeStep === 1 ? (
          <div>
            <Typography variant="h5" align="center" className={classes.scramble}>
              2nd: {props.user.contest.scrambles.second}
            </Typography>
            <Box display="block" textAlign="center">
              <TextField
              id="outlined-basic" 
              label="タイムを入力" 
              variant="outlined"
              placeholder="-:--.--"
              name="secondInput"
              onChange={handleChange}
              disabled={form.secondStatus === "DNF" ? true: false}
                />
            </Box>
            <Box margin="10px 0" textAlign="center">
              <Typography variant="body2">※小数点以下2桁での入力をお願いします</Typography>
            </Box>
            <Box display="block" textAlign="center" margin="20px 0">
              <FormControl component="fieldset">
                  <RadioGroup aria-label="condition" name="secondStatus" value={form.secondStatus} onChange={handleChange} row>
                      <FormControlLabel value="success" control={<Radio color="primary" />} label="OK" />
                      <FormControlLabel value="plusTwo" control={<YellowRadio />} label="+2" />
                      <FormControlLabel value="DNF" control={<RedRadio onClick={handleOpen}/>} label={form.secondDnfReason === "" ? ("DNF"): (`DNF(${dnfCorrespond[form.secondDnfReason]})`)}/>
                  </RadioGroup>
              </FormControl>
            </Box>
          <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Box marginBottom="10px">
            <Typography variant="h4">DNFの理由</Typography>
            <Typography variant="body1">※一番近いものを選んでください</Typography>

            </Box>
            <RadioGroup aria-label="dnfReason" name="secondDnfReason" value={form.secondDnfReason} onChange={handleChange} >
              <FormControlLabel value="observationMiss" control={<Radio color="primary" />} label="分析ミス" />
              <FormControlLabel value="memoSlip" control={<Radio color="primary" />} label="記憶が飛んだ" />
              <FormControlLabel value="edgeExeMiss" control={<Radio color="primary" />} label="エッジの実行ミス" />
              <FormControlLabel value="cornerExeMiss" control={<Radio color="primary" />} label="コーナーの実行ミス" />
              <FormControlLabel value="recallMiss" control={<Radio color="primary" />} label="違うレターペアの想起" />
            </RadioGroup>
            <Box textAlign="right" marginTop="10px">
            <Button variant="contained" color="primary" onClick={handleClose}>
              確定
            </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
          <Box textAlign="center">
          <Button
                onClick={handleBack}
                className={classes.backButton}
                variant="contained"
              >
                戻る
              </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
                次へ
              </Button>
              </Box>
      </div>
        ): (
          activeStep === 2 ? (
            <div>
            <Typography variant="h5" align="center" className={classes.scramble}>
              3rd: {props.user.contest.scrambles.third}
            </Typography>
            <Box display="block" textAlign="center">
              <TextField
              id="outlined-basic" 
              label="タイムを入力" 
              variant="outlined"
              placeholder="-:--.--"
              name="thirdInput"
              onChange={handleChange}
              disabled={form.thirdStatus === "DNF" ? true: false}
                />
            </Box>
            <Box margin="10px 0" textAlign="center">
              <Typography variant="body2">※小数点以下2桁での入力をお願いします</Typography>
            </Box>
            <Box display="block" textAlign="center" margin="20px 0">
              <FormControl component="fieldset">
                  <RadioGroup aria-label="condition" name="thirdStatus" value={form.thirdStatus} onChange={handleChange} row>
                      <FormControlLabel value="success" control={<Radio color="primary" />} label="OK" />
                      <FormControlLabel value="plusTwo" control={<YellowRadio />} label="+2" />
                      <FormControlLabel value="DNF" control={<RedRadio onClick={handleOpen}/>} label={form.thirdDnfReason === "" ? ("DNF"): (`DNF(${dnfCorrespond[form.thirdDnfReason]})`)}/>
                  </RadioGroup>
              </FormControl>
            </Box>
          <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Box marginBottom="10px">
            <Typography variant="h4">DNFの理由</Typography>
            <Typography variant="body1">※一番近いものを選んでください</Typography>

            </Box>
            <RadioGroup aria-label="dnfReason" name="thirdDnfReason" value={form.thirdDnfReason} onChange={handleChange} >
              <FormControlLabel value="observationMiss" control={<Radio color="primary" />} label="分析ミス" />
              <FormControlLabel value="memoSlip" control={<Radio color="primary" />} label="記憶が飛んだ" />
              <FormControlLabel value="edgeExeMiss" control={<Radio color="primary" />} label="エッジの実行ミス" />
              <FormControlLabel value="cornerExeMiss" control={<Radio color="primary" />} label="コーナーの実行ミス" />
              <FormControlLabel value="recallMiss" control={<Radio color="primary" />} label="違うレターペアの想起" />
            </RadioGroup>
            <Box textAlign="right" marginTop="10px">
            <Button variant="contained" color="primary" onClick={handleClose}>
              確定
            </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
          <Box textAlign="center">
          <Button
                onClick={handleBack}
                className={classes.backButton}
                variant="contained"
              >
                戻る
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                確認画面へ進む
              </Button>
              </Box>
      </div>
          ) : (
            <div>
            <Typography variant="h5" align="center">
              今回の結果
            </Typography>
                <Box textAlign="center" marginTop="20px">
                  <Typography variant="h5">{
                    form.firstStatus === "DNF" ? (
                      `1試技目: DNF(${dnfCorrespond[form.firstDnfReason]})`
                    ) : (
                      form.firstStatus === "plusTwo" ? (
                        `1試技目: ${String(form.firstInput)} + 2`
                      ) : (
                        `1試技目: ${form.firstInput}`
                      )
                    )
                  }</Typography>
                </Box>
                <Box textAlign="center" marginTop="20px">
                  <Typography variant="h5">{
                    form.secondStatus === "DNF" ? (
                      `2試技目: DNF(${dnfCorrespond[form.secondDnfReason]})`
                    ) : (
                      form.secondStatus === "plusTwo" ? (
                        `2試技目: ${String(form.secondInput)} + 2`
                      ) : (
                        `2試技目: ${form.secondInput}`
                      )
                    )
                  }</Typography>
                </Box>
                <Box textAlign="center" marginTop="20px">
                  <Typography variant="h5">{
                    form.thirdStatus === "DNF" ? (
                      `3試技目: DNF(${dnfCorrespond[form.thirdDnfReason]})`
                    ) : (
                      form.thirdStatus === "plusTwo" ? (
                        `3試技目: ${String(form.thirdInput)} + 2`
                      ) : (
                        `3試技目: ${form.thirdInput}`
                      )
                    )
                  }</Typography>
                </Box>
          <Box textAlign="center" marginBottom="10px">
          <Button
                onClick={handleBack}
                variant="contained"
              >
                戻って修正する
              </Button>
              </Box>
              <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={uiLoading}
              >
                結果を送信する
                {uiLoading && (
                        <CircularProgress size={30} className={classes.progress}/>
                      )}
              </Button>
              </Box>
      </div>
          )
        ) )}
      </div>
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