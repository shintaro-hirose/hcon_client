import React, {useState} from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const Timer3 = (props) => {
    const [started33333, setStarted33333] = useState(false);
    const [pressStartTime33333, setPressStartTime33333] = useState(false);
    const [timeLapse33333, setTimeLapse33333] = useState(0);
    const [attemptStartTime33333, setAttemptStartTime33333] = useState(false);
    const [attemptStarted33333, setAttemptStarted33333] = useState(false);
    const [solveTime33333, setSolveTime33333] = useState(0);
    const [finished33333, setFinished33333] = useState(false);

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

        if (finished33333) return;
        if (!attemptStarted33333){
            let event;
            if (e) {event = e};
            if (!started33333){
                setStarted33333(true);
                setPressStartTime33333(Date.now());
            } else {
                setSolveTime33333(0);
                setTimeLapse33333(Date.now() - pressStartTime33333);
            }

        } else {
            const d = Date.now() - attemptStartTime33333;
            setAttemptStarted33333(false);
            setSolveTime33333(d);
            setFinished33333(true);
            if(props.setFirstInput) return props.setFirstInput(timeFormatter(d));
            if(props.setSecondInput) return props.setSecondInput(timeFormatter(d));
            if(props.setThirdInput) return props.setThirdInput(timeFormatter(d));
            
        }
        
    };

    document.onkeyup = function(e) {
        if (finished33333) return;
        let event;
        if (e){event = e};
        if(timeLapse33333 < 200){
            setTimeLapse33333(0);
            setStarted33333(false);
            setPressStartTime33333(false);
        } else if(timeLapse33333>= 200) {
            setTimeLapse33333(0);
            setStarted33333(false);
            setAttemptStarted33333(true);
            setAttemptStartTime33333(Date.now());
            setSolveTime33333("測定中")
        }
    }

    return (
      <div>
          <Box textAlign="center" marginTop="30px">
          { (!started33333 && !attemptStarted33333) ? (
              <Typography component="div">
                  <Box fontSize="h1.fontSize">
                   {timeFormatter(solveTime33333)}
                  </Box>
              </Typography>
              
          ):(
            started33333 ? (
                timeLapse33333 < 200 ? (
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
                   {timeFormatter(solveTime33333)}
                  </Box>
              </Typography>
            )
          ) }
          </Box>
      </div>
    );
  };

export default Timer3;