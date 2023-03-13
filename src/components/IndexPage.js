import React, { useState, useContext, useEffect } from 'react';
import ReactPlayer from 'react-player/file';
import makeStyles from '@mui/styles/makeStyles';
import AppContext from '../context/AppContext';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
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
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    },
    previewContainer: {
        // [theme.breakpoints.down('md')]: {
        //     display: 'none',
        // },
        // [theme.breakpoints.up('md')]: {

            height: '60%',
            flexGrow: 1,
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
        // }
    },
    viewWindow: {
        maxHeight: '60%',
        maxWidth: '80%',
        margin: 'auto',
        borderRadius: '20px',
    },
    bottomBox: {
        zIndex: 1,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'auto',
        maxHeight: '100%',
        overflowY: 'auto',
        padding: '24px 32px 32px 32px',
        zIndex: 1,
    },
    projectRow: {
        width: '100%',
        height: '15%',
        padding: '2px 0',

    }
}));


export const IndexPage = props => {

    const { state } = useContext(AppContext);
    const { projects } = state;

    const classes = useStyles();

    let navigate = useNavigate();
    
    const showPreview = useMediaQuery('(min-width:600px)');
    
    const [hover, setHover] = useState('');
    // const featuredUrl = projects.some(proj => proj.projectName == hover) ? projects[projects.indexOf(proj => proj.projectName == hover)]?.featured.data.attributes.url : '';
    const [featuredUrl, setFeaturedUrl] = useState('');
    console.log(featuredUrl);
    useEffect(() => {
        if (hover !== '') {
            if (projects.some(proj => proj.projectName === hover)){
                let proj = projects[projects.findIndex((proj) => proj.projectName === hover)];
                if (proj.featured) {
                    let url = proj.featured.data.attributes.url;
                    setFeaturedUrl(url);
                }
            }
        }
    }, [hover])

    const goTo = (route) => {
        navigate(`../project/${route}`, { replace: true });
    } 

    return (
        // <div className={classes.root}>
        <div className={classes.viewContainer}>
            <div className={classes.bottomBox}>
                {projects.map(proj => {
                    return (
                        <div onMouseEnter={(e) => setHover(proj.projectName)} onMouseLeave={(e) => setHover('')} onClick={() => goTo(proj.name)}>
                            <Grid container direction='row' alignItems="center" key={proj.projectName} className={classes.projectRow}>
                                <Grid item xs={6} md={4} align="left">
                                    <Typography style={{fontFamily: 'Square721'}}>{proj.projectName}</Typography>
                                </Grid>
                                <Grid item xs={3} md={4} align="left">
                                    <Typography style={{fontFamily: 'Square721'}}>{proj.code}</Typography>
                                </Grid>
                                <Grid item xs={3} md={4} align="left">
                                    <Typography style={{fontFamily: 'Square721'}}>{proj.role}</Typography>
                                </Grid>
                            </Grid>
                        </div>
                    )
                })}
            </div>
            <div className={classes.previewContainer} style={{ display: showPreview ? 'flex' : 'none'}}>
                {hover != '' && featuredUrl !== ''
                    ? (
                        <div className={classes.viewWindow}>
                            <ReactPlayer
                            style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: '20px' }}
                            url={`http://localhost:1337${featuredUrl}`}
                            // width='100%'
                            // height='100%'
                            playing
                            loop
                            muted
                        />
                        </div>
                    ) : null}

            </div>
        </div>
        // </div>
    )
};

export default IndexPage;