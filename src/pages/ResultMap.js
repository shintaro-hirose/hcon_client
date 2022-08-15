import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ExibitionResultSummaryButton from "../components/exibitions/ExibitionResultSummaryButton";

import harukazeLogo from "../images/harukaze-logo.svg";
import OTAWarmupLogo from "../images/OTAWarmupLogo.svg"
import YOGA2022Logo from "../images/YOGA2022Logo.svg"

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    marginBottom: 20,
    padding: "20px 0",
    boxShadow: theme.shadows[5],
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 0,
    marginBottom: 20,
    padding: "10px",
  },
  content: {
    fontSize: 15,
    textAlign: "center",
    padding: 0,
    marginBottom: 20,
    padding: "10px",
  },
  todaysResultButton: {
    textAlign: "center",
    border: "solid 2px green",
    color: "green",
    borderRadius: "10px",
    padding: "10px 30px",
  },
}));

const now = new Date();
now.setDate(now.getDate() - 1);
let year = String(now.getFullYear());
let month = String(now.getMonth() + 1);
let date = String(now.getDate());
month = ("0" + month).slice(-2);
date = ("0" + date).slice(-2);
const contestId = year + month + date;

function ResultMap(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>平常コンテスト</Typography>
        <Typography className={classes.content}>
          毎日24:00に更新される日々のコンテスト
        </Typography>
        <Button
          component={Link}
          to={`/result/${contestId}`}
          variant="outlined"
        >
          <Typography variant="h6">昨日の結果を確認する</Typography>
        </Button>
      </Paper>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>特別開催コンテスト</Typography>
        <Typography className={classes.content}>
          不定期で開催される特別大会！
        </Typography>
        <ExibitionResultSummaryButton 
        resultUrl="/result/20220814"
        logoAlt="YOGA2022Logo"
        logoSrc={YOGA2022Logo}
        backgroundColor="#ffe0b2"
        dayText="開催日： 2022/08/14"
        partText="参加者： 33名"
        winText=" 優勝： たけい さん"
        timeText="（優勝タイム： 29.29）"
        />
        <ExibitionResultSummaryButton 
        resultUrl="/result/20220723"
        logoAlt="OTAWarmupLogo"
        logoSrc={OTAWarmupLogo}
        backgroundColor="#b2ebf2"
        dayText="開催日： 2022/07/23"
        partText="参加者： 19名"
        winText=" 優勝： うえしゅう さん"
        timeText="（優勝タイム： 50.20）"
        />
        <ExibitionResultSummaryButton 
        resultUrl="/exibitionAllResults/breathOfSpring2020"
        logoAlt="harukazeLogo"
        logoSrc={harukazeLogo}
        backgroundColor="#fce4ec"
        dayText="開催日： 2020/03/29"
        partText="参加者： 24名"
        winText=" 優勝： plus さん"
        timeText="（優勝タイム： 39.42）"
        />
      </Paper>
    </React.Fragment>
  );
}

export default ResultMap;
