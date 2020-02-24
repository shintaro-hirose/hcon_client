import React, {useState} from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const Timer2 = (props) => {
    const [started22222, setStarted22222] = useState(false);
    const [pressStartTime22222, setPressStartTime22222] = useState(false);
    const [timeLapse22222, setTimeLapse22222] = useState(0);
    const [attemptStartTime22222, setAttemptStartTime22222] = useState(false);
    const [attemptStarted22222, setAttemptStarted22222] = useState(false);
    const [solveTime22222, setSolveTime22222] = useState(0);
    const [finished22222, setFinished22222] = useState(false);

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

    document.onkeypress = function(e) {
        if (finished22222) return;
        if (!attemptStarted22222){
            let event;
            if (e) {event = e};
            if (!started22222){
                setStarted22222(true);
                setPressStartTime22222(Date.now());
            } else {
                setSolveTime22222(0);
                setTimeLapse22222(Date.now() - pressStartTime22222);
            }

        } else {
            const d = Date.now() - attemptStartTime22222;
            setAttemptStarted22222(false);
            setSolveTime22222(d);
            setFinished22222(true);
            if(props.setFirstInput) return props.setFirstInput(timeFormatter(d));
            if(props.setSecondInput) return props.setSecondInput(timeFormatter(d));
            if(props.setThirdInput) return props.setThirdInput(timeFormatter(d));
            
        }
        
    };

    document.onkeyup = function(e) {

        if (finished22222) return;
        let event;
        if (e){event = e};
        if(timeLapse22222 < 200){
            setTimeLapse22222(0);
            setStarted22222(false);
            setPressStartTime22222(false);
        } else if(timeLapse22222>= 200) {
            setTimeLapse22222(0);
            setStarted22222(false);
            setAttemptStarted22222(true);
            setAttemptStartTime22222(Date.now());
            setSolveTime22222("測定中")
        }
    }

    return (
      <div>
          <Box textAlign="center" marginTop="30px">
          { (!started22222 && !attemptStarted22222) ? (
              <Typography component="div">
                  <Box fontSize="h1.fontSize">
                   {timeFormatter(solveTime22222)}
                  </Box>
              </Typography>
              
          ):(
            started22222 ? (
                timeLapse22222 < 200 ? (
                    <Typography component="div">
                  <Box fontSize="h1.fontSize" color="red">
                  00.00
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
                  <Box fontSize="h1.fontSize" color="#64dd17">
                   {timeFormatter(solveTime22222)}
                  </Box>
              </Typography>
            )
          ) }
          </Box>
      </div>
    );
  };

export default Timer2;