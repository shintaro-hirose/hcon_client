import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';



import TimerIcon from '@material-ui/icons/Timer';
import CreateIcon from '@material-ui/icons/Create';

import sakura from '../../images/sakura.png'
import harukazeLogo from '../../images/harukaze-logo.svg';

import { connect } from 'react-redux';

const now = new Date();
let year = String(now.getFullYear());
let month = String(now.getMonth() + 1) ;
let date = String(now.getDate());
month = ('0'+ month).slice(-2);
date = ('0'+ date).slice(-2);
const contestId = year+month+date

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 20,
    padding:"0 0 20px 0",
    boxShadow: theme.shadows[5],
    backgroundImage: `url(${sakura})`,
  },
  title: {
    fontSize: 20,
    textAlign:"center",
    padding:0,
    marginBottom:20,
    fontWeight: 'bold'

  },
  subTitle: {
    fontSize: 18,
    textAlign:"center",
    padding:0,
    marginBottom:20,
    fontWeight: 'bold',

  },
  content:{
      textAlign: "center",
      fontSize: 20,
      flexGrow: 1,
      margin: '10px'

  },
  text:{
      margin: '10px 0'
  },
  logo:{
    width: "200px",
    height: "95px",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow:'scroll'

  },
  paper: {
    width: "80%",
    maxWidth: "600px",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },

}));

function ExibitionHome(props) {
  const [isPostable, setIsPostable] = useState(true);
  const [open,setOpen] = useState(false);
  const classes = useStyles();
  const authenticated = props.user.authenticated;
  let post; 
  let situation;
  let description;
  let goToFinal = false;
  const handleOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};


  if(props.user.authorizedUserSummary.exibitionPost) {
    post = props.user.authorizedUserSummary.exibitionPost;
  }

  if(props.user.authorizedUserSummary.goToFinal) {
    goToFinal = props.user.authorizedUserSummary.goToFinal;
  }

  if(props.user.exibitions.breathOfSpring2020){
    situation = props.user.exibitions.breathOfSpring2020.situation;
    description = props.user.exibitions.breathOfSpring2020.description;
  }
  if(isPostable){
    if(props.user.authorizedUserSummary.lastPostedDate){
      const lastPostedDate = props.user.authorizedUserSummary.lastPostedDate;
      if(contestId === lastPostedDate)  setIsPostable(false);
    }
  }
  function isMobile(){
    var regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return (window.navigator.userAgent.search(regexp) !== -1);
  }

  const exibitionMockup = (situation === "before") ? (
    <div>
        <Typography className={classes.subTitle}>
          本日 3/29(日) 9:00 ~ 18:00 開催
        </Typography>
        <Typography className={classes.subTitle}>
          {description}
        </Typography>
        <Box className={classes.content}>
            <Typography className={classes.text}>
                ・3BLD Best of 3、　2ラウンド制
            </Typography>
            <Typography  className={classes.text}>
                ・第1ラウンド 9:00 ~ 13:00
            </Typography>
            <Typography  className={classes.text}>
                ・決勝ラウンド 14:00 ~ 18:00
            </Typography>
            <Typography  className={classes.text}>
                ・第1ラウンドの単発上位50%が決勝に進出
            </Typography>
            <Typography  className={classes.text}>
                ・予約不要。当日9時から参加できます。
            </Typography>
        </Box>

    </div>
  ) : (
    (situation === "round1") ? (
      (authenticated) ? (
        (post === "round1") ? (
<div>
        <Typography className={classes.subTitle}>
          9:00 ~ 13:00 第1ラウンド進行中
        </Typography>
        <Typography className={classes.subTitle}>
          参加済みです。ラウンド終了までお待ちください。
        </Typography>

        <Box className={classes.content}>
            <Typography className={classes.text}>
                ・3BLD Best of 3、　2ラウンド制
            </Typography>
            <Typography  className={classes.text}>
                ・第1ラウンド 9:00 ~ 13:00
            </Typography>
            <Typography  className={classes.text}>
                ・決勝ラウンド 14:00 ~ 18:00
            </Typography>
            <Typography  className={classes.text}>
                ・第1ラウンドの単発上位50%が決勝に進出
            </Typography>
        </Box>
    </div>
        ) : (
<div>
        <Typography className={classes.subTitle}>
          9:00 ~ 13:00 第1ラウンド進行中
        </Typography>
        <Box align="center" marginBottom="10px">
        <Button onClick={handleOpen} variant="contained"  size="large" color="primary">
                参加する
        </Button>
        </Box>
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
                  <Typography className={classes.subTitle}>
                        注意事項
                    </Typography>
                <Box textAlign="center" margin="0 30px 30px 30px">
                    <Typography className={classes.text}>
                        ・ラウンドが終了するまで試技の結果を公開しないでください<br/>（参加したことは言ってOK）
                    </Typography>
                    <Typography  className={classes.text}>
                        ・大会が終了するまで単発ベストや参加履歴は更新されません
                    </Typography>
                </Box>
                <Grid container>
                  <Grid item sm={6} xs={12} align="center">
                    <Box marginBottom="10px">
                      
                      { isMobile() ? (
                        <Button component={Link} to={`/ExibitionUseTimerPhone/breathOfSpring2020/round1`} color="primary" variant="outlined" >
                      <TimerIcon />
                      <Typography variant="h6">
                        タイマーを使用する
                        </Typography>
                    </Button>
                      ) : (
            <Button component={Link} to={`/ExibitionUseTimer/breathOfSpring2020/round1`} color="primary" variant="outlined" >
                      <TimerIcon />
                      <Typography variant="h6">
                        タイマーを使用する
                        </Typography>
                    </Button>
                      ) }
                    
                    </Box>
                  </Grid>
                  <Grid item sm={6} xs={12} align="center">
                    <Button component={Link} to={`/exibition/breathOfSpring2020/round1`} color="primary"  variant="outlined">
                      <CreateIcon />
                      <Typography variant="h6">タイムを手入力する</Typography>
                    </Button>
                  </Grid>
                </Grid>
                    <Box display="flex" justifyContent="center" marginTop="20px">
                      <Button variant="contained"  onClick={handleClose} >
                        閉じる
                      </Button>
                    </Box>
                </div>
            </Fade>
            </Modal>
        <Box className={classes.content}>
            <Typography className={classes.text}>
                ・3BLD Best of 3、　2ラウンド制
            </Typography>
            <Typography  className={classes.text}>
                ・第1ラウンド 9:00 ~ 13:00
            </Typography>
            <Typography  className={classes.text}>
                ・決勝ラウンド 14:00 ~ 18:00
            </Typography>
            <Typography  className={classes.text}>
                ・第1ラウンドの単発上位50%が決勝に進出
            </Typography>
        </Box>

    </div>

        )
      ) : (
<div>
        <Typography className={classes.subTitle}>
          9:00 ~ 13:00 第1ラウンド進行中
        </Typography>
        <Box className={classes.content}>
            <Typography className={classes.text}>
                ・3BLD Best of 3、　2ラウンド制
            </Typography>
            <Typography  className={classes.text}>
                ・第1ラウンド 9:00 ~ 13:00
            </Typography>
            <Typography  className={classes.text}>
                ・決勝ラウンド 14:00 ~ 18:00
            </Typography>
            <Typography  className={classes.text}>
                ・第1ラウンドの単発上位50%が決勝に進出
            </Typography>
        </Box>

    </div>

      )
    ) : (
      (situation === "breakTime") ? (
        <div>
        <Typography className={classes.subTitle}>
          第1ラウンドが終了しました
        </Typography>
        <div align="center">
        <Button component={Link} to="/exibitionResult/breathOfSpring2020/round1" variant="contained"
        >第1ラウンドの結果を見る</Button>
        </div>
        <Box className={classes.content}>
            <Typography className={classes.text}>
                ・3BLD Best of 3、　2ラウンド制
            </Typography>
            <Typography  className={classes.text}>
                ・第1ラウンド 9:00 ~ 13:00
            </Typography>
            <Typography  className={classes.text}>
                ・決勝ラウンド 14:00 ~ 18:00
            </Typography>
            <Typography  className={classes.text}>
                ・第1ラウンドの単発上位50%が決勝に進出
            </Typography>
        </Box>
    </div>
      ) : (
        (situation === "final") ? (
          authenticated ? (
            goToFinal ? (
              (post === "final") ? (
                <div>
                <Typography className={classes.subTitle}>
                  14:00 ~ 18:00 決勝ラウンド進行中
                </Typography>
                <Typography className={classes.subTitle}>
          参加済みです。ラウンド終了までお待ちください。
        </Typography>
        <div align="center">
        <Button component={Link} to="/exibitionResult/breathOfSpring2020/round1" variant="contained"
        >第1ラウンドの結果を見る</Button>
        </div>
                <Box className={classes.content}>
                    <Typography className={classes.text}>
                        ・3BLD Best of 3、　2ラウンド制
                    </Typography>
                    <Typography  className={classes.text}>
                        ・第1ラウンド 9:00 ~ 13:00
                    </Typography>
                    <Typography  className={classes.text}>
                        ・決勝ラウンド 14:00 ~ 18:00
                    </Typography>
                    <Typography  className={classes.text}>
                        ・第1ラウンドの単発上位50%が決勝に進出
                    </Typography>
                </Box>
            </div>

              ) : (
                <div>
                <Typography className={classes.subTitle}>
                  14:00 ~ 18:00 決勝ラウンド進行中
                </Typography>
                <Box align="center" marginBottom="10px">
        <Button onClick={handleOpen} variant="contained"  size="large" color="primary">
                参加する
        </Button>
        </Box>
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
                  <Typography className={classes.subTitle}>
                        注意事項
                    </Typography>
                <Box textAlign="center" margin="0 30px 30px 30px">
                    <Typography className={classes.text}>
                        ・ラウンドが終了するまで試技の結果を公開しないでください<br/>（参加したことは言ってOK）
                    </Typography>
                    <Typography  className={classes.text}>
                        ・大会が終了するまで単発ベストや参加履歴は更新されません
                    </Typography>
                </Box>
                <Grid container>
                  <Grid item sm={6} xs={12} align="center">
                    <Box marginBottom="10px">
                      
                      { isMobile() ? (
                        <Button component={Link} to={`/ExibitionUseTimerPhone/breathOfSpring2020/final`} color="primary" variant="outlined" >
                      <TimerIcon />
                      <Typography variant="h6">
                        タイマーを使用する
                        </Typography>
                    </Button>
                      ) : (
            <Button component={Link} to={`/ExibitionUseTimer/breathOfSpring2020/final`} color="primary" variant="outlined" >
                      <TimerIcon />
                      <Typography variant="h6">
                        タイマーを使用する
                        </Typography>
                    </Button>
                      ) }
                    
                    </Box>
                  </Grid>
                  <Grid item sm={6} xs={12} align="center">
                    <Button component={Link} to={`/exibition/breathOfSpring2020/final`} color="primary"  variant="outlined">
                      <CreateIcon />
                      <Typography variant="h6">タイムを手入力する</Typography>
                    </Button>
                  </Grid>
                </Grid>
                    <Box display="flex" justifyContent="center" marginTop="20px">
                      <Button variant="contained"  onClick={handleClose} >
                        閉じる
                      </Button>
                    </Box>
                </div>
            </Fade>
            </Modal>
            <div align="center">
        <Button component={Link} to="/exibitionResult/breathOfSpring2020/round1" variant="contained"
        >第1ラウンドの結果を見る</Button>
        </div>

                <Box className={classes.content}>
                    <Typography className={classes.text}>
                        ・3BLD Best of 3、　2ラウンド制
                    </Typography>
                    <Typography  className={classes.text}>
                        ・第1ラウンド 9:00 ~ 13:00
                    </Typography>
                    <Typography  className={classes.text}>
                        ・決勝ラウンド 14:00 ~ 18:00
                    </Typography>
                    <Typography  className={classes.text}>
                        ・第1ラウンドの単発上位50%が決勝に進出
                    </Typography>
                </Box>
            </div>

              )
            ) : (
              <div>
        <Typography className={classes.subTitle}>
          14:00 ~ 18:00 決勝ラウンド進行中
        </Typography>
        <div align="center">
        <Button component={Link} to="/exibitionResult/breathOfSpring2020/round1" variant="contained"
        >第1ラウンドの結果を見る</Button>
        </div>
        <Box className={classes.content}>
            <Typography className={classes.text}>
                ・3BLD Best of 3、　2ラウンド制
            </Typography>
            <Typography  className={classes.text}>
                ・第1ラウンド 9:00 ~ 13:00
            </Typography>
            <Typography  className={classes.text}>
                ・決勝ラウンド 14:00 ~ 18:00
            </Typography>
            <Typography  className={classes.text}>
                ・第1ラウンドの単発上位50%が決勝に進出
            </Typography>
        </Box>
    </div>

            )
          ) : (
<div>
        <Typography className={classes.subTitle}>
          14:00 ~ 18:00 決勝ラウンド進行中
        </Typography>
        <div align="center">
        <Button component={Link} to="/exibitionResult/breathOfSpring2020/round1" variant="contained"
        >第1ラウンドの結果を見る</Button>
        </div>
        <Box className={classes.content}>
            <Typography className={classes.text}>
                ・3BLD Best of 3、　2ラウンド制
            </Typography>
            <Typography  className={classes.text}>
                ・第1ラウンド 9:00 ~ 13:00
            </Typography>
            <Typography  className={classes.text}>
                ・決勝ラウンド 14:00 ~ 18:00
            </Typography>
            <Typography  className={classes.text}>
                ・第1ラウンドの単発上位50%が決勝に進出
            </Typography>
        </Box>
    </div>
          )
        ) : (
          (situation === "done") ? (
            <div>

        <Typography className={classes.subTitle}>
          2020/03/29 9:00 ~ 18:00 終了しました
        </Typography>
        <Box align="center" marginBottom="20px">
        <Button component={Link} to="/exibitionAllResults/breathOfSpring2020" variant="contained" color="primary"
        >すべての結果を見る</Button>
        </Box>
        <Typography className={classes.subTitle} >
          {description}
        </Typography>

    </div>
          ) : (
<p></p>
          )
        )
      )
    )
  )

  return (
    <div>
      <Paper className={classes.root}>
      <Box textAlign="center" marginBottom="30px">
       <img 
        alt="harukazeLogo"
        src={harukazeLogo}
        className={classes.logo}
        />
        </Box>
        {exibitionMockup}
      </Paper>
    </div>
  );
}

ExibitionHome.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(
  mapStateToProps
  )(ExibitionHome);