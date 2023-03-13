import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/file";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    height: "100%",
    // border: '1px solid green',
  },
  pageContent: {
    position: "fixed",
    top: 60,
    maxHeight: "calc(100%-60)",
    height: "calc(100%-60)",
    flexGrow: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    justifyContent: "space-between",
  },
  slideshowContainer: {
    marginTop: "24px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // minHeight: '45%',
    // minWidth: '85%',
    maxHeight: "300px",
    height: "300px",
    maxWidth: "100%",
    // marginLeft: "auto",
    // marginRight: "auto",
    //border: '1px solid red',
    marginBottom: "48px",
    justifyContent: "flex-start",
    scrollSnapType: "x mandatory",
    overflowX: "scroll",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  slideShowAsset: {
    height: '400px',
    width: "60%",
    position: 'relative',
    // borderRadius: "20px",
    // marginRight: "64px",
    objectFit: "cover",
  },
  infoSection: {
    // position: 'fixed',
    // bottom: 0,
    // marginTop: "auto",
    height: "35%",
    width: "100%",
    boxSizing: "border-box",
    padding: "16px 64px",
    display: "flex",
    flexDirection: "column",
    // marginBottom: "16px",
    rowGap: "24px",
    // justifyContent: 'flex-end',
  },
  row: {
    display: "flex",
    flexDirection: "row",
    height: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));

export const ProjectPage = (props) => {
  const { viewMode, data, media } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  const [view, setView] = useState(viewMode);
  const [featuredUrl, setFeaturedUrl] = useState("");
  const [galleryUrls, setGalleryUrls] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);

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

  const [creditsArr, setCreditsArr] = useState([]);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    let featUrl = featured.data.attributes.url;
    let imgUrls = [];
    setFeaturedUrl(featUrl);
    let imgs = gallery.data;
    imgs.forEach((el) => imgUrls.push(el.attributes.url));
    setGalleryUrls([...imgUrls]);

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

  return (
    <div className={classes.root}>
      <div className={classes.pageContent}>
        {/* <div id='slideshow' className={classes.slideshowContainer}> */}
        <div className={classes.slideShowAsset}>
          <ReactPlayer
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              borderRadius: "40px",
              overflow: "hidden",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: "auto",
            }}
            url={`http://localhost:1337${featuredUrl}`}
            width='100%'
            height="auto"
            playing
            loop
            muted
          />
        </div>


        <div className={classes.infoSection}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className={classes.row}
            //   style={{ paddingRight: 120 }}
          >
            <Grid item xs={6} md={2}>
              <Typography style={{ fontFamily: "Square721" }}>
                Project: {projectName}
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography style={{ fontFamily: "Square721" }}>
                Role: {role}
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography style={{ fontFamily: "Square721" }}>
                Client: {client}
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.row}>
            <Typography style={{ fontFamily: "Square721" }}>
              {writeup}
            </Typography>
          </div>

          <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.row}
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
    </div>
  );
};

export default ProjectPage;
