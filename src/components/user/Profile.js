import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
// MUI stuff
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import TwitterIcon from '@material-ui/icons/Twitter';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

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

function Profile(props) {
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    props.uploadImage(formData);
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  const handleLogout = () => {
    props.logoutUser();
  };
  
  const classes = useStyles();
    const {
      user: {
        authorizedUserSummary: { userHandle, imageUrl, rating,  belong, twitter },
        loading,
        authenticated
      }
    } = props;

  return(
    <Fragment>
      {
        (() => {
          if(!loading){
            if(authenticated){
              return(
<Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={handleImageChange}
              />
              <MyButton
                tip="Edit profile picture"
                onClick={handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/user/${userHandle}`}
                color="primary"
                variant="h5"
              >
                {userHandle}
              </MuiLink>
              <hr />
              {rating && <Typography variant="body2">Rating: {rating}</Typography>}
              <hr />
              {belong && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{belong}</span>
                  <hr />
                </Fragment>
              )}
              {twitter && (
                <Fragment>
                  <TwitterIcon color="primary" />
                  <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer">
                    {' '}
                    {twitter}
                  </a>
                  <hr />
                </Fragment>
              )}
            </div>
            <MyButton tip="Logout" onClick={handleLogout}>
              <KeyboardReturn color="primary" />
            </MyButton>
            <EditDetails />
          </div>
        </Paper>
              );
            } else {
              return(
                <p>loading</p>
              );
            }
          } else {
            return(
              <p>loading</p>
            );
          }
        })()
      }
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)((Profile));