import React from 'react';

import Hidden from '@material-ui/core/Hidden'
import SignedInBottomNavBar from './SignedInBottomNavBar';
import SignedOutBottomNavBar from './SignedOutBottomNavBar';

const BottomNavBar = () => {
    return(
        <Hidden smUp>
            <SignedInBottomNavBar />
            {/* <SignedOutBottomNavBar /> */}
        </Hidden>
    )
}

export default BottomNavBar;