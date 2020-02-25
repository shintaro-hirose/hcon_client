import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { connect } from 'react-redux';


const useStyles = makeStyles(theme => ({
  paper: {
    width:"100%",
    boxShadow: theme.shadows[5],

  },
    table: {
    },
  }));



const UserBestTable = (props) => {
    const userData = props.userData;
    const bestTime1 = userData.bestTime1
    const bestTime2 = userData.bestTime2
    const bestTime3 = userData.bestTime3
    const bestTime4 = userData.bestTime4
    const bestTime5 = userData.bestTime5
    
    const rows = [
        {rank:1, time: bestTime1.time, date: bestTime1.contestId},
        {rank:2, time: bestTime2.time, date: bestTime2.contestId},
        {rank:3, time: bestTime3.time, date: bestTime3.contestId},
        {rank:4, time: bestTime4.time, date: bestTime4.contestId},
        {rank:5, time: bestTime5.time, date: bestTime5.contestId}
    ] 
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
        <TableContainer>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell >単発ベスト</TableCell>
                        <TableCell>日付</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.rank}>
                            <TableCell component="th" scope="row">
                                {row.rank}.
                            </TableCell>
                            <TableCell component="th" scope="row">
                            { row.time===3600 || row.time === "" ? "-" : (
                          row.time >= 60 ? `${Math.floor(row.time/60)}:${('0'+String((row.time - 60*(Math.floor(row.time/60))).toFixed(2))).substr(-5)}`
                          : row.time.toFixed(2)
                        )}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.time===3600 ? "-" : (
                              `${(row.date).substr(0,4)}/${(row.date).substr(4,2)}/${(row.date).substr(6,2)}`
                              )}
                            
                            </TableCell>
                        </TableRow>
                        
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        
    </Paper>
  );
}

UserBestTable.propTypes = {
    user: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    user: state.user,
  });
  
  
  
  export default connect(
    mapStateToProps
  )(UserBestTable);