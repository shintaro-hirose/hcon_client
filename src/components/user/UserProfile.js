import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
// MUI stuff
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
// Icons

import GroupIcon from '@material-ui/icons/Group';
import TwitterIcon from '@material-ui/icons/Twitter';

//Redux
import { connect } from 'react-redux';
import { getUserResults } from '../../redux/actions/userActions';

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

const ratedToJapanese = (rated) => {
  if(rated === "God Eater"){
    return "ゴッドイーター"
  } else if(rated === "God"){
    return "ゴッド"
  } else if(rated === "Grand Master"){
    return "グランドマスター"
  }else if(rated === "Master"){
    return "マスター"
  } else if(rated === "Diamond"){
    return "ダイアモンド"
  } else if(rated === "Platinum"){
    return "プラチナ"
  } else if(rated === "Gold"){
    return "ゴールド"
  } else if(rated === "Silver"){
    return "シルバー"
  } else if(rated === "Bronze"){
    return "ブロンズ"
  } else if(rated === "Iron"){
    return "アイアン"
  } else if(rated === "beginner"){
    return "ビギナー"
  } else {
    return "不明な称号"
  }
}

function UserProfile(props) {
  const userData = props.userData;
  const classes = useStyles();

  return(
    <Fragment>
      <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={userData.imageUrl} alt="profile" className="profile-image" />
            </div>
            <hr />
            <div className="profile-details">
            <Typography component="div">
                <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">
                {userData.displayName}
                </Box>
              </Typography>
              <hr />
              <Typography variant="body2">レート: {userData.rating}</Typography>
              <Typography variant="body2">{ratedToJapanese(userData.rated)}</Typography>
              <hr />
              {userData.belong && (
                <Fragment>
                  <GroupIcon color="primary" /> <span>{userData.belong}</span>
                  <hr />
                </Fragment>
              )}
              {userData.twitter && (
                <Fragment>
                  <TwitterIcon color="primary" />
                  <a href={`https://twitter.com/${userData.twitter}`} target="_blank" rel="noopener noreferrer">
                    {' '}
                    {userData.twitter}
                  </a>
                  <hr />
                </Fragment>
              )}
            </div>
          </div>
        </Paper>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { getUserResults };

UserProfile.propTypes = {
  getUserResults: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UserProfile);