import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import NoImg from '../images/no-img.png';
// MUI stuff
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  paper: {
    width:"100%",
    padding: "10px 0",
    boxShadow: theme.shadows[5],

  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 100,
      height: 100,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  }
}));

function ProfileSkelton(props) {  
  const classes = useStyles();

  return(
    <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={NoImg} alt="profile" className="profile-image" />
            </div>
            <hr />
            <div className="profile-details">
              <Typography
                color="inherit"
                variant="h6"
              >
                ゲスト ユーザー
              </Typography>
              <hr />
            </div>
          </div>
    </Paper>
  )
}

export default ProfileSkelton;