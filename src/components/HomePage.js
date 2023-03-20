import React, { useState, useContext, useEffect, useRef } from "react";
import makeStyles from "@mui/styles/makeStyles";
import AppContext from "../context/AppContext";
import Preview from "./Preview";
import PreviewPage from "./PreviewPage";
import HomeLogo from "../threejs/HomeLogo";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    // marginLeft: 'auto',
    // marginRightt: 'auto',
  },
  scrollView: {
    width: "100%",
    height: "100dvh",
    scrollSnapType: "y mandatory",
    overflowY: "scroll",
  },
  viewContainer: {
    position: "relative",
    height: "100vh",
    width: "100%",
    //border: '3px solid green',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: '#EDEEF0',
    padding: 0,
    scrollSnapAlign: "start",
  },
}));

export const HomePage = (props) => {
  const { state, api } = useContext(AppContext);
  const { projects } = state;
  const { invokeStart } = api;

  useEffect(() => {
    invokeStart();
  }, []);

  const classes = useStyles();
  const viewRef = useRef();

  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
      var view = document.getElementById('scrollview');
      view.addEventListener('scroll', handleScroll);

    //   const handleScroll  = () => {
    //     console.log(view.scrollY)
    // }
  }, [])


  const handleScroll  = () => {
      let scrollTop = viewRef.current.scrollTop;
      setScrollPos(scrollTop);
    // console.log(scrollTop);
}
  return (
    <div className={classes.root}>
      <div className={classes.scrollView} ref={viewRef} onScroll = {handleScroll} id='scrollview'>
        <div className={classes.viewContainer}>
          {/* <p>Spinning Logo goes here</p> */}
          <HomeLogo />
        </div>
        {projects.map((proj, ind) => (
          <div className={classes.viewContainer}>
            <Preview data={proj} index={ind} scrollPos={scrollPos}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
