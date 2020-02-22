import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import  Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
    table: {
      },
  }));

  function createData(rank, rating, time) {
    return { rank, rating, time };
  }
  
  const rows = [
    createData('ゴッドイーター',"10150", "19.00"),
    createData('ゴッド',"10000", "20.00"),
    createData('グランドマスター',"9500", "25.00"),
    createData('マスター',"9000", "30.00"),
    createData('ダイアモンド',"8000", "50.00"),
    createData('プラチナ',"7000", "1:10.00"),
    createData('ゴールド',"6000", "1:30.00"),
    createData('シルバー',"5500", "2:30.00"),
    createData('ブロンズ',"4000", "5:00.00"),
    createData('ビギナー',"0", "-"),
    
  ];

function SimpleTable() {
    const classes = useStyles();
  
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table"　size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">ランク</TableCell>
              <TableCell align="center">レート</TableCell>
              <TableCell align="center">目安タイム</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.rank}>
                <TableCell component="th" scope="row" align="center">
                  {row.rank}
                </TableCell>
                <TableCell align="center">{row.rating}</TableCell>
                <TableCell align="center">{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

export default function RatingDescription() {
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button onClick={handleOpen} variant="outlined"  size="large">
                レートとランクについて
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
            }}>
            <Fade in={open}>
                <div className={classes.paper}>
                    <Typography component="div">
                        <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">
                        レートとランクについて
                        </Box>
                    </Typography>
                    <hr />
                    <Typography component="div">
                        <Box m={1}>
                            過去の単発ベスト5からレートを算出しています。
                            ランクと目安タイムは以下の通りです。
                        </Box>
                    </Typography>
                    <SimpleTable />
                </div>
            </Fade>
            </Modal>
        </div>
    )
}
