import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import RankingTable from '../components/ranking/RankingTable';
import RatingDescription from '../components/ranking/RatingDescription';
import Loading from '../util/Loading'

import { connect } from 'react-redux';
// import { getAllUserSummary } from '../redux/actions/userActions';


function Rankings(props){
//   useEffect(() => {
//     props.getAllUserSummary();
//   },[]);
  const {loading} = props.user;
  let rankingMarkup = !loading ? (
            <div>
              <Box display="flex" justifyContent="flex-end" margin="0 10px 10px 0">
              <RatingDescription />
              </Box>
              <RankingTable />
            </div>
              
              ) : (<Loading />);
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