import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import DescriptionIcon from '@material-ui/icons/Description';
import HomeIcon from '@material-ui/icons/Home';
import { Link,withRouter } from 'react-router-dom';


const useStyles = makeStyles({
    wrapper:{
        display: 'block',
        width: '100%',
        position: 'fixed',
        left: 0,
        bottom: 0,
        zIndex: 1000,
        textAlign: 'center',
      },
      button: {
        maxWidth: '100%',
        minWidth: "0",
        color: "#bdbdbd",

    },
  });

  const now = new Date();
now.setDate(now.getDate() -1);
let year = String(now.getFullYear());
let month = String(now.getMonth() + 1) ;
let date = String(now.getDate());
month = ('0'+ month).slice(-2);
date = ('0'+ date).slice(-2);
const contestId = year+month+date;


const SignedOutBottomNavBar = (props) => {
    
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    return(
        <div className={classes.wrapper}>
            <BottomNavigation
                value={props.location.pathname}
                
            >
                <BottomNavigationAction component={Link} value="/" to="/" label="" icon={<HomeIcon />} className={classes.button}/>
                <BottomNavigationAction component={Link} value={`/result/${contestId}`} to={`/result/${contestId}`} label="" icon={<DescriptionIcon />} className={classes.button}/>
                <BottomNavigationAction component={Link} value="/ranking" to="/ranking" label="" icon={<FormatListNumberedIcon />} className={classes.button}/>
                
            </BottomNavigation>
        </div>

    )
}

export default withRouter(SignedOutBottomNavBar);