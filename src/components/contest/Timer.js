import React, {useState} from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    check: {
        height: "75px",
        width: "600px",
        textAlign:"center",
        margin: "0 auto",
        fontSize: 30,
    },
  }));

const Timer = ({setFirstInput, setSecondInput, setThirdInput, setSituationPar}) => {
    const classes = useStyles();
    const [showCheck, setShowCheck] = useState(false);
    const [started, setStarted] = useState(false);
    const [pressStartTime, setPressStartTime] = useState(false);
    const [timeLapse, setTimeLapse] = useState(0);
    const [attemptStartTime, setAttemptStartTime] = useState(0);
    const [attemptStarted, setAttemptStarted] = useState(false);
    const [solveTime, setSolveTime] = useState(0);
    const [situation, setSituation] = useState(0) // 0: before attempt 1, 1: between 1-2, 2: between2-3, 3: all attempt done

    const timeFormatter = (time) => {
        if (isNaN(time))　return time;
        const ms = time % 1000;
        const fs = (time - ms) /1000;
        const s = fs % 60;
        const m = (fs - s) / 60
        if (m > 0) {
            return (String(m)) +':'+ ('0'+String(s)).slice(-2) +'.' +('00'+String(ms)).slice(-3,-1)
        } else {
            return ('0'+String(s)).slice(-2) +'.' + ('00'+String(ms)).slice(-3,-1)
        }
        
    }

    document.onkeydown = function(e) {
        if(situation >= 3) return;
        if (!attemptStarted){
            if(e.keyCode !== 32) return;
            if (!started){
                setStarted(true);
                setPressStartTime(Date.now());
            } else {
                setSolveTime(0);
                setTimeLapse(Date.now() - pressStartTime);
            }

        } else {
            const result = Date.now() - attemptStartTime;
            const d = situation;
            setSituation(d + 1)
            setSituationPar(d+1)
            setAttemptStartTime(0);
            setAttemptStarted(false);
            setSolveTime(result);
            setShowCheck(true);
            if (d === 0) return setFirstInput(timeFormatter(result));
            if (d === 1) return setSecondInput(timeFormatter(result));
            if (d === 2) return setThirdInput(timeFormatter(result));
            
        }
        
    };

    document.onkeyup = function(e) {
        if(situation >= 3) return;
        if(timeLapse < 200){
            setTimeLapse(0);
            setStarted(false);
            setPressStartTime(false);
        } else if(timeLapse >= 200) {
            setTimeLapse(0);
            setStarted(false);
            setAttemptStarted(true);
            setAttemptStartTime(Date.now());
            setSolveTime("Timing")
        }
    }

    const handleCheckClick = () => {
        setShowCheck(false);
    }

    return (
      <div>
          <Box textAlign="center" margin="20px 0" minHeight="180px">
              {
                    (!started && !attemptStarted) ? (
                        <Typography component="div">
                            <Box fontSize="h1.fontSize">
                             {timeFormatter(solveTime)}
                            </Box>
                            { situation !== 3 ? (
                                showCheck ? (
                                <Box className={classes.check} 
                                component={Button} 
                                variant="contained"
                               
                                onClick={handleCheckClick}>
                                    次の試技に進む
                                </Box>
                                ) : (
                        <div>
                                <Box　fontSize="h4.fontSize">
                                スペースキー長押しでスタート
                            </Box>
                            <Box　fontSize="body1.fontSize">
                            ※計測中は"Timing"と表示されます
                        </Box>
                        </div>
                                )
                                
                            ) : (<p></p>)}
                            
                        </Typography>
                        
                    ):(
                      started ? (
                          timeLapse < 200 ? (
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
                            <Box fontSize="h1.fontSize" color="primary">
                             {timeFormatter(solveTime)}
                            </Box>
                        </Typography>
                      )
                    )
              }
          </Box>
      </div>
    );
  };

export default Timer;