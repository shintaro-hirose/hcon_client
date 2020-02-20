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
    const contestId = props.match.params.contestId;
    function getResult(a) {
      props.getResult(a);
    }
    useEffect(() => {
        getResult(contestId);
    }, []);
    let day = new Date();
    day.setDate(day.getDate() - 1);
    const [selectedDate, setSelectedDate] = useState(day);
    const handleDateChange = (date) => {
        setSelectedDate(date);
        let year = String(date.getFullYear());
        let month = String(date.getMonth() + 1) ;
        let day = String(date.getDate());
        month = ('0'+ month).slice(-2);
        day = ('0'+ day).slice(-2);
        const contestId = year+month+day;
        props.getResult(contestId);
    };

    const loading = props.user.loading;
    const contestData = props.user.contestData;
    return(
      <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div>
        <Box textAlign="center">
        <Typography variant="h4" align="center" >Results</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy/MM/dd"
            margin="normal"
            id="date-picker-inline"
            label="日付を選択してください"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
            />
        </MuiPickersUtilsProvider>
        </Box>
        <Box textAlign="center" margin="30px 0"> 
        <Typography variant="h6" margin="20px 0">1試技目: {contestData.scrambles.first}</Typography>
        <Typography variant="h6" margin="20px 0">2試技目: {contestData.scrambles.second}</Typography>
        <Typography variant="h6" margin="20px 0">3試技目: {contestData.scrambles.third}</Typography>
        </Box>
        <Box textAlign="center">
        { contestData.results.length === 0 ? (
            <Typography variant="h5" margin="20px 0">この日の参加者はいませんでした。</Typography>
        ) : (
            <ResultTable contestData={contestData}/>
        )  }
        </Box>
    </div>
      )}
      </React.Fragment>
        
    )
}

Results.propTypes = {
    getResult: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    user: state.user,
  });
  
  const mapActionsToProps = {
    getResult
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Results);