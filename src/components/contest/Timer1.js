import React, {useState} from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const Timer1 = (props) => {
    const [started11111, setStarted11111] = useState(false);
    const [pressStartTime11111, setPressStartTime11111] = useState(false);
    const [timeLapse11111, setTimeLapse11111] = useState(0);
    const [attemptStartTime11111, setAttemptStartTime11111] = useState(false);
    const [attemptStarted11111, setAttemptStarted11111] = useState(false);
    const [solveTime11111, setSolveTime11111] = useState(0);
    const [finished11111, setFinished11111] = useState(false);

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
        if (finished11111) return;
        if (!attemptStarted11111){
            let event;
            if (e) {event = e};
            if (!started11111){
                setStarted11111(true);
                setPressStartTime11111(Date.now());
            } else {
                setSolveTime11111(0);
                setTimeLapse11111(Date.now() - pressStartTime11111);
            }

        } else {
            const d = Date.now() - attemptStartTime11111;
            setAttemptStarted11111(false);
            setSolveTime11111(d);
            setFinished11111(true);
            if(props.setFirstInput) return props.setFirstInput(timeFormatter(d));
            if(props.setSecondInput) return props.setSecondInput(timeFormatter(d));
            if(props.setThirdInput) return props.setThirdInput(timeFormatter(d));
            
        }
        
    };

    document.onkeyup = function(e) {
        if (finished11111) return;
        let event;
        if (e){event = e};
        if(timeLapse11111 < 200){
            setTimeLapse11111(0);
            setStarted11111(false);
            setPressStartTime11111(false);
        } else if(timeLapse11111>= 200) {
            setTimeLapse11111(0);
            setStarted11111(false);
            setAttemptStarted11111(true);
            setAttemptStartTime11111(Date.now());
            setSolveTime11111("測定中")
        }
    }

    return (
      <div>
          <Box textAlign="center" marginTop="30px">
          { (!started11111 && !attemptStarted11111) ? (
              <Typography component="div">
                  <Box fontSize="h1.fontSize">
                   {timeFormatter(solveTime11111)}
                  </Box>
              </Typography>
              
          ):(
            started11111 ? (
                timeLapse11111 < 200 ? (
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
                   {timeFormatter(solveTime11111)}
                  </Box>
              </Typography>
            )
          ) }
          </Box>
      </div>
    );
  };

export default Timer1;