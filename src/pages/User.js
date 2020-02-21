import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import UserBestTable from '../components/user/UserBestTable';
import UserChart from '../components/user/UserChart';
import UserProfile from '../components/user/UserProfile';
import UserStats from '../components/user/UserStats';
import Loading from '../util/Loading';

import { connect } from 'react-redux';
import { getUserResults } from '../redux/actions/userActions';

const useStyles = makeStyles(theme => ({
  paper: {
    width:"100%",
    boxShadow: theme.shadows[5],
    marginTop: "10px",
  },
}));

const  User = (props) => {
  const classes = useStyles();
  const [active, setActive] = useState(1);
  const userHandle = props.match.params.userId;
  useEffect(() => {
    props.getUserResults(userHandle);
  }, []);

  const loading = props.user.loading;
  const userData = props.user.selectedUserData;
  const handleActiveChange1 = () => {
    setActive(1);
  };
  const handleActiveChange2 = () => {
    setActive(2);
  };
  const handleActiveChange3 = () => {
    setActive(3);
  };

  return (
      <React.Fragment>
      {loading ? (
          <Loading />
      ) : (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
                <UserProfile userData={userData}/>
                <Paper className={classes.paper}>
                  <List component="nav" aria-label="setting selector">
                      <ListItem button onClick={handleActiveChange1} selected={active === 1}>
                          <ListItemText primary="単発ベスト5" />
                      </ListItem>
                      <ListItem button onClick={handleActiveChange2} selected={active === 2}>
                          <ListItemText primary="成功率とDNFの原因" />
                      </ListItem>
                      <ListItem button onClick={handleActiveChange3} selected={active === 3}>
                          <ListItemText primary="単発ベストの推移" />
                      </ListItem>
                  </List>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              {active === 1 ? (
                <UserBestTable userData={userData}/>
              ) : (
                active === 2 ? (
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