import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Profile from '../components/user/Profile';
import UserBestTable from '../components/user/UserBestTable';
import UserChart from '../components/user/UserChart';
import UserProfile from '../components/user/UserProfile';
import UserStats from '../components/user/UserStats';
import UserHistory from '../components/user/UserHistory';
import UserExibitionBadge from '../components/user/UserExibitionBadge';
import Loading from '../util/Loading';

import { connect } from 'react-redux';
import { getUserResults } from '../redux/actions/userActions';

const useStyles = makeStyles(theme => ({
  tab: {
        boxShadow: theme.shadows[5],
        marginBottom: "10px"

  },
}));

const  User = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const userHandle = props.match.params.userId;
  useEffect(() => {
    props.getUserResults(userHandle);
  }, [props.match.params.userId]);

  const loading = props.user.loading;
  const userData = props.user.selectedUserData;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <React.Fragment>
      {loading ? (
          <Loading />
      ) : (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <div>
              {props.user.authenticated ? ( 
                userHandle === props.user.authorizedUserSummary.userHandle ? ( <Profile /> ) : ( <UserProfile userData={userData}/>)
               ) : ( <UserProfile userData={userData}/>)
              }
              <UserExibitionBadge userData={userData}/>
              </div>
                
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.tab}>
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                  centered
                  variant="fullWidth"
                  aria-label="disabled tabs example"
                >
                  <Tab label="記録" />
                  <Tab label="成功率とDNFの原因"/>
                  <Tab label="タイムの推移" />
                </Tabs>
              </Paper>
              {value === 0 ? (
                <div>
                <UserBestTable userData={userData}/>
                <UserHistory userData={userData}/>
                </div>
              ) : (
                value === 1 ? (
                  <UserStats userData={userData}/>
                  ) : (
                  <UserChart userData={userData} />
                )
              )}
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