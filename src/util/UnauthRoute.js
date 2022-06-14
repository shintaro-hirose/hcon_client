import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UnauthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

UnauthRoute.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(UnauthRoute);
