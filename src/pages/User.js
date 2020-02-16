import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

import UserBestTable from '../components/user/UserBestTable';
import UserChart from '../components/user/UserChart';
import UserProfile from '../components/user/UserProfile';
import UserStats from '../components/user/UserStats';

import { connect } from 'react-redux';
import axios from 'axios';

import store from '../redux/store';
import { LOADING_USER, UNLOADING_USER } from '../redux/types';



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
    const [profile, setProfile] = useState({
        results: [{}],
        bestTime1:{time:3600},
        bestTime2:{time:3600},
        bestTime3:{time:3600},
        bestTime4:{time:3600},
        bestTime5:{time:3600}
    });
  const classes = useStyles();
  let handle = props.match.params.userId;
  useEffect( () => {    
    const f = () => {
        store.dispatch({ type: LOADING_USER });
        axios
        .get(`/user/${handle}`)
        .then(res => {
            setProfile(res.data);
            store.dispatch({ type: UNLOADING_USER });
        })
        .catch((err) => console.log(err));
    };

    f();

  },[]);

  const loading = props.user.loading;  
  return (
    <div>
        {(() => {
            if(loading){
                return(
                    <p>loading</p>
                );
            } else {
                return(
            <Grid container spacing={1}>
                <Grid item xs={12} sm={8}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                        <UserProfile />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <UserStats />
                        </Grid>
                    </Grid>
                    <Paper className={classes.paper}>
                        <UserChart profile={profile} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <UserBestTable profile={profile}/>
                
                </Grid>
            </Grid>
                );
            }
        })()}
    </div>
  );
}

User.propTypes = {
    user: PropTypes.object.isRequired,
  };
  
const mapStateToProps = (state) => ({
    user: state.user,
  });
  
export default connect(
    mapStateToProps
  )(User);