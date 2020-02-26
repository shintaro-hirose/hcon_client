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

  },
  title: {
    fontSize: 20,
    textAlign:"center",
    padding:0,
    marginBottom:20,
  },

}));

function ContestField(props) {
  const [isPostable, setIsPostable] = useState(true);
  const classes = useStyles();
  const authenticated = props.user.authenticated;
  if(isPostable){
    if(props.user.authorizedUserSummary.lastPostedDate){
      const lastPostedDate = props.user.authorizedUserSummary.lastPostedDate;
      if(contestId === lastPostedDate)  setIsPostable(false);
    }
  }
    
  let contentMarkup = authenticated ? (
    isPostable ? (
<Grid container>
      <Grid item sm={6} xs={12} align="center">
        <Box marginBottom="10px">
        <Button component={Link} to={`/contestUseTimer`} color="primary" variant="outlined" >
          <TimerIcon />
          <Typography variant="h6">
            タイマーを使用する
            </Typography>
        </Button>
        </Box>
      </Grid>
      <Grid item sm={6} xs={12} align="center">
        <Button component={Link} to={`/contest`} color="primary"  variant="outlined">
          <CreateIcon />
          <Typography variant="h6">タイムを手入力する</Typography>
        </Button>
      </Grid>
    </Grid>   
    ) : (
      <Box textAlign="center" color="#4caf50" >
          <Typography variant="h5" display="inline" fontWeight="bold">
            参加済み
            </Typography>
        </Box>
    )
     
  ) : (
      <div align="center">
        <Button component={Link} to="/login" variant="contained" color="primary"
        >ログイン</Button>
        <Typography display="inline" variant="body2">
           {"  または  "}
        </Typography>
        <Button component={Link} to="/signup" variant="contained" color="secondary"
        >登録</Button>
        <Typography display="inline" variant="body2">
           {"  して参加する  "}
        </Typography>
      </div>
  );
  return (
    <Paper className={classes.root}>
        <Typography className={classes.title}>
          {year}/{month}/{date} のコンテスト開催中
        </Typography>
        {contentMarkup}
    </Paper>
  );
}

ContestField.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(
  mapStateToProps
  )(ContestField);