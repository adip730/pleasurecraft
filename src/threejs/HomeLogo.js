//import { useRef, useEffect } from 'react';
import React, { useEffect, useRef } from "react";

import * as THREE from "three";
//import GLTFLoader from 'three-gltf-loader';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { createCanvas } from "canvas";
import { createRef } from "react";

import { Cache } from "three";

// Global context var
var direction = 0;

// Homepage logo demo

export const HomeLogo = () => {
  // Canvas ref
  const canvasRef = useRef(null);
  useEffect(() => {
    // Get user input
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", handleMouseMove);
    // Primary floating object
    var coinDisc = new THREE.Mesh();
    const loader = new GLTFLoader();
    loader.load("./glTF/Logo Chrome.gltf", (gltf) => {
      const root = gltf.scene;
      //scene.add(root);
      coinDisc = root.getObjectByName("Icon_Logo");
      coinDisc.position.set(0, 0, 0);
      coinDisc.scale.set(0.1, 0.1, 0.1);
      // HDRI setup
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      const hdrLoader = new THREE.TextureLoader();
      hdrLoader.load("./Textures/Ultimate_Skies_4k_0058_BOOSTED.jpg", function(
        texture
      ) {
        const prefilteredCubeMap = pmremGenerator.fromEquirectangular(texture)
          .texture;
        // Set the texture as the environment map for a material
        coinDisc.material.envMap = prefilteredCubeMap;
        pmremGenerator.dispose();
        console.log(texture.status);
      });
      coinDisc.material.emissive = new THREE.Color(0xffffff);
      coinDisc.material.emissiveIntensity = .1;
      scene.add(coinDisc);
      //console.log(dumpObject(root).join('\n'));
    });
    // Set up the Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    var theta = 0;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(canvasRef.current.width, canvasRef.current.height);
    renderer.setAnimationLoop(animate);
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.width / canvasRef.current.height,
      0.1,
      1000
    );
    camera.position.z = 100;
    renderer.render(scene, camera);
    function animate() {
      // Translating camera on a horizontal fixed orbit
      var frame = Math.PI / 360;
      var r = 100;
      theta -= frame; //this gives the illusion of rotation by orbiting the camera
      coinDisc.rotation.y -= frame * direction; //rotating the mesh should give reflections animation
      theta += frame * direction; //applying counterspin
      var coordinates = calculate_orbit(r, theta);
      camera.position.x = coordinates[0];
      camera.position.z = coordinates[1];
      console.log("(" + camera.position.x + "," + camera.position.z + ")");

      // Rotating camera to track origin
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      // Rotating camera to track origin
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      // Rotating by 1 degree per frame (1 degree = pi/180 radians)
      renderer.render(scene, camera);
    }
    return () => {
      canvasRef && canvasRef.current && canvasRef.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // The empty array ensures that this effect only runs once when the component mounts
  return (
    <div id="main">
      <canvas
        ref={canvasRef}
        className="three"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        width="1000px"
        height="1000px"
      />
    </div>
  );
};

export default HomeLogo;

// Draws a circular orbit around (0,0)
function calculate_orbit(r, theta) {
  var x = r * Math.cos(theta);
  var y = r * Math.sin(theta);
  return [x, y];
}

// Tracks user interaction
let timeout;
const handleMouseMove = (event) => {
  var coefficient = .75;
  direction = event.movementX * coefficient;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    direction = 0;
  }, 100);
};
function handleScroll(event) {
  event.preventDefault();
  var coefficient = 1;
  direction = event.deltaY * coefficient;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    direction = 0;
  }, 2500);
}
function dumpObject(obj, lines = [], isLast = true, prefix = "") {
  const localPrefix = isLast ? "└─" : "├─";
  lines.push(
    `${prefix}${prefix ? localPrefix : ""}${obj.name || "*no-name*"} [${
      obj.type
    }]`
  );
  const newPrefix = prefix + (isLast ? "  " : "│ ");
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}