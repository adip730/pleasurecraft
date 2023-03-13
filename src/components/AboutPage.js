import React, { useState, useContext, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography } from "@mui/material";
import HomeLogo from "../threejs/HomeLogo";
import InfoRender from "../threejs/InfoRender";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  assetContainer: {
    height: "65%",
    border: "1px solid black",
    textAlign: "center",
  },
  textContainer: {
    height: "35%",
    border: "1px solid black",
    textAlign: "center",
  },
}));

export const AboutPage = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.assetContainer}>
        <InfoRender />
      </div>
      <div className={classes.textContainer}>
        <Typography>THE ABOUT US DESCRIPTION GOES HERE</Typography>
      </div>
    </div>
  );
};

export default AboutPage;
