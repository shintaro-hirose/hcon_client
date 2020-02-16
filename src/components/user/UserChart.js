import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

import { connect } from 'react-redux';


// Generate Sales Data


const  UserChart = (props) => {
  const theme = useTheme();
  const results = props.profile.results;
  const loading = props.user.loading;

  return (
    <React.Fragment>
      <ResponsiveContainer>
        <LineChart
          data={results}
          margin={{
            top: 16,
            right: 16,
            bottom: 0
          }}
        >
          <XAxis dataKey="createdAt" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={180}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="bestTime" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

UserChart.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps
)(UserChart);