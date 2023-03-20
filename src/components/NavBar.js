import React, { useContext } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const useStyles = makeStyles(() => ({
  navBar: {
    minWidth: "100%",
    background: "#FFFFFF",

    width: "100%",
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    height: "60px",
    zIndex: 3,
    opacity: 0.5,
    marginBottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 24px",
    boxSizing: "border-box",
  },
  toolbar: {
    display: "flex",
    minWidth: "60%",
    flexDirection: "row",
    background: "#FFFFFF",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    zIndex: 2,
  },

  menuButton: {
    fontFamily: "Square721",
    cursor: "pointer",
    textAlign: "left",
  },
  barText: {
    fontFamily: "Square721",
    fontSize: "1.5em",
    opacity: "1 !important",
    color: "#000000",
  },
}));

export const NavBar = (props) => {
  const classes = useStyles();
  let navigate = useNavigate();
  const { state } = useContext(AppContext);
  const { showNav } = state;

  return (
    showNav && (
      <div className={classes.navBar}>
        <div className={classes.toolbar}>
          <Button className={classes.menuButton} onClick={(e) => navigate("/")}>
            <Typography
              style={{ fontFamily: "Square721" }}
              className={classes.barText}
            >
              Pleasure Craft
            </Typography>
          </Button>
          <Button
            className={classes.menuButton}
            onClick={(e) => navigate("/info")}
          >
            <Typography
              style={{ fontFamily: "Square721" }}
              className={classes.barText}
            >
              Info
            </Typography>
          </Button>
          <Button
            className={classes.menuButton}
            onClick={(e) => navigate("/index")}
          >
            <Typography
              style={{ fontFamily: "Square721" }}
              className={classes.barText}
            >
              Index
            </Typography>
          </Button>
        </div>
      </div>
    )
    /* <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={3} style={{ height: "100%" }}>
          <div className={classes.menuButton} onClick={(e) => navigate("/")}>
            Pleasure Craft
          </div>
        </Grid>
        <Grid item xs={3} style={{ float: "right", border: "1px solid black" }}>
          <Button
            className={classes.menuButton}
            onClick={(e) => navigate("/info")}
          >
            Info
          </Button>
        </Grid>
        <Grid item xs={3} style={{ float: "right", border: "1px solid black" }}>
          <Button
            className={classes.menuButton}
            onClick={(e) => navigate("/index")}
          >
            Index
          </Button>
        </Grid>
      </Grid> */
    // </div>
  );
};

export default NavBar;
