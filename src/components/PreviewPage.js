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
  landingContent: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    // padding: '25%',
  },
  featured: {
    height: "55%",
    width: "65%",
    // maxHeight: "55%",
    // maxWidth: "65%",
    marginTop: "120px",
    // marginRight: 'auto',
    // marginLeft: 'auto',
    //border: '1px solid blue',
    borderRadius: "20px",
    marginBottom: "8px",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    transition: "width 1s, height .5s",
    cursor: "pointer",
  },
  featuredAsset: {
    maxHeight: "100%",
    maxWidth: "100%",
    // borderRadius: '20px',
    // overflow: 'hidden',
  },
  descSubtitle: {
    marginTop: "8px",
    width: "65%",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "display 1s",
  },
}));

export const PreviewPage = (props) => {
  const { data, media } = props;
  const classes = useStyles();
  const navigate = useNavigate();

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

  const switchView = () => {
      navigate(`project/${data.name}`);
  };

  useEffect(() => {
    let element = document.getElementById(`featured-${name}`);
    if (element) {
      if (showSubtitle) {
        element.style.height = "calc(55% - 32px)";
        setTimeout(myTimer, 2000);
        function myTimer() {
          element.style.width = "75%";
        }
      } else {
        element.style.width = "65%";
        element.style.height = "55%";
      }
    }
  }, [showSubtitle]);

  // //   window.onscroll = function () { handleScroll() };
  //   useEffect(() => {
  //     let element = document.getElementById('slideshow');

  //     element.addEventListener('scroll', handleScroll);
  //     return () => {
  //         element.removeEventListener('scroll', handleScroll);
  //     }
  //   }, [])

  //   const handleScroll = () => {
  //     // let element = document.getElementById(`featured-${name}`);
  //     let element = document.getElementById('slideshow');
  //     let asset = document.getElementById('asset1');

  //     let scrollPoint = element.scrollLeft;
  //     let minWidth = 30;
  //     let divWidth = Math.max(minWidth, 400 - scrollPoint);
  //     console.log(divWidth);
  //     asset.style.maxWidth = divWidth;
  //     asset.style.height = '100%';
  //   }

  return (
    <div className={classes.root}>
        <div className={classes.landingContent}>
          <div
            id={`featured-${name}`}
            className={classes.featured}
            style={{
              //   height: showSubtitle ? "calc(55% - 16px)" : "55%",
              //   width: showSubtitle ? "75%" : "65%",
              //   width: 500,
              // paddingTop: '56.25%',
              boxSizing: "border-box",
              height: 300,
              //   maxHeight: 300,
              aspectRatio: 16 / 9,
            }}
            onMouseEnter={() => setShowSubtitle(true)}
            onMouseLeave={() => setShowSubtitle(false)}
            onClick={switchView}
          >
            {/* <div className={classes.featuredAsset}> */}
            <ReactPlayer
              id="videoFrame"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                borderRadius: "20px",
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                // transform: 'translate(-50%, -50%)',
                margin: "auto",
                // textAlign: 'center'
              }}
              url={`http://localhost:1337${featuredUrl}`}
              width="100%"
              height="auto"
              playing
              loop
              muted
              fluid={false}
            />
            {/* </div> */}
          </div>
          {showSubtitle && (
            <div className={classes.descSubtitle}>
              <Typography style={{ fontFamily: "Square721" }}>
                {projectName}
              </Typography>
              <Typography style={{ fontFamily: "Square721" }}>
                {role}
              </Typography>
              <Typography style={{ fontFamily: "Square721" }}>
                {client}
              </Typography>
              <Typography style={{ fontFamily: "Square721" }}>
                {director}
              </Typography>
              <Typography style={{ fontFamily: "Square721" }}>
                {code}
              </Typography>
            </div>
          )}
        </div>
    </div>
  );
};

export default PreviewPage;