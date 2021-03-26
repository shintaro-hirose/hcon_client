import React from "react";

import Hidden from "@material-ui/core/Hidden";
import SignedInBottomNavBar from "./SignedInBottomNavBar";
import SignedOutBottomNavBar from "./SignedOutBottomNavBar";

import { connect } from "react-redux";
import PropTypes from "prop-types";

const BottomNavBar = (props) => {
  const authenticated = props.authenticated;
  const user = props.authorizedUserSummary.userHandle;
  return (
    <Hidden smUp>
      {authenticated ? (
        <SignedInBottomNavBar user={user} />
      ) : (
        <SignedOutBottomNavBar />
      )}
    </Hidden>
  );
};

BottomNavBar.propTypes = {
  authorizedUserSummary: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authorizedUserSummary: state.user.authorizedUserSummary,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(BottomNavBar);
