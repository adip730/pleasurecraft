import React, { useState, useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';


const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        alignItems: 'center',
    },
    content: {
        height: '100vh',
        width: '100vw',
        border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    featured: {
        height: '45%',
        width: '65%',
        marginRight: 'auto',
        marginLeft: 'auto',
        border: '1px solid blue',
        borderRadius: '40px',
        marginBottom: '8px',
    },
    slideshowContainer: {

    },
    descSubtitle: {
        width: '65%',
        marginRight: 'auto',
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    descFooter: {

    },
}));


export const ProjectPage = props => {

    const { viewMode, name } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={classes.featured}>
                    featured image goes here
                </div>
                <div className={classes.descSubtitle}>
                    Subtitle for <b>{name}</b> goes here
                </div>
            </div>
        </div>
    )
};

export default ProjectPage;