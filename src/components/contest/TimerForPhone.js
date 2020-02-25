import React, {useState} from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const TimerForPhone = ({setFirstInput, setSecondInput, setThirdInput, setSituationPar}) => {
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

    document.ontouchstart = function(e) {
        if(situation >= 3) return;
        if (!attemptStarted){
            let event;
            if (e) {event = e};
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
            if (d === 0) return setFirstInput(timeFormatter(result));
            if (d === 1) return setSecondInput(timeFormatter(result));
            if (d === 2) return setThirdInput(timeFormatter(result));
        }
        
    };

    document.ontouchend = function(e) {
        if(situation >= 3) return;
        let event;
        if (e){event = e};
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

    return (
      <div>
          <Box textAlign="center" margin="20px 0" minHeight="180px">
          { (!started && !attemptStarted) ? (
              <Typography component="div">
                  <Box fontSize="h1.fontSize">
                   {timeFormatter(solveTime)}
                  </Box>
                  { situation !== 3 ? (
                      <Box　fontSize="h5.fontSize">
                      画面長押しでスタート
                  </Box>
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
          ) }
          </Box>
      </div>
    );
  };

export default TimerForPhone;