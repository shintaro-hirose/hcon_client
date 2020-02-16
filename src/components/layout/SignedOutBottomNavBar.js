import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import HomeIcon from '@material-ui/icons/Home';
//not setted Link yet

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


const SignedOutBottomNavBar = () => {
    
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    return(
        <div>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                className={classes.root}
            >
                <StyledBottomNavigationAction href="/" label="" icon={<HomeIcon />} />
                <StyledBottomNavigationAction href="/results" label="" icon={<LocalConvenienceStoreIcon />} />
                <StyledBottomNavigationAction href="/ranking" label="" icon={<FormatListNumberedIcon />} />
                
            </BottomNavigation>
        </div>

    )
}

export default SignedOutBottomNavBar;