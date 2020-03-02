import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
// MUI stuff
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
// Icons
import GroupIcon from '@material-ui/icons/Group';
import TwitterIcon from '@material-ui/icons/Twitter';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//ratedIcons;
// import bronze from '../../images/bronze.png';
// import diamond from '../../images/diamond.png';
// import god from '../../images/god.png';
// import gold from '../../images/gold.png';
// import grandmaster from '../../images/grandmaster.png';
// import iron from '../../images/iron.png';
// import master from '../../images/master.png';
// import platinum from '../../images/platinum.png';

//Redux
import { connect } from 'react-redux';
import { uploadImage } from '../../redux/actions/userActions';
import LogoutModal from '../../util/LogoutModal';

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
        top: '60%',
        left: '65%'
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
  },
  ratedIcon: {
    width: 40,
      height: 40,
      borderRadius: '50%',
      verticalAlign: 'middle'
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

function Profile(props) {
  const [open, setOpen] = useState(false);
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
    setOpen(true)
  };
  
  const classes = useStyles();
    const {
      user: {
        authorizedUserSummary: { displayName, imageUrl, rating,  belong, twitter, rated },
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
                tip="プロフィール画像を変更する"
                onClick={handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <Box>
              <Typography component="div">
                <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">
                {displayName}
                </Box>
              </Typography>
              </Box>
              <hr />
              <Typography variant="h6">レート: {rating}</Typography>
              <Typography component="div">
                <Box fontWeight="fontWeightLight">
                  {ratedToJapanese(rated)}
                </Box>
              </Typography>
              <hr />
              {belong && (
                <Fragment>
                  <GroupIcon color="primary" /> <span>{belong}</span>
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
            <MyButton tip="ログアウト" onClick={handleLogout}>
              <KeyboardReturn color="primary" />
            </MyButton>
            <LogoutModal open={open} setOpen={setOpen}/>
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

const mapActionsToProps = { uploadImage };

Profile.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)((Profile));