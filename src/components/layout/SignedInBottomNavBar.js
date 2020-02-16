import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import HomeIcon from '@material-ui/icons/Home';
import { Link,withRouter } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      width: '95%',
      position:'fixed',
      bottom:0,
    },
  });

const StyledBottomNavigationAction = withStyles({
    root:{
        width:'25%',
        minWidth:'10px',
    },
    label:{
        transitionDelay:'0.1s',
    }

})(BottomNavigationAction);


const SignedInBottomNavBar = (props) => {
    const classes = useStyles();
    return(
        <div>
            <BottomNavigation
                value={props.location.pathname}
                className={classes.root}
            >
        
                <StyledBottomNavigationAction component={Link} value="/" to="/" label="" icon={<HomeIcon />} />
                <StyledBottomNavigationAction component={Link} value="/results" to="/results" label="" icon={<LocalConvenienceStoreIcon />} />
                <StyledBottomNavigationAction component={Link} value="/ranking" to="/ranking" label="" icon={<FormatListNumberedIcon />} />
                <StyledBottomNavigationAction component={Link} value="/user" to="/user" label="" icon={<AccountCircleIcon />} />
                <StyledBottomNavigationAction component={Link} value="/settings" to="/settings" label="" icon={<SettingsIcon />} />
                
            </BottomNavigation>
        </div>

    )
}

export default withRouter(SignedInBottomNavBar);