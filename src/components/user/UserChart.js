import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 443,
    width: "100%",
    padding: "10px 0",
    boxShadow: theme.shadows[5],
  },
  noData: {
    width: "100%",
    padding: "10px 0",
    boxShadow: theme.shadows[5],
  },
  alertText: {
    textAlign: "center",
    color: "grey",
  },
  standard: {
    textAlign: "center",
  },
}));

const UserChart = (props) => {
  const theme = useTheme();
  const results = props.userData.results;

  const classes = useStyles();

  const formattedResults = [];
  let timeTotal = 0;
  if (results && results.length !== 0) {
    results.forEach((result) => {
      if (result.bestTime !== 3600) {
        timeTotal += result.bestTime;
        formattedResults.push({
          bestTime: result.bestTime,
          createdAt: new Date(result.createdAt).getTime(),
        });
      }
    });
  }
  formattedResults.sort((a, b) => {
    if (a.createdAt < b.createdAt) return -1;
    if (a.createdAt > b.createdAt) return 1;
    return 0;
  });

  const average = timeTotal / formattedResults.length;
  let spread = 0;
  formattedResults.forEach((result) => {
    spread += (average - result.bestTime) ** 2;
  });
  const standardDeviation = Math.sqrt(spread / formattedResults.length);

  return (
    <React.Fragment>
      {props.userData.totalAttempts - props.userData.totalDnfs === 0 ? (
        <Paper className={classes.noData}>
          <Box padding="0 10px" textAlign="center">
            まだデータがありません
          </Box>
        </Paper>
      ) : (
        <div>
          <Paper className={classes.paper}>
            <Box className={classes.alertText}>
              <Typography>※全てDNFした回はグラフに反映されません</Typography>
            </Box>
            <Box className={classes.standard}>
              <Typography>平均：　{average.toFixed(2)}</Typography>
              <Typography>
                標準偏差：　{standardDeviation.toFixed(3)}
              </Typography>
            </Box>
            <ResponsiveContainer>
              <LineChart
                data={formattedResults}
                margin={{
                  top: 16,
                  right: 16,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="createdAt"
                  stroke={theme.palette.text.secondary}
                  tickFormatter={(unixTime) =>
                    new Date(unixTime).toLocaleDateString()
                  }
                  type="number"
                  domain={["dataMin", "dataMax"]}
                />
                <YAxis stroke={theme.palette.text.secondary} />
                <Line
                  name="単発ベスト"
                  type="monotoneX"
                  dataKey="bestTime"
                  stroke={theme.palette.primary.main}
                  activeDot={{ r: 8 }}
                  dot={false}
                />
                <CartesianGrid // ガイド線の表示
                  stroke="#ccc"
                  strokeDasharray="3 3"
                />
                <Tooltip
                  formatter={(value) => value.toFixed(2)}
                  labelFormatter={(props) => moment(props).format("YYYY/MM/DD")}
                  contentStyle={{ color: "#000" }}
                  itemStyle={{ color: "#000" }}
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </div>
      )}
    </React.Fragment>
  );
};

UserChart.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserChart);
