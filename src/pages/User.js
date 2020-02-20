import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

import UserBestTable from '../components/user/UserBestTable';
import UserChart from '../components/user/UserChart';
import UserProfile from '../components/user/UserProfile';
import UserStats from '../components/user/UserStats';
import Loading from '../util/Loading';

import { connect } from 'react-redux';
import { getUserResults } from '../redux/actions/userActions';


const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 240,
        width:"100%",
    padding: "10px 0",
    boxShadow: theme.shadows[5],
    margin :"10px 0 0 0"


      },
}));

const  User = (props) => {
  const classes = useStyles();

  const userHandle = props.match.params.userId;
  useEffect(() => {
    props.getUserResults(userHandle);
  }, []);

  const loading = props.user.loading;
  const userData = props.user.selectedUserData;

  return (
      <React.Fragment>
      {loading ? (
          <Loading />
      ) : (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
                <UserProfile userData={userData}/>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <UserStats userData={userData}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <UserBestTable userData={userData}/>
                    </Grid>
                </Grid>
                <Paper className={classes.paper}>
                    <UserChart userData={userData} />
                </Paper>
            </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

User.propTypes = {
    getUserResults: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };
const mapActionsToProps = { getUserResults };

const mapStateToProps = (state) => ({
    user: state.user,
  });
  
export default connect(
    mapStateToProps,
    mapActionsToProps
  )(User);