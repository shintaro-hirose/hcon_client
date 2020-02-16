import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import RankingTable from '../components/ranking/RankingTable';

import { connect } from 'react-redux';
// import { getAllUserSummary } from '../redux/actions/userActions';


function Rankings(props){
//   useEffect(() => {
//     props.getAllUserSummary();
//   },[]);
  const {loading} = props.user;
  let rankingMarkup = !loading ? (
              <RankingTable />
              
              ) : (<p> loading </p>);
  return (
        <React.Fragment>
          {rankingMarkup}
        </React.Fragment>
        );
}

Rankings.propTypes = {
    // getAllUserSummary: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(
  mapStateToProps
//   { getAllUserSummary }
  )(Rankings);