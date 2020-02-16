import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import UserSummary from '../user/UserSummary'

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
}));

const StyledTableCell = withStyles({
    root:{
        padding:5,
        wordWrap:'break-word',
        fontSize:'13px',
    },

})(TableCell);

function createData(rank, name, single, all) {
  return { rank, name, single, all };
}

const rows = [
  createData(1, "massan", 24.19, "24.19 28.42 DNF"),
  createData(20, "JackJackJackJack", "1:26.19", "1:26.19 28.42 DNF"),
  createData(3, "Hshi", 27.19, "27.19 28.42 DNF"),
];

export default function ResultTable() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <StyledTableCell>順位</StyledTableCell>
            <StyledTableCell align="center">ユーザ名</StyledTableCell>
            <StyledTableCell align="center">単発</StyledTableCell>
            <StyledTableCell align="center">全記録</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.rank}>
              <StyledTableCell component="th" scope="row">
                {row.rank}
              </StyledTableCell>
              <StyledTableCell align="center">
              <Button className={classes.button} onClick={handleOpen}>
                {row.name}
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <UserSummary />
                </Fade>
              </Modal>
              </StyledTableCell>
              <StyledTableCell align="center">{row.single}</StyledTableCell>
              <StyledTableCell align="center">{row.all}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}