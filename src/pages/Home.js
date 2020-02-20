import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

// import RankingTable from '../components/ranking/RankingTable';
import Profile from '../components/user/Profile';
import ContestField from '../components/contest/ContestField';
import RankingTable from '../components/ranking/RankingTable';
import SuccessBar from '../util/SuccessBar';
import Loading from '../util/Loading';
import About from '../util/About';
import Notifications from '../util/Notifications';


import { connect } from 'react-redux';
import { getAllUserSummary } from '../redux/actions/userActions';

function Home(props){
  function f() {
    props.getAllUserSummary();
  }
  useEffect(() => {
    f();
  },[]);
  const {loading, authenticated, notifications} = props.user;

  let profileMarkup = !loading ? (
    authenticated ? (
      <Grid container spacing={2}>
            <Grid item sm={4} xs={12}>
              <Profile />
            </Grid>
            <Grid item sm={8} xs={12} >
              <ContestField />
              <RankingTable />
              <Notifications notifications={notifications}/>
            </Grid>
          </Grid>
    ) : (
      <Grid container spacing={2}>
            <Grid item sm={4} xs={12}>
              <About />
            </Grid>
            <Grid item sm={8} xs={12} >
              <ContestField />
              <RankingTable />
              <Notifications notifications={notifications}/>
            </Grid>
          </Grid>
    )
    
  ) : (<Loading />);
  return (
        <React.Fragment>
          <SuccessBar />
          {profileMarkup}
        </React.Fragment>
        );
}

Home.propTypes = {
  getAllUserSummary: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getAllUserSummary }
)(Home);