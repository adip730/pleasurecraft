import React, { useState, useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';

import ProjectPage from './ProjectPage';


const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        // alignItems: 'center',
      },
      scrollView: {
        width: '100%',
        height: '100vh',
        scrollSnapType: 'y mandatory',
        overflowY: 'scroll',
      },
    viewContainer: {
        position: 'relative',
        height: '100vh',
        width: '100vw',
        border: '3px solid green',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c9c9c9',
        padding: 0,
        scrollSnapAlign: 'start',
    }
}));



export const HomePage = props => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.scrollView}>

            <div className={classes.viewContainer}>
                <p>
                    Spinning Logo goes here
                </p>
            </div>
            <div className={classes.viewContainer}>
                <ProjectPage viewMode={'landing'} name={'your project 1'}/>
            </div>
            <div className={classes.viewContainer}>
                <ProjectPage viewMode={'landing'} name={'your project 2'}/>
            </div>
            </div>
        </div>
    )
};

export default HomePage;