// Libraries
import React from 'react';


// Material UI
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Copyright = () => {
    return (
        <Typography variant="body2" color="inherit" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.linkedin.com/in/suatbayir/">
                Suat Bayır
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;