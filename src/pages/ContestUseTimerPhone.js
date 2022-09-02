import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
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

import { connect } from "react-redux";
import { postContestResult, getContest } from "../redux/actions/userActions";
import { getCurrentContestId } from "../util/commonFunctions";

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
  scramble: {
    margin: "20px 0",
  },
  pastScramble: {
    marginTop: "20px",
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
    marginBottom: "10px",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  cantSelect: {
    userSelect: "none",
  },
  check: {
    width: "90%",
    textAlign: "center",
    margin: "0 auto",
    fontSize: 30,
  },
  timing: {
    color: theme.palette.text.primary
  }
}));

const RedRadio = withStyles({
  checked: { color: red[600] },
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
  checked: { color: yellow[600] },
})((props) => <Radio color="default" {...props} />);

function ContestUseTimerPhone(props) {

  const conId = getCurrentContestId();

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

  const handleConfirm = (event) => {
    setSituationPar(4);
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

  const [attemptStartTime, setAttemptStartTime] = useState(0);
  const [showCheck, setShowCheck] = useState(false);
  const [solveTime, setSolveTime] = useState(0);
  const [timeSituation, setTimeSituation] = useState("neutral");
  const [canStartTrigger, setCanStartTrigger] = useState(false);
  const [hsStart, setHsStart] = useState(0);
  const timeFormatter = (time) => {
    if (isNaN(time)) return time;
    const ms = time % 1000;
    const fs = (time - ms) / 1000;
    const s = fs % 60;
    const m = (fs - s) / 60;
    if (m > 0) {
      return (
        String(m) +
        ":" +
        ("0" + String(s)).slice(-2) +
        "." +
        ("00" + String(ms)).slice(-3, -1)
      );
    } else {
      return (
        ("0" + String(s)).slice(-2) + "." + ("00" + String(ms)).slice(-3, -1)
      );
    }
  };
  let timer;
  let hs;

  const handleOnTouchStart = (e) => {
    if (showCheck) return;
    if (situation >= 3) return;
    if (timeSituation === "neutral") {
      hs = hsStart;
      setCanStartTrigger(false);
      setTimeSituation("touching");
      timer = setInterval(() => {
        hs = hs + 10;
        console.log(hs);
        if (hs >= 200) {
          setCanStartTrigger(true);
          clearInterval(timer);
        }
      }, 10);
    } else if (timeSituation === "timing") {
      const result = Date.now() - attemptStartTime;
      const d = situation;
      setTimeSituation("neutral");
      setCanStartTrigger(false);
      setSituationPar(d + 1);
      setAttemptStartTime(0);
      setSolveTime(result);
      setShowCheck(true);
      if (d === 0) return setFirstInput(timeFormatter(result));
      if (d === 1) return setSecondInput(timeFormatter(result));
      if (d === 2) return setThirdInput(timeFormatter(result));
    }
  };

  const handleOnTouchEnd = (e) => {
    if (showCheck) return;
    clearInterval(timer);
    if (situation >= 3) return;
    if (timeSituation === "touching" && canStartTrigger) {
      setHsStart(0);
      setTimeSituation("timing");
      setAttemptStartTime(Date.now());
      setSolveTime("Timing");
    } else {
      setHsStart(0);
      setTimeSituation("neutral");
      setCanStartTrigger(false);
    }
  };
  const handleCheckClick = () => {
    setShowCheck(false);
  };

  return (
    <React.Fragment>
      <div>
        {timeSituation === "neutral" ? (
          <div>
            <Typography variant="h4" align="center">
              {contestId.substr(0, 4)}/{contestId.substr(4, 2)}/
              {contestId.substr(6, 2)} のコンテスト
            </Typography>
            {situation === 0 ? (
              <Typography
                variant="h5"
                align="center"
                className={classes.scramble}
              >
                1st: {props.user.contest.scrambles.first}
              </Typography>
            ) : situation === 1 ? (
              <Typography
                variant="h5"
                align="center"
                className={classes.scramble}
              >
                2nd: {props.user.contest.scrambles.second}
              </Typography>
            ) : situation === 2 ? (
              <Typography
                variant="h5"
                align="center"
                className={classes.scramble}
              >
                3rd: {props.user.contest.scrambles.third}
              </Typography>
            ) : situation === 4 ? (
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
              </div>
            ) : (
              <Typography
                variant="h5"
                align="center"
                className={classes.scramble}
              ></Typography>
            )}
          </div>
        ) : (
          <p></p>
        )}

        {isMobile() && situation !== 4 ? (
          <div onTouchStart={handleOnTouchStart} onTouchEnd={handleOnTouchEnd}>
            <Box
              textAlign="center"
              margin="20px 0"
              minHeight="180px"
              className={classes.cantSelect}
            >
              {timeSituation === "neutral" ? (
                <Typography component="div">
                  <Box fontSize="h1.fontSize" color="inherit">{timeFormatter(solveTime)}</Box>
                  {situation !== 3 ? (
                    showCheck ? (
                      <Box
                        className={classes.check}
                        component={Button}
                        variant="contained"
                        onClick={handleCheckClick}
                      >
                        次の試技に進む
                      </Box>
                    ) : (
                      <Box fontSize="h5.fontSize">画面長押しでスタート</Box>
                    )
                  ) : (
                    <p></p>
                  )}
                </Typography>
              ) : timeSituation === "touching" ? (
                !canStartTrigger ? (
                  <Typography component="div">
                    <Box fontSize="h1.fontSize" color="red">
                      {timeFormatter(solveTime)}
                    </Box>
                  </Typography>
                ) : (
                  <Typography component="div">
                    <Box fontSize="h1.fontSize" color="#64dd17">
                      00.00
                    </Box>
                  </Typography>
                )
              ) : (
                <Typography component="div">
                  <Box fontSize="h1.fontSize" color="inherit">
                    {timeFormatter(solveTime)}
                  </Box>
                </Typography>
              )}
            </Box>
            <Box
              height={timeSituation === "neutral" ? "0px" : "380px"}
              className={classes.cantSelect}
            ></Box>
          </div>
        ) : (
          <p></p>
        )}
        {timeSituation === "neutral" ? (
          <form className={classes.root} noValidate onSubmit={handleSubmit}>
            <div>
              {situation === 1 || situation === 4 ? (
                <Paper className={classes.resultPaper}>
                  <Box paddingTop="20px" textAlign="center">
                    <Box marginBottom="10px">
                      <Typography variant="h5">1試技目</Typography>
                    </Box>
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
                      <Typography variant="h4">
                        {String(firstInput)} + 2
                      </Typography>
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
              ) : (
                <p></p>
              )}
              {situation === 2 || situation === 4 ? (
                <Paper className={classes.resultPaper}>
                  <Box paddingTop="20px" textAlign="center">
                    <Box marginBottom="10px">
                      <Typography variant="h5">2試技目</Typography>
                    </Box>
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
              ) : (
                <p></p>
              )}
              {situation === 3 || situation === 4 ? (
                <Paper className={classes.resultPaper}>
                  <Box paddingTop="20px" textAlign="center">
                    <Box marginBottom="10px">
                      <Typography variant="h5">3試技目</Typography>
                    </Box>
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
                      <Typography variant="h4">
                        {String(thirdInput)} + 2
                      </Typography>
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
              ) : (
                <p></p>
              )}
            </div>
            {situation === 3 ? (
              <div>
                <Box textAlign="center" marginTop="20px">
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleConfirm}
                    color="primary"
                  >
                    結果を確認する
                  </Button>
                </Box>
              </div>
            ) : (
              <p></p>
            )}
            {situation === 4 ? (
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
                      <CircularProgress
                        size={30}
                        className={classes.progress}
                      />
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
        ) : (
          <p></p>
        )}
      </div>
    </React.Fragment>
  );
}

ContestUseTimerPhone.propTypes = {
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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ContestUseTimerPhone);
