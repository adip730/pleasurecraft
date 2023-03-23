import React, { createContext, useEffect, useState } from "react";
import { getProjects, getConfig } from "../api/api";

const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [projects, setProjects] = useState([]);
  const [projectRoutes, setProjectRoutes] = useState([]);
  const [config, setConfig] = useState();
  
  const [showNav, setShowNav] = useState(true);
  const [showLogo, setShowLogo] = useState(true);

  const invokeGetProjects = async () => {
    await getProjects()
      .then((res) => {
        // console.log(res);
        let proj = res.data.data;
        let temp = [];
        let tempRoutes = [];
        proj.forEach((el) => {
          temp.push(el.attributes);
          tempRoutes.push({
            routeName: el.attributes.name,
            data: el.attributes,
          });
        });
        setProjects([...temp]);
        setProjectRoutes([...tempRoutes]);
      })
      .catch(() => {
        console.log("couldnt fetch projects");
      });
  };
  const invokeGetConfig = async () => {
    await getConfig()
      .then((res) => {
        console.log(res);
        // let conf = res.data.data
        // let temp = [];
        // proj.forEach((el) => temp.push(el.attributes));
        // setConfig([...conf]);
      })
      .catch(() => {
        // console.log("couldnt fetch config");
      });
  };

  // const invokeGetMedia = async () => {
  //     await getMedia().then((res) => {
  //         let med = res.data
  //         setMedia([...med]);
  //     }).catch(() => {
  //         console.log('couldnt fetch media');
  //     });
  // };

  // const invokeGetFolders = async () => {
  //     await getFolders().then((res) => {
  //         console.log(res);
  //         // let fold = res.data
  //         // setFolders([...fold]);
  //     }).catch(() => {
  //         console.log('couldnt fetch folders');
  //     });
  // };

  const invokeStart = () => {
    invokeGetProjects();
    invokeGetConfig();
    // invokeGetMedia();
    // invokeGetFolders();
  };

  const state = {
    projects: projects,
    projectRoutes: projectRoutes,
    showNav: showNav,
    showLogo: showLogo,
  };
  const api = {
    invokeStart: invokeStart,
    setShowNav: setShowNav,
    setShowLogo: setShowLogo
  };
  return (
    <AppContext.Provider value={{ state, api }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
