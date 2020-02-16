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
    const profile = props.profile;
    const bestTime1 = profile.bestTime1.time
    const bestTime2 = profile.bestTime2.time
    const bestTime3 = profile.bestTime3.time
    const bestTime4 = profile.bestTime4.time
    const bestTime5 = profile.bestTime5.time
    
    const rows = [
        {rank:1, time: bestTime1},
        {rank:2, time: bestTime2},
        {rank:3, time: bestTime3},
        {rank:4, time: bestTime4},
        {rank:5, time: bestTime5}
    ] 
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
        <TableContainer>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell >Recent Best</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.rank}>
                            <TableCell component="th" scope="row">
                                {row.rank}.
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.time}
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
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    user: state.user,
  });
  
  
  
  export default connect(
    mapStateToProps
  )(UserBestTable);