import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip'

import Button from '@material-ui/core/Button';

//harukaze-images
import sakura from '../../images/sakura.png'
import harukazeLogo from '../../images/harukaze-logo.svg';


const useStyles = makeStyles((theme) => ({
    paper: {
      width: "80%",
      marginBottom: 20,
      padding:"20px 0",
      boxShadow: theme.shadows[5],
      textAlign: "center",
      backgroundImage: `url(${sakura})`,
    },
    title: {
      fontSize: 20,
      textAlign:"center",
      padding:0,
      marginBottom:20,
      padding: '10px'
    },
    content: {
        fontSize: 20,
        padding:0,
        marginBottom:20,
        padding: '10px'
      },
    logo:{
        width: "200px",
        height: "95px",
      },
  
  }));

  const now = new Date();
now.setDate(now.getDate() -1);
let year = String(now.getFullYear());
let month = String(now.getMonth() + 1) ;
let date = String(now.getDate());
month = ('0'+ month).slice(-2);
date = ('0'+ date).slice(-2);
const contestId = year+month+date;

function ExibitionResultSummaryButton(props){
  const classes = useStyles();

  return (
        <React.Fragment>
            <Tooltip title="コンテストのページに行く">
          <Button className={classes.paper} component={Link} to={`/exibitionAllResults/breathOfSpring2020`}>
              <Grid container p={2}>
                  <Grid item sm={6} xs={12}>
                  <img 
                    alt="harukazeLogo"
                    src={harukazeLogo}
                    className={classes.logo}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                      <Typography>
                          開催日： 2020/03/29
                      </Typography>
                      <Typography>
                          参加者： 24名
                      </Typography>
                      <p> 優勝： plus さん　（優勝タイム： 39.42）</p>
                         
                  </Grid>
              </Grid>
              
          </Button>
          </Tooltip>
        </React.Fragment>
        );
}

export default ExibitionResultSummaryButton;