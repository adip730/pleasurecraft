import React, { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player/file";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppContext from "../context/AppContext";

const useStyles = makeStyles(() => ({
  "@keyframes fadein": {
    "0%": {
      opacity: 0,
      //   transform: "translateY(-200%)",
    },
    "100%": {
      opacity: 1,
      //   transform: "translateY(0)",
    },
  },
  root: {
    animation: "$fadein 1000ms",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // position: "relative",
    padding: "84px 64px 24px 64px",
    // maxHeight: "calc(100%-60)",
    height: "100vh",
    width: "100%",
    // flexGrow: 1,
    overflow: "auto",
    boxSizing: "border-box",
    justifyContent: "flex-start",
  },
  window: {
    height: "60%",
    width: "100%",
    overflow: "hidden",
    borderRadius: "40px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
  },
  videoWrapper: {
    height: "100%",
    // width: "100%",
    borderRadius: "40px",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    aspectRatio: 16 / 9,
    // borderRadius: "20px",
    // marginRight: "64px",
    // objectFit: "cover",
  },
  infoSection: {
    // position: 'fixed',
    // bottom: 0,
    // marginTop: "auto",
    height: "35%",
    width: "100%",
    boxSizing: "border-box",
    padding: "16px 0",
    display: "flex",
    flexDirection: "column",
    // marginBottom: "16px",
    rowGap: "24px",
    justifyContent: "flex-start",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    height: "auto",
    // marginTop: "auto",
    // marginBottom: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  controls: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "10%",
    maxHeight: "48px",
    width: "100%",
    background: "#000000",
    opacity: 0.75,
    position: "absolute",
    bottom: 0,
    boxSizing: "border-box",
    padding: "4px 32px",
  },
  playPause: {
    color: "#FFFFFF",
    maxWidth: "10%",
  },
  scrub: {
    color: "#FFFFFF",
    flexGrow: 1,
    border: "1px solid green",
  },
  fullScreen: {
    color: "#FFFFFF",
    maxWidth: "10%",
  },
}));

export const ProjectPage = (props) => {
  const { viewMode, data, media } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  const { api } = useContext(AppContext);
  const { setShowNav } = api;

  const {
    projectName,
    name,
    role,
    client,
    writeup,
    roles,
    director,
    code,
    featured,
    gallery,
    description,
  } = data;

  const largeScreen = useMediaQuery("(min-width:800px)");

  const [featuredUrl, setFeaturedUrl] = useState("");
  const [creditsArr, setCreditsArr] = useState([]);

  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    let featUrl = featured.data.attributes.url;
    let imgUrls = [];
    setFeaturedUrl(featUrl);
    // let imgs = gallery.data;
    // imgs.forEach((el) => imgUrls.push(el.attributes.url));
    // setGalleryUrls([...imgUrls]);

    if (roles) {
      let tempCreds = roles.split(",");
      let creds = [];
      tempCreds.forEach((cred) => {
        creds.push(cred.split(":"));
      });
      setCreditsArr(creds);
    } else {
      setCreditsArr([]);
    }
    // const imgUrls = [];
    // const vidUrls = []
    // media.forEach((el) => el.url.includes('.jpg') ? imgUrls.push(el.url) : vidUrls.push(el.url));
    // setImageUrls([...imgUrls]);
    // setVideoUrls([...vidUrls]);
    // console.log(`http://localhost:1337${imgUrls[0]}`);
  }, []);

  const handlePlay = () => {
    let bool = expanded;
    // let play = playing;
    setExpanded(!bool);
    // setPlaying(!play);
  };

  //   const handlePlay = () => {};

  useEffect(() => {
    let container = document.getElementById("container");
    let player = document.getElementById("player-wrapper");
    if (container && player) {
      if (expanded) {
        setShowNav(false);
        player.style.transition = ".25s";
        container.style.transition = ".25s";
        player.style.transformOrigin = "0 50%";
        player.style.borderRadius = 0;
        player.style.paddingTop = "56.25%";
        player.style.height = "auto";
        player.style.width = "100";
        container.style.height = "100vh";
        container.style.width = "100vw";
        container.style.position = "absolute";
        container.style.top = 0;
        container.style.left = 0;
        container.style.right = 0;
        container.style.bottom = 0;
        container.style.marginBottom = 0;
        container.style.borderRadius = 0;
        container.style.backgroundColor = "#1a1a1a";
      } else {
        setShowNav(true);
        container.style.transition = "0s";
        container.style.height = "60%";
        container.style.width = "100%";
        container.style.position = "relative";
        container.style.marginBottom = "24px";
        container.style.borderRadius = "40px";
        container.style.backgroundColor = "#FFFFFF";
        player.style.borderRadius = "40px";
        player.style.paddingTop = 0;
        player.style.height = "100%";
        player.style.width = "";
      }
    }
  }, [expanded]);

  return (
    <div
      className={classes.root}
      style={{
        padding: largeScreen ? "84px 64px 24px 64px" : "84px 32px 24px 32px",
      }}
    >
      <div
        className={classes.window}
        id="container"
        onMouseEnter={() => expanded && setShowControls(true)}
        onMouseLeave={() => expanded && setShowControls(false)}
      >
        <div
          className={classes.videoWrapper}
          onMouseEnter={() => !expanded && setShowControls(true)}
          onMouseLeave={() => !expanded && setShowControls(false)}
          id="player-wrapper"
        >
          <ReactPlayer
            onClick={handlePlay}
            id="videoFrame"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              borderRadius: expanded ? "0px" : "40px",
              overflow: "hidden",
              position: "absolute",
              top: 0,
              left: 0,
              alignContent: "center",
              //   right: 0,
              //   bottom: 0,
              //   margin: "auto",
            }}
            url={`http://localhost:1337${featuredUrl}`}
            // width="100%"
            // height='auto'
            width={expanded ? "auto" : "100%"}
            height={expanded ? "100%" : "auto"}
            playing={playing}
            loop
            muted
            fluid={false}
          />
          {showControls && !expanded && (
            <div className={classes.controls}>
              <Button
                className={classes.playPause}
                onClick={() => setPlaying(!playing)}
              >
                {playing ? "Pause" : "Play"}
              </Button>
              <Button className={classes.scrub}></Button>
              <Button
                className={classes.fullScreen}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "shrink" : "expand"}
              </Button>
            </div>
          )}
        </div>
        {showControls && expanded && (
          <div className={classes.controls}>
            <Button
              className={classes.playPause}
              onClick={() => setPlaying(!playing)}
            >
              {playing ? "Pause" : "Play"}
            </Button>
            <Button className={classes.scrub}></Button>
            <Button
              className={classes.fullScreen}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "shrink" : "expand"}
            </Button>
          </div>
        )}
      </div>

      <div
        className={classes.infoSection}
        style={{ display: expanded ? "none" : "flex" }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          //   spacing={2}
          className={classes.row}
        >
          <Grid item xs={6} sm={4} md={3}>
            <Typography style={{ fontFamily: "Square721", fontSize: "1rem" }}>
              Project: {projectName}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Typography style={{ fontFamily: "Square721", fontSize: "1rem" }}>
              Role: {role}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Typography style={{ fontFamily: "Square721", fontSize: "1rem" }}>
              Client: {client}
            </Typography>
          </Grid>
        </Grid>

        <div className={classes.row}>
          <Typography style={{ fontFamily: "Square721", fontSize: "1rem" }}>
            {writeup}
          </Typography>
        </div>

        <Grid
          container
          direction="row"
          alignItems="center"
          className={classes.row}
          style={{ marginBottom: 16 }}
          spacing={2}
        >
          {creditsArr.map((cred) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={2}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Typography style={{ fontFamily: "Square721" }}>
                  {cred[0]}
                </Typography>
                <Typography style={{ fontFamily: "Square721" }}>
                  {cred[1]}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default ProjectPage;
