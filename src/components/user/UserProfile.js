import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
// MUI stuff
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
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
              <Typography
                color="primary"
                variant="h5"
              >
                {userData.userHandle}
              </Typography>
              <hr />
              <Typography variant="body2">レート: {userData.rating}</Typography>
              <Typography variant="body2">ランク: {userData.rated}</Typography>
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