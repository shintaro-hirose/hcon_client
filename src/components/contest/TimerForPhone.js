import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  check: {
    height: "75px",
    width: "600px",
    textAlign: "center",
    margin: "0 auto",
    fontSize: 30,
  },
}));

const TimerForPhone = ({
  setFirstInput,
  setSecondInput,
  setThirdInput,
  setSituationPar,
}) => {
  const classes = useStyles();
  const [attemptStartTime, setAttemptStartTime] = useState(0);
  const [showCheck, setShowCheck] = useState(false);
  const [solveTime, setSolveTime] = useState(0);
  const [situation, setSituation] = useState(0);
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
      setSituation(d + 1);
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
    <div onTouchStart={handleOnTouchStart} onTouchEnd={handleOnTouchEnd}>
      <Box textAlign="center" margin="20px 0" minHeight="180px">
        {timeSituation === "neutral" ? (
          <Typography component="div">
            <Box fontSize="h1.fontSize">{timeFormatter(solveTime)}</Box>
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
                <Box fontSize="h5.fontSize">画面長押しでスタートwet</Box>
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
            <Box fontSize="h1.fontSize" color="black">
              {timeFormatter(solveTime)}
            </Box>
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default TimerForPhone;
