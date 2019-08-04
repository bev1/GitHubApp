import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles({
    splashWrapper: {
      background: 'linear-gradient(45deg, rgba(30,87,153,0) 0%, rgba(30,87,153,0.8) 15%, rgba(30,87,153,1) 19%, rgba(30,87,153,1) 20%, rgba(41,137,216,1) 50%, rgba(30,87,153,1) 80%, rgba(30,87,153,1) 81%, rgba(30,87,153,0.8) 85%, rgba(30,87,153,0) 100%)',
      position: 'relative',
      width: '100%',
      height: '100vh',
      color: 'white',
    },
    splashText: {
        position: 'absolute',
        top: "50%",
        left: "50%",
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Acme',
        fontSize: '40px',
        textAlign: 'center',   
    },
  });

const SplashScreen = (props) => {
const classes = useStyles();
    return(
        <Fade in={props.splashScreen} style={{ transitionDelay: props.splashScreen ? '500ms' : '0ms' }}>
        <div className={classes.splashWrapper}>
            <div className={classes.splashText}>
                <Zoom in={props.splashScreen} style={{ transitionDelay: props.splashScreen ? '800ms' : '0ms' }}>
                <p>GitHub App</p>
                </Zoom>
                <Zoom in={props.splashScreen} style={{ transitionDelay: props.splashScreen ? '1100ms' : '0ms' }}>
                <p>Boyko Evgeniy</p>
                </Zoom>
            </div>
        </div>
        </Fade>
    )
}

export default SplashScreen