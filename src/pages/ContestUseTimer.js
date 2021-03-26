import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { red, yellow } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Timer from "../components/contest/Timer";
import TimerForPhone from "../components/contest/TimerForPhone";

import Loading from "../util/Loading";

import { connect } from "react-redux";
import { postContestResult, getContest } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {},
  submit: {
    position: "relative",
  },
  progress: {
    position: "absolute",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  stepper: {
    backgroundColor: "rgb(245, 245, 245)",
  },
  scramble: {
    margin: "25px 0",
  },
  pastScramble: {
    marginTop: "25px",
    color: "#bdbdbd",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  resultPaper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    minHeight: "146px",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const RedRadio = withStyles({
  checked: { color: red[600] },
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
  checked: { color: yellow[600] },
})((props) => <Radio color="default" {...props} />);

function ContestUseTimer(props) {
  const now = new Date();
  let year = String(now.getFullYear());
  let month = String(now.getMonth() + 1);
  let date = String(now.getDate());
  month = ("0" + month).slice(-2);
  date = ("0" + date).slice(-2);
  const conId = year + month + date;

  if (props.user.authorizedUserSummary.lastPostedDate) {
    if (conId === props.user.authorizedUserSummary.lastPostedDate) {
      window.location.href = "/";
    }
  }

  const classes = useStyles();
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const [form, setForm] = useState({
    firstStatus: "",
    secondStatus: "",
    thirdStatus: "",
    firstDnfReason: "",
    secondDnfReason: "",
    thirdDnfReason: "",
  });
  const [situation, setSituationPar] = useState(0);
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [thirdInput, setThirdInput] = useState("");

  function f() {
    props.getContest();
  }
  useEffect(() => {
    f();
  }, []);

  const loading = props.user.loading;
  const errors = props.UI.errors;
  const uiLoading = props.UI.loading;
  const contestId = props.user.contest.contestId;
  const imageUrl = props.user.authorizedUserSummary.imageUrl;
  const displayName = props.user.authorizedUserSummary.displayName;

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.postContestResult(
      {
        ...form,
        firstInput,
        secondInput,
        thirdInput,
        contestId,
        imageUrl,
        displayName,
      },
      props.history
    );
  };

  const handleOpen1 = (event) => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen2 = (event) => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen3 = (event) => {
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };

  const dnfCorrespond = {
    observationMiss: "(分析ミス)",
    memoSlip: "(記憶が飛んだ)",
    edgeExeMiss: "(エッジの実行ミス)",
    cornerExeMiss: "(コーナーの実行ミス)",
    recallMiss: "(違うレターペアの想起)",
  };

  function isMobile() {
    var regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return window.navigator.userAgent.search(regexp) !== -1;
  }
  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Typography variant="h4" align="center">
          {contestId.substr(0, 4)}/{contestId.substr(4, 2)}/
          {contestId.substr(6, 2)} のコンテスト
        </Typography>
      )}
      {situation === 0 ? (
        <Typography variant="h5" align="center" className={classes.scramble}>
          1st: {props.user.contest.scrambles.first}
        </Typography>
      ) : situation === 1 ? (
        <div>
          <Typography
            variant="h5"
            align="center"
            className={classes.pastScramble}
          >
            1st: {props.user.contest.scrambles.first}
          </Typography>
          <Typography variant="h5" align="center" className={classes.scramble}>
            2nd: {props.user.contest.scrambles.second}
          </Typography>
        </div>
      ) : situation === 2 ? (
        <div>
          <Typography
            variant="h5"
            align="center"
            className={classes.pastScramble}
          >
            1st: {props.user.contest.scrambles.first}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            className={classes.pastScramble}
          >
            2nd: {props.user.contest.scrambles.second}
          </Typography>
          <Typography variant="h5" align="center" className={classes.scramble}>
            3rd: {props.user.contest.scrambles.third}
          </Typography>
        </div>
      ) : (
        <div>
          <Typography
            variant="h5"
            align="center"
            className={classes.pastScramble}
          >
            1st: {props.user.contest.scrambles.first}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            className={classes.pastScramble}
          >
            2nd: {props.user.contest.scrambles.second}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            className={classes.pastScramble}
          >
            3rd: {props.user.contest.scrambles.third}
          </Typography>
          <Typography variant="h5" align="center" className={classes.scramble}>
            おつかれさまでした！
          </Typography>
        </div>
      )}
      {situation !== 3 ? (
        <Timer
          setFirstInput={setFirstInput}
          setSecondInput={setSecondInput}
          setThirdInput={setThirdInput}
          setSituationPar={setSituationPar}
        />
      ) : (
        <p></p>
      )}

      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item sm={4} xs={12}>
            <Paper className={classes.resultPaper}>
              <Box paddingTop="20px" textAlign="center">
                {firstInput === "" ? (
                  <Typography variant="h4">-:--.--</Typography>
                ) : form.firstStatus === "DNF" ? (
                  <div>
                    <Typography variant="h6">DNF</Typography>
                    <Typography variant="h6">
                      {dnfCorrespond[form.firstDnfReason]}
                    </Typography>
                  </div>
                ) : form.firstStatus === "plusTwo" ? (
                  <Typography variant="h4">{String(firstInput)} + 2</Typography>
                ) : (
                  <Typography variant="h4">{firstInput}</Typography>
                )}
              </Box>
              <Box display="block" textAlign="center" margin="20px 0 0 0">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="condition"
                    name="firstStatus"
                    value={form.firstStatus}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value="success"
                      control={<Radio color="primary" />}
                      label="OK"
                    />
                    <FormControlLabel
                      value="plusTwo"
                      control={<YellowRadio />}
                      label="+2"
                    />
                    <FormControlLabel
                      value="DNF"
                      control={<RedRadio onClick={handleOpen1} />}
                      label="DNF"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Modal
                aria-labelledby="modal-title-1"
                aria-describedby="modal-description-2"
                className={classes.modal}
                open={open1}
                onClose={handleClose1}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open1}>
                  <div className={classes.paper}>
                    <Box marginBottom="10px">
                      <Typography variant="h4" id="modal-title-1">
                        DNFの理由
                      </Typography>
                      <Typography variant="body1" id="modal-description-2">
                        ※一番近いものを選んでください
                      </Typography>
                    </Box>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="dnfReason1"
                        name="firstDnfReason"
                        value={form.firstDnfReason}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="observationMiss"
                          control={<Radio color="primary" />}
                          label="分析ミス"
                        />
                        <FormControlLabel
                          value="memoSlip"
                          control={<Radio color="primary" />}
                          label="記憶が飛んだ"
                        />
                        <FormControlLabel
                          value="edgeExeMiss"
                          control={<Radio color="primary" />}
                          label="エッジの実行ミス"
                        />
                        <FormControlLabel
                          value="cornerExeMiss"
                          control={<Radio color="primary" />}
                          label="コーナーの実行ミス"
                        />
                        <FormControlLabel
                          value="recallMiss"
                          control={<Radio color="primary" />}
                          label="違うレターペアの想起"
                        />
                      </RadioGroup>
                    </FormControl>
                    <Box textAlign="right" marginTop="10px">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose1}
                      >
                        確定
                      </Button>
                    </Box>
                  </div>
                </Fade>
              </Modal>
            </Paper>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Paper className={classes.resultPaper}>
              <Box paddingTop="20px" textAlign="center">
                {secondInput === "" ? (
                  <Typography variant="h4">-:--.--</Typography>
                ) : form.secondStatus === "DNF" ? (
                  <div>
                    <Typography variant="h6">DNF</Typography>
                    <Typography variant="h6">
                      {dnfCorrespond[form.secondDnfReason]}
                    </Typography>
                  </div>
                ) : form.secondStatus === "plusTwo" ? (
                  <Typography variant="h4">
                    {String(secondInput)} + 2
                  </Typography>
                ) : (
                  <Typography variant="h4">{secondInput}</Typography>
                )}
              </Box>
              <Box display="block" textAlign="center" margin="20px 0 0 0">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="condition"
                    name="secondStatus"
                    value={form.secondStatus}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value="success"
                      control={<Radio color="primary" />}
                      label="OK"
                    />
                    <FormControlLabel
                      value="plusTwo"
                      control={<YellowRadio />}
                      label="+2"
                    />
                    <FormControlLabel
                      value="DNF"
                      control={<RedRadio onClick={handleOpen2} />}
                      label="DNF"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Modal
                aria-labelledby="modal-title-2"
                aria-describedby="modal-description-2"
                className={classes.modal}
                open={open2}
                onClose={handleClose2}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open2}>
                  <div className={classes.paper}>
                    <Box marginBottom="10px">
                      <Typography variant="h4" id="modal-title-2">
                        DNFの理由
                      </Typography>
                      <Typography variant="body1" id="modal-description-2">
                        ※一番近いものを選んでください
                      </Typography>
                    </Box>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="dnfReason2"
                        name="secondDnfReason"
                        value={form.secondDnfReason}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="observationMiss"
                          control={<Radio color="primary" />}
                          label="分析ミス"
                        />
                        <FormControlLabel
                          value="memoSlip"
                          control={<Radio color="primary" />}
                          label="記憶が飛んだ"
                        />
                        <FormControlLabel
                          value="edgeExeMiss"
                          control={<Radio color="primary" />}
                          label="エッジの実行ミス"
                        />
                        <FormControlLabel
                          value="cornerExeMiss"
                          control={<Radio color="primary" />}
                          label="コーナーの実行ミス"
                        />
                        <FormControlLabel
                          value="recallMiss"
                          control={<Radio color="primary" />}
                          label="違うレターペアの想起"
                        />
                      </RadioGroup>
                    </FormControl>
                    <Box textAlign="right" marginTop="10px">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose2}
                      >
                        確定
                      </Button>
                    </Box>
                  </div>
                </Fade>
              </Modal>
            </Paper>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Paper className={classes.resultPaper}>
              <Box paddingTop="20px" textAlign="center">
                {thirdInput === "" ? (
                  <Typography variant="h4">-:--.--</Typography>
                ) : form.thirdStatus === "DNF" ? (
                  <div>
                    <Typography variant="h6">DNF</Typography>
                    <Typography variant="h6">
                      {dnfCorrespond[form.thirdDnfReason]}
                    </Typography>
                  </div>
                ) : form.thirdStatus === "plusTwo" ? (
                  <Typography variant="h4">{String(thirdInput)} + 2</Typography>
                ) : (
                  <Typography variant="h4">{thirdInput}</Typography>
                )}
              </Box>
              <Box display="block" textAlign="center" margin="20px 0 0 0">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="condition"
                    name="thirdStatus"
                    value={form.thirdStatus}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value="success"
                      control={<Radio color="primary" />}
                      label="OK"
                    />
                    <FormControlLabel
                      value="plusTwo"
                      control={<YellowRadio />}
                      label="+2"
                    />
                    <FormControlLabel
                      value="DNF"
                      control={<RedRadio onClick={handleOpen3} />}
                      label="DNF"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Modal
                aria-labelledby="modal-title-3"
                aria-describedby="modal-description-3"
                className={classes.modal}
                open={open3}
                onClose={handleClose3}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open3}>
                  <div className={classes.paper}>
                    <Box marginBottom="10px">
                      <Typography variant="h4" id="modal-title-3">
                        DNFの理由
                      </Typography>
                      <Typography variant="body1" id="modal-description-3">
                        ※一番近いものを選んでください
                      </Typography>
                    </Box>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="dnfReason3"
                        name="thirdDnfReason"
                        value={form.thirdDnfReason}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="observationMiss"
                          control={<Radio color="primary" />}
                          label="分析ミス"
                        />
                        <FormControlLabel
                          value="memoSlip"
                          control={<Radio color="primary" />}
                          label="記憶が飛んだ"
                        />
                        <FormControlLabel
                          value="edgeExeMiss"
                          control={<Radio color="primary" />}
                          label="エッジの実行ミス"
                        />
                        <FormControlLabel
                          value="cornerExeMiss"
                          control={<Radio color="primary" />}
                          label="コーナーの実行ミス"
                        />
                        <FormControlLabel
                          value="recallMiss"
                          control={<Radio color="primary" />}
                          label="違うレターペアの想起"
                        />
                      </RadioGroup>
                    </FormControl>
                    <Box textAlign="right" marginTop="10px">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose3}
                      >
                        確定
                      </Button>
                    </Box>
                  </div>
                </Fade>
              </Modal>
            </Paper>
          </Grid>
        </Grid>
        {situation === 3 ? (
          <div>
            <Box textAlign="center" marginTop="20px">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={uiLoading}
                size="large"
              >
                結果を送信する
                {uiLoading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
            </Box>
            {errors.error && (
              <Box textAlign="center" margin="20px 0">
                <Typography variant="h5" color="error">
                  {errors.error}
                </Typography>
              </Box>
            )}
          </div>
        ) : (
          <p></p>
        )}
      </form>
    </React.Fragment>
  );
}

ContestUseTimer.propTypes = {
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
  getContest,
};

export default connect(mapStateToProps, mapActionsToProps)(ContestUseTimer);
