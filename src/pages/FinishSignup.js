import React, { useEffect } from "react";
import { finishSignup } from "../redux/actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function FinishSignup(props) {
  useEffect(() => {
    props.finishSignup();
  });
  return (
    <div>
      <p></p>
      {}
    </div>
  );
}

FinishSignup.propTypes = {
  finishSignup: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  finishSignup,
};

export default connect(mapStateToProps, mapActionsToProps)(FinishSignup);
