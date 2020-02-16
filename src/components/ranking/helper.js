import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';


const useStyles = makeStyles(theme =>({
  table: {
    padding:0,

  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    padding:0,
    fontSize:'11px',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  }
}));

const StyledTableCell = withStyles({
    root:{
        padding:5,
        wordWrap:'break-word',
        fontSize:'13px',
    },

})(TableCell);

function RankingTable(props) {
  const classes = useStyles();

  const { user:{ userSummaries } } = props;


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <StyledTableCell>順位</StyledTableCell>
            <StyledTableCell align="center">ユーザ名</StyledTableCell>
            <StyledTableCell align="center">rating</StyledTableCell>
            <StyledTableCell align="center">単発ベスト</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userSummaries.map(row => (
            <TableRow key={row.userHandle}>
              <StyledTableCell component="th" scope="row">
                1
              </StyledTableCell>
              <StyledTableCell align="center">
              <Button className={classes.button} color="inherit" component={Link} to={`/user/${row.userHandle}`}>
                {row.userHandle}
              </Button>
              </StyledTableCell>
              <StyledTableCell align="center">{row.rating}</StyledTableCell>
              <StyledTableCell align="center">{row.bestTime1.time}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

RankingTable.propTypes = {
    user: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    user: state.user,
  });
  


export default connect(
    mapStateToProps
  )(RankingTable);