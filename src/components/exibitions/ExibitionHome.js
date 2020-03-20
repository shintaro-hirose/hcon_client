import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TimerIcon from '@material-ui/icons/Timer';
import CreateIcon from '@material-ui/icons/Create';

import sakura from '../../images/sakura.png'

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
    padding:"20px 0",
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
    padding: "0 20px"

  },
  content:{
      textAlign: "center",
      fontSize: 20,
      flexGrow: 1,
      margin: '10px'

  },
  text:{
      margin: '10px 0'
  }

}));

function ExibitionHome(props) {
  const [isPostable, setIsPostable] = useState(true);
  const classes = useStyles();
  const authenticated = props.user.authenticated;
  let post; 
  let situation;
  let description;
  let goToFinal = false;


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
    <Paper className={classes.root}>
        <Typography className={classes.title}>
          春風杯2020
        </Typography>
        <Typography className={classes.subTitle}>
          3/21(土) 9:00 ~ 18:00 開催予定
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

    </Paper>
  ) : (
    (situation === "round1") ? (
      (authenticated) ? (
        (post === "round1") ? (
<Paper className={classes.root}>
        <Typography className={classes.title}>
          春風杯2020
        </Typography>
        <Typography className={classes.subTitle}>
          9:00 ~ 13:00 第1ラウンド進行中
        </Typography>
        <Typography className={classes.subTitle}>
          参加済みです。ラウンド終了までお待ちください。
        </Typography>
        <div align="center">
        <Button component={Link} to="/login" variant="contained" 
        >参加状況を見る</Button>
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
    </Paper>
        ) : (
<Paper className={classes.root}>
        <Typography className={classes.title}>
          春風杯2020
        </Typography>
        <Typography className={classes.subTitle}>
          9:00 ~ 13:00 第1ラウンド進行中
        </Typography>
        <Box align="center" marginBottom="10px">
        <Button component={Link} to="/login" variant="contained" color="primary"
        >参加する</Button>
        </Box>
        <div align="center">
        <Button component={Link} to="/login" variant="contained" 
        >参加状況を見る</Button>
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

    </Paper>

        )
      ) : (
<Paper className={classes.root}>
        <Typography className={classes.title}>
          春風杯2020
        </Typography>
        <Typography className={classes.subTitle}>
          9:00 ~ 13:00 第1ラウンド進行中
        </Typography>
        <div align="center">
        <Button component={Link} to="/login" variant="contained"
        >参加状況を見る</Button>
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

    </Paper>

      )
    ) : (
      (situation === "breakTime") ? (
        <Paper className={classes.root}>
        <Typography className={classes.title}>
          春風杯2020
        </Typography>
        <Typography className={classes.subTitle}>
          第1ラウンドが終了しました
        </Typography>
        <div align="center">
        <Button component={Link} to="/login" variant="contained"
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
    </Paper>
      ) : (
        (situation === "round2") ? (
          authenticated ? (
            goToFinal ? (
              (post === "round2") ? (
                <Paper className={classes.root}>
                <Typography className={classes.title}>
                  春風杯2020
                </Typography>
                <Typography className={classes.subTitle}>
                  14:00 ~ 18:00 決勝ラウンド進行中
                </Typography>
                <Typography className={classes.subTitle}>
          参加済みです。ラウンド終了までお待ちください。
        </Typography>
                <div align="center">
                <Button component={Link} to="/login" variant="contained" 
                >参加状況を見る</Button>
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
            </Paper>
        
              ) : (
                <Paper className={classes.root}>
                <Typography className={classes.title}>
                  春風杯2020
                </Typography>
                <Typography className={classes.subTitle}>
                  14:00 ~ 18:00 決勝ラウンド進行中
                </Typography>
                <Box align="center" marginBottom="10px">
                <Button component={Link} to="/login" variant="contained" color="primary"
                >参加する</Button>
                </Box>
                <div align="center">
                <Button component={Link} to="/login" variant="contained" 
                >参加状況を見る</Button>
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
            </Paper>
        
              )
            ) : (
              <Paper className={classes.root}>
        <Typography className={classes.title}>
          春風杯2020
        </Typography>
        <Typography className={classes.subTitle}>
          14:00 ~ 18:00 決勝ラウンド進行中
        </Typography>
        <div align="center">
        <Button component={Link} to="/login" variant="contained" 
        >参加状況を見る</Button>
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
    </Paper>

            )
          ) : (
<Paper className={classes.root}>
        <Typography className={classes.title}>
          春風杯2020
        </Typography>
        <Typography className={classes.subTitle}>
          14:00 ~ 18:00 決勝ラウンド進行中
        </Typography>
        <div align="center">
        <Button component={Link} to="/login" variant="contained" 
        >参加状況を見る</Button>
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
    </Paper>
          )
        ) : (
          (situation === "done") ? (
            <Paper className={classes.root}>
        <Typography className={classes.title}>
          春風杯2020
        </Typography>
        <Typography className={classes.subTitle}>
          2020/03/21 9:00 ~ 18:00 終了しました
        </Typography>
        <Box align="center" marginBottom="20px">
        <Button component={Link} to="/login" variant="contained" color="primary"
        >すべての結果を見る</Button>
        </Box>
        <Typography className={classes.subTitle} >
          {description}
        </Typography>
        
    </Paper>
          ) : (
<p></p>
          )
        )
      )
    )
  )

  return (
    <div>
      {exibitionMockup}
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