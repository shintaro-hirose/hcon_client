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

const paperColor = (rated) => {
  if(rated === "ゴッドイーター"){
    return "#ffcdd2"
  } else if(rated === "ゴッド"){
    return "#f8bbd0"
  } else if(rated === "グランドマスター"){
    return "#e1bee7"
  }else if(rated === "マスター"){
    return "#d1c4e9"
  } else if(rated === "ダイヤモンド"){
    return "#a7ffeb"
  } else if(rated === "ソロモン"){
    return "#dcedc8"
  } else if(rated === "プラチナ"){
    return "#b3e5fc"
  } else if(rated === "ゴールド"){
    return "#fff9c4"
  } else if(rated === "シルバー"){
    return "#cfd8dc"
  } else if(rated === "ブロンズ"){
    return "#ffe0b2"
  } else if(rated === "アイアン"){
    return "#f5f5f5"
  } else if(rated === "ビギナー"){
    return "#d7ccc8"
  } else {
    return "#d7ccc8"
  }
}

const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow:'scroll'

    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
    table: {
      },
  }));

  function createData(rank, rating, time, color ) {
    return { rank, rating, time, color };
  }
  
  const rows = [
    createData('ゴッドイーター',"10150", "19.00","#ffcdd2"),
    createData('ゴッド',"10000", "20.00","#f8bbd0"),
    createData('グランドマスター',"9500", "25.00","#e1bee7"),
    createData('マスター',"9000", "30.00","#d1c4e9"),
    createData('ソロモン',"8500", "40.00","#dcedc8"),
    createData('ダイヤモンド',"8000", "50.00","#a7ffeb"),
    createData('プラチナ',"7000", "1:10.00","#b3e5fc"),
    createData('ゴールド',"6000", "1:30.00","#fff9c4"),
    createData('シルバー',"5500", "2:30.00","#cfd8dc"),
    createData('ブロンズ',"4000", "5:00.00","#ffe0b2"),
    createData('ビギナー',"0", "-","#d7ccc8"),
    
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
                <TableRow key={row.rank} style={{ backgroundColor: row.color }}>
                  <TableCell component="th" scope="row" align="center" >
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
                    <Typography component="div" >
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
                    <Box display="flex" justifyContent="center" marginTop="20px">
                      <Button variant="contained" color="primary" onClick={handleClose} >
                        OK
                      </Button>
                    </Box>
                </div>
            </Fade>
            </Modal>
        </div>
    )
}
