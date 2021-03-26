import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import ResultTable from "../components/results/ResultTable";
import ExibitionResultTable from "../components/exibitions/ExibitionResultTable";

import Loading from "../util/Loading";

import sakura from "../images/sakura-background-light.png";
import harukazeLogo from "../images/harukaze-logo.svg";

import { connect } from "react-redux";
import { getResult } from "../redux/actions/userActions";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${sakura})`,
  },
  logo: {
    width: "300px",
    height: "140px",
  },
}));

const ExibitionAllResults = (props) => {
  const classes = useStyles();
  const contestId = props.match.params.contestId;
  const [loading, setLoading] = useState(true);
  const [contestData1, setContestData1] = useState({});
  const [contestData2, setContestData2] = useState({});

  useEffect(() => {
    axios
      .get(`/exibitionResult/${contestId}/round1`)
      .then((res) => {
        setContestData1(res.data);
      })
      .then(() => {
        axios
          .get(`/exibitionResult/${contestId}/final`)
          .then((res) => {
            setContestData2(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Box className={classes.root}>
            <Box textAlign="center" marginBottom="30px">
              <img
                alt="harukazeLogo"
                src={harukazeLogo}
                className={classes.logo}
              />
            </Box>

            <Typography variant="h5" align="center">
              決勝の結果
            </Typography>

            <Box textAlign="left" margin="50px 50px">
              <Box>
                <Typography variant="h6">
                  1試技目: {contestData2.scrambles.first}
                </Typography>
              </Box>
              <Box margin="20px 0">
                <Typography variant="h6">
                  2試技目: {contestData2.scrambles.second}
                </Typography>
              </Box>
              <Box margin="20px 0">
                <Typography variant="h6">
                  3試技目: {contestData2.scrambles.third}
                </Typography>
              </Box>
            </Box>
            <Box textAlign="center">
              <ExibitionResultTable contestData={contestData2} />
            </Box>
            <Box textAlign="center" marginTop="50px">
              <Typography variant="h5" align="center">
                {" "}
                第1ラウンドの結果
              </Typography>
            </Box>
            <Box textAlign="left" margin="50px 50px">
              <Box>
                <Typography variant="h6">
                  1試技目: {contestData1.scrambles.first}
                </Typography>
              </Box>
              <Box margin="20px 0">
                <Typography variant="h6">
                  2試技目: {contestData1.scrambles.second}
                </Typography>
              </Box>
              <Box margin="20px 0">
                <Typography variant="h6">
                  3試技目: {contestData1.scrambles.third}
                </Typography>
              </Box>
            </Box>
            <Box textAlign="center">
              <ResultTable contestData={contestData1} />
            </Box>
          </Box>
        </div>
      )}
    </React.Fragment>
  );
};

ExibitionAllResults.propTypes = {
  getResult: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  getResult,
};

export default connect(mapStateToProps, mapActionsToProps)(ExibitionAllResults);
