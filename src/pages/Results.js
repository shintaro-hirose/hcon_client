import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import PropTypes from 'prop-types';
import ResultTable from '../components/results/ResultTable';
import Loading from '../util/Loading';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { connect } from 'react-redux';
import { getResult } from '../redux/actions/userActions';

const Results = (props) => {
    const now = new Date();
    let year = String(now.getFullYear());
    let month = String(now.getMonth() + 1) ;
    let date = String(now.getDate());
    month = ('0'+ month).slice(-2);
    date = ('0'+ date).slice(-2);
    const t = year+month+date;
    const todayDate = new Date();

    const contestId = props.match.params.contestId;
    const refYear = contestId.substr(0,4);
    const refMonth = contestId.substr(4,2);
    const refDate = contestId.substr(6,2);

    if ((Number(t) - Number(contestId)) < 0){
      window.location.href = '/';
    }

    function getResult(a) {
      props.getResult(a);
    }
    useEffect(() => {
        getResult(contestId);
    }, []);
    const [selectedDate, setSelectedDate] = useState(new Date(Number(refYear), Number(refMonth)-1, Number(refDate)));
    const [selectedDateFormatted, setSelectedDateFormatted] = useState(contestId)
    const handleDateChange = (date) => {
        setSelectedDate(date);
        let year = String(date.getFullYear());
        let month = String(date.getMonth() + 1) ;
        let day = String(date.getDate());
        month = ('0'+ month).slice(-2);
        day = ('0'+ day).slice(-2);
        const con = year+month+day;
        setSelectedDateFormatted(con);
        if ((Number(t) - Number(con)) < 0){
          window.location.href = '/';
        }
        props.getResult(con);


    };

    const loading = props.UI.loading;
    const contestData = props.user.contestData;
    const errors = props.UI.errors;

    
    return(
      <React.Fragment>
        { errors.resultError ? (
          <p>{errors.resultError}</p>
         ) : (
          loading ? (
            <Loading />
          ) : (
            <div>
            <Box textAlign="center">
              {((Number(t) - Number(selectedDateFormatted)) === 0) ? (
                <Typography variant="h4" align="center" >今日の暫定結果</Typography>
    
              ) : (
                <Typography variant="h4" align="center" >過去の大会結果</Typography>
    
              )}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="date-picker-inline"
                label="日付を選択してください"
                value={selectedDate}
                minDate={new Date(2020,1,22,12,12)}
                maxDate={todayDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
            </MuiPickersUtilsProvider>
            </Box>
            <Box textAlign="left" margin="30px 0"> 
              <Box >
                <Typography variant="h6" >1試技目: {contestData.scrambles.first}</Typography>
              </Box>
              <Box margin="20px 0">
                <Typography variant="h6">2試技目: {contestData.scrambles.second}</Typography>
              </Box>
              <Box margin="20px 0">
                <Typography variant="h6">3試技目: {contestData.scrambles.third}</Typography>
              </Box>
            </Box>
            <Box textAlign="center">
            { contestData.results.length === 0 ? (
                <Typography variant="h5" margin="20px 0">この日の参加者はいませんでした。</Typography>
            ) : (
                <ResultTable contestData={contestData}/>
            )  }
            </Box>
        </div>
          )
        )}
      
      </React.Fragment>
        
    )
}

Results.propTypes = {
    getResult: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
  });
  
  const mapActionsToProps = {
    getResult
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Results);