import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import PropTypes from "prop-types";
//components
import Profile from "../components/user/Profile";
import ContestField from "../components/contest/ContestField";
import RankingTable from "../components/ranking/RankingTable";
import Loading from "../util/Loading";
import About from "../util/About";
import Notifications from "../util/Notifications";
import TweetModal from "../util/TweetModal";
import ExhibitionField from "../components/exibitions/ExhibitionField";
// import Updates from '../util/Updates';
import Contact from "../util/Contact";
import Policy from "../util/Policy";

//redux
import { connect } from "react-redux";
import {
  getAllUserSummary,
  getAuthenticatedUserSummary,
  getNotifications,
  getAppState,
} from "../redux/actions/userActions";
import { closeTweetModal } from "../redux/actions/uiActions";

function Home(props) {
  const { loading, authenticated, notifications, appState} = props.user;
  function f() {
    if (authenticated) props.getAuthenticatedUserSummary();
    props.getNotifications();
    if(appState.status == "") props.getAppState();
    if (props.user.userSummaries.length == 0) props.getAllUserSummary();

  }
  useEffect(() => {
    f();
  }, []);

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
        <Grid item sm={8} xs={12}>
          <ExhibitionField appState={appState}/>
          <ContestField />
          <RankingTable />
          <Notifications notifications={notifications} />
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
        <Grid item sm={8} xs={12}>
          <ExhibitionField appState={appState}/>
          <ContestField />
          <RankingTable />
          <Notifications notifications={notifications} />
          <Hidden smUp>
            <Contact />
            <Policy />
          </Hidden>
        </Grid>
      </Grid>
    )
  ) : (
    <Loading />
  );
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
  getNotifications: PropTypes.func.isRequired,
  getAppState: PropTypes.func.isRequired,
  closeTweetModal: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, {
  getAllUserSummary,
  getAuthenticatedUserSummary,
  getNotifications,
  closeTweetModal,
  getAppState,
})(Home);
