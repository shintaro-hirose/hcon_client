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

  return (
    <Paper className={classes.root}>
        <Typography className={classes.title}>
          春風杯2020
        </Typography>
        <Typography className={classes.subTitle} style={{color:'gray', fontSize:'15px'}}>
          <del>3/21(土) 9:00 ~ 18:00 開催予定</del>
          
        </Typography>
        <Typography className={classes.subTitle}>
          <u>3/29(日) 9:00 ~ 18:00 に予定変更しました</u>
          
          
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
            <Typography  className={classes.text}>
                ※予定スケジュールは前後することがあります
            </Typography>
        </Box>

    </Paper>
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