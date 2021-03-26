import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import ExibitionQualifierResultTable from "../components/exibitions/ExibitionQualifierResultTable";
import Loading from "../util/Loading";

import { connect } from "react-redux";
import { getResult } from "../redux/actions/userActions";

import sakura from "../images/sakura-background-light.png";
import harukazeLogo from "../images/harukaze-logo.svg";

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

const roundName = (roundId) => {
  if (roundId === "round1") {
    return "第1ラウンド";
  } else if (roundId === "final") {
    return "決勝";
  }
};

const ExibitionResult = (props) => {
  const classes = useStyles();
  const contestId = props.match.params.contestId;
  const roundId = props.match.params.roundId;
  const [loading, setLoading] = useState(true);
  const [contestData, setContestData] = useState({});
  let situation = "";

  if (props.user.exibitions.breathOfSpring2020) {
    situation = props.user.exibitions.breathOfSpring2020.situation;
  }

  if (situation === roundId) {
    window.location.href = "/";
  }

  useEffect(() => {
    axios
      .get(`/exibitionResult/${contestId}/${roundId}`)
      .then((res) => {
        setContestData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
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
              {roundName(roundId)}の結果
            </Typography>
            <Box textAlign="left" margin="50px 50px">
              <Box>
                <Typography variant="h6">
                  1試技目: {contestData.scrambles.first}
                </Typography>
              </Box>
              <Box margin="20px 0">
                <Typography variant="h6">
                  2試技目: {contestData.scrambles.second}
                </Typography>
              </Box>
              <Box margin="20px 0">
                <Typography variant="h6">
                  3試技目: {contestData.scrambles.third}
                </Typography>
              </Box>
            </Box>
            <Box marginBottom="20px">
              <Typography variant="h5" align="center"></Typography>
            </Box>
            <Box textAlign="center">
              <ExibitionQualifierResultTable contestData={contestData} />
            </Box>
          </Box>
        </div>
      )}
    </React.Fragment>
  );
};

ExibitionResult.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(ExibitionResult);
