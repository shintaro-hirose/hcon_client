import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip , ResponsiveContainer, CartesianGrid } from 'recharts';

import { connect } from 'react-redux';


const useStyles = makeStyles(theme => ({
  paper: {
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      height: 443,
      width:"100%",
      padding: "10px 0",
      boxShadow: theme.shadows[5],
    },
    noData: {
      width:"100%",
      padding: "10px 0",
      boxShadow: theme.shadows[5],
  
    },
}));

const  UserChart = (props) => {
  const theme = useTheme();
  const results = props.userData.results;

  const classes = useStyles();
  const formattedResults = []
  if( results && (results.length !== 0) ){
    results.forEach(result => {
      if(result.bestTime !== 3600){
        formattedResults.push(result);
      }
    })
  }
  formattedResults.sort((a, b) => {
    if (a.createdAt < b.createdAt) return -1;
    if (a.createdAt > b.createdAt) return 1;
    return 0;
});
  return (
    <React.Fragment>
      { props.userData.totalAttempts-props.userData.totalDnfs === 0 ? (
        <Paper className={classes.noData}>
          <Box padding="0 10px" textAlign="center">
            まだデータがありません
          </Box>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
        <ResponsiveContainer>
          <LineChart
            data={formattedResults}
            margin={{
              top: 16,
              right: 16,
              bottom: 0
            }}
          >
            <XAxis dataKey="createdAt" stroke={theme.palette.text.secondary}
            tickFormatter={(tickItem) => moment(tickItem).format('MM/DD')} 
            />
            <YAxis stroke={theme.palette.text.secondary} />
            <Line name="単発ベスト"
            type="monotone" dataKey="bestTime" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
            <CartesianGrid // ガイド線の表示
              stroke="#ccc"
              strokeDasharray="3 3"
            />
            <Tooltip 
            labelFormatter={(props) => moment(props).format('YYYY/MM/DD')}
            />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
        </Paper>
  
      )}
    </React.Fragment>
  );
}

UserChart.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps
)(UserChart);