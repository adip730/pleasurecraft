import React, { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player/file";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: useMediaQuery("(min-width: 600px)") ? "120px 64px" : "0px",
  },
  wrapper: {
    height: "100%",
    minWidth: "100%",
    aspectRatio: 16 / 9,
    borderRadius: "40px",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    transition: "width .75s",
    cursor: "pointer",
  },
  window: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "all .5s",
    justifyContent: useMediaQuery("(min-width: 600px)") ? "" : "flex-start",
    paddingTop: useMediaQuery("(min-width: 600px)") ? "0" : "80px",
    position: "sticky",
    top: "13.33%",
    bottom: "13.33%",
    // height: useMediaQuery("(min-width:600px)") ? "65%" : '100%',
    height: "100%",
    width: "100%",
    // width: useMediaQuery("(min-width:600px)") ? "85%" : '100%',
    overflow: "hidden",
  },
  cont: {
    height: useMediaQuery("(min-width:600px)") ? "100%" : "75%",
    width: "85%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: "40px",
  },
  subtitle: {
    marginTop: "8px",
    position: "absolute",
    bottom: useMediaQuery("(min-width:600px)") ? 0 : 80,
    flexGrow: 1,
    width: "85%",
    maxWidth: "85%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "display 1s",
  },
}));

const endpoint = process.env.REACT_APP_STRAPIURL;

export const Preview = (props) => {
  const { data, scrollPos, index, options } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const { api } = useContext(AppContext);
  const { setShowNav } = api;

  const [featuredUrl, setFeaturedUrl] = useState("");

  const {
    projectName,
    name,
    role,
    client,
    director,
    code,
    featured,
  } = data;

  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    let featUrl = featured.data.attributes.url;
    setFeaturedUrl(featUrl);
  }, []);

  const switchView = () => {
    navigate(`project/${data.name}`);
  };

  const largeScreen = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    let observer = new IntersectionObserver(doGrow, options);
    let target = document.getElementById(`window-${name}`);
    if (!largeScreen) {
      observer.observe(target);
    }
    return () => {
      observer.unobserve(target);
    }
  }, [])

  function growTimer(container, wind) {
    wind.style.paddingTop = "0px";
    container.style.transition = "width .75s, height .5s";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.borderRadius = "0px";
    setShowNav(false);
  }

  function doGrow(entry) {
    let container = document.getElementById(`container-${name}`);
    let wind = document.getElementById(`window-${name}`);
      if (entry[0].isIntersecting) {
        let container = document.getElementById(`container-${name}`);
        let wind = document.getElementById(`window-${name}`);
        this.grow = setTimeout(() => growTimer(container, wind), 2000)
      } else {
        clearTimeout(this.grow);
        wind.style.paddingTop = "80px";
        container.style.width = "85%";
        container.style.height = "75%";
        container.style.borderRadius = "40px";
        setShowNav(true);
      }
  }

  function growTimerLarge(container) {
    container.style.width = "100%";
  }

  useEffect(() => {
    if (largeScreen) {
      let container = document.getElementById(`container-${name}`);
      let element = document.getElementById(`featured-${name}`);
      if (element) {
        if (showSubtitle) {
          container.style.transition = "width .75s, height .5s";
          container.style.height = "calc(100% - 32px)";
          setTimeout(() => growTimerLarge(container), 2000);
          
        } else {
          container.style.width = "85%";
          container.style.height = "100%";
        }
      }
    } 
  }, [showSubtitle, largeScreen]);


  useEffect(() => {
    if (largeScreen) {
      let container = document.getElementById(`container-${name}`);
      let vwh = window.innerHeight;
      let factor = window.innerHeight * 0.65;
      let subtract = (scrollPos - (1 + index) * vwh).toFixed(0);
      let scale = 100 - ((subtract * 100) / factor).toFixed(0);
      let scaleReverse = 100 - ((subtract * -100) / 400).toFixed(0);
      if (subtract < factor && subtract > 0) {
        container.style.transformOrigin = "top";
        container.style.transform = `scaleY(${scale}%)`;
      }
      if (subtract > -1 * factor && subtract < 0) {
        container.style.transformOrigin = "bottom";
        container.style.transform = `scaleY(${scaleReverse}%)`;
      }
    }
  }, [scrollPos]);

  return (
      <div className={classes.root}>
        <div className={classes.window} id={`window-${name}`}>
          <div className={classes.cont} id={`container-${name}`}>
            <div
              id={`featured-${name}`}
              className={classes.wrapper}
              onMouseEnter={() => setShowSubtitle(true)}
              onMouseLeave={() => setShowSubtitle(false)}
              onClick={switchView}
            >
              <ReactPlayer
                id={`videoFrame-${name}`}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  borderRadius: "40px",
                  overflow: "hidden",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  alignContent: "center",
                }}
                url={`http://${endpoint}${featuredUrl}`}
                width="100%"
                height="auto"
                playing
                loop
                muted
                fluid={false}
              />
            </div>
          </div>
          {(showSubtitle || !largeScreen) && (
            <div className={classes.subtitle}>
              <Typography style={{ fontFamily: "Square721", fontSize: "16px" }}>
                {client}
              </Typography>
              {largeScreen && (<Typography style={{ fontFamily: "Square721", fontSize: "16px" }}>
                {projectName}
              </Typography>)}
              <Typography style={{ fontFamily: "Square721", fontSize: "16px" }}>
                {role}
              </Typography>
              {/* <Typography style={{ fontFamily: "Square721", fontSize: "16px" }}>
                {director}
              </Typography> */}
              <Typography style={{ fontFamily: "Square721", fontSize: "16px" }}>
                {code}
              </Typography>
            </div>
          )}
        </div>
      </div>
  );
};

export default Preview;
