import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme =>({
  table: {
    padding:0,

  },
  button:{
    padding:0,
    fontSize:'11px',
  },
  profileImage :{
    width: 25,
    height: 25,
    objectFit: 'cover',
    maxWidth: '100%',
    borderRadius: '50%',
    display: 'inline' ,
    verticalAlign: 'middle'
  },
}));

export default function ResultTable(props) {
  const classes = useStyles();
  const contestData = props.contestData;
  const results = contestData.results;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>順位</TableCell>
            <TableCell align="center">ユーザ名</TableCell>
            <TableCell align="center">単発</TableCell>
            <TableCell align="center">記録</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row, index) => (
            <TableRow key={row.userHandle}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell component="th" scope="row" padding="none" align="center" >
                <img src={row.imageUrl} alt="profile" className={classes.profileImage} />
                <Button  color="inherit" component={Link} to={`/user/${row.userHandle}`}>
                  {row.displayName}
                </Button>
              </TableCell>
              <TableCell align="center" padding="none" >
              { row.bestTime===3600 ? "DNF" : (
                          row.bestTime >= 60 ? `${Math.floor(row.bestTime/60)}:${(row.bestTime - 60*Math.floor(row.bestTime/60)).toFixed(2)}`
                          : row.bestTime
                        )}
              </TableCell>
              <TableCell align="center" padding="none">
                <Box display="inline" marginRight="10px">
                { row.firstTime===3600 ? "DNF" : (
                          row.firstTime >= 60 ? `${Math.floor(row.firstTime/60)}:${(row.firstTime - 60*Math.floor(row.firstTime/60)).toFixed(2)}`
                          : row.firstTime
                        )}
                </Box>
                <Box  display="inline" marginRight="10px">
                { row.secondTime===3600 ? "DNF" : (
                          row.secondTime >= 60 ? `${Math.floor(row.secondTime/60)}:${(row.secondTime - 60*Math.floor(row.secondTime/60)).toFixed(2)}`
                          : row.secondTime
                        )} 
                </Box>
                <Box  display="inline">
                { row.thirdTime===3600 ? "DNF" : (
                          row.thirdTime >= 60 ? `${Math.floor(row.thirdTime/60)}:${(row.thirdTime - 60*Math.floor(row.thirdTime/60)).toFixed(2)}`
                          : row.thirdTime
                        )}
                 </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}