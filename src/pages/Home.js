import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
//components
import Profile from '../components/user/Profile';
import ContestField from '../components/contest/ContestField';
import RankingTable from '../components/ranking/RankingTable';
import Loading from '../util/Loading';
import About from '../util/About';
import Notifications from '../util/Notifications';
import TweetModal from '../util/TweetModal';
// import Updates from '../util/Updates';
import Contact from '../util/Contact';
import Policy from '../util/Policy';
// import ExibitionHome from '../components/exibitions/ExibitionHome'

//redux
import { connect } from 'react-redux';
import { getAllUserSummary, getAuthenticatedUserSummary } from '../redux/actions/userActions';
import { closeTweetModal } from '../redux/actions/uiActions';

//firestore
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'


function Home(props){
  const {loading, authenticated} = props.user;
  useFirestoreConnect([
    { collection: 'notifications',
    orderBy: ['createdAt', 'desc'],
    limit: 10
   } 
  ])
  const notifications = useSelector(state => state.firestore.ordered.notifications)
  function f() {
    if(authenticated) props.getAuthenticatedUserSummary();
    if(props.user.userSummaries.length != 0) return;
    props.getAllUserSummary();
    
  }
  useEffect(() => {
    f();
  },[]);

  let profileMarkup = !loading ? (
    authenticated ? (
      <Grid container spacing={2}>
            <Grid item sm={4} xs={12}>
              <Profile />
              {/* <Updates /> */}
              <Hidden xsDown>
                <Contact />
                <Policy />
              </Hidden>
            </Grid>
            <Grid item sm={8} xs={12} >
              <ContestField />
              {/* <ExibitionHome /> */}
              <RankingTable />
              <Notifications notifications={notifications}/>
              <Hidden smUp>
                <Contact />
                <Policy />
              </Hidden>
            </Grid>
          </Grid>
    ) : (
      <Grid container spacing={2}>
            <Grid item sm={4} xs={12}>
              <About />
              {/* <Updates /> */}
              <Hidden xsDown>
                <Contact />
                <Policy />
              </Hidden>
            </Grid>
            <Grid item sm={8} xs={12} >
              <ContestField />
              {/* <ExibitionHome /> */}

              <RankingTable />
              <Notifications notifications={notifications}/>
              <Hidden smUp>
                <Contact />
                <Policy />
              </Hidden>
            </Grid>
          </Grid>
    )
    
  ) : (<Loading />);
  return (
        <React.Fragment>
          {profileMarkup}
          <TweetModal
          contestId={props.user.contest.contestId}
          modalOpen={props.UI.openTweetModal}
          modalClose={props.closeTweetModal}
          />
        </React.Fragment>
        );
}

Home.propTypes = {
  getAllUserSummary: PropTypes.func.isRequired,
  getAuthenticatedUserSummary: PropTypes.func.isRequired,
  closeTweetModal: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(
    mapStateToProps,
  { getAllUserSummary, getAuthenticatedUserSummary, closeTweetModal }
  )(Home);