import React, { useRef } from 'react';

import { ExecuteCodeAction } from '@babylonjs/core/Actions';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Vector3 } from '@babylonjs/core/Maths/math';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import BabylonScene from 'babylonjs-hook';
import './scene.css';

//new
import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial";
import '@babylonjs/core/Materials/Textures/Loaders/ddsTextureLoader';
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { GroundBuilder } from '@babylonjs/core';
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import '@babylonjs/loaders/glTF/2.0/glTFLoader';

//new2
import { ActionManager } from '@babylonjs/core/Actions/actionManager';

// GUI
import * as GUI from '@babylonjs/gui';

import { navigateTo } from 'gatsby';


// let box;
// let babylonLink;

const onSceneReady = async (scene) => { 

const camera = new FreeCamera("camera1", new Vector3(1.5, 2, -5.5), scene);


const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
camera.attachControl(canvas, true);

  // Create a grid material  
const gridMaterial = new GridMaterial("grid", scene);

scene.ambientColor = new Color3(1, 1, 1);
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)

const light = new HemisphericLight("hemiLight", new Vector3(-1, 1, 0), scene);
  light.diffuse = new Color3(1, 0.5, 1, 0.21);
  light.intensity =1;
 

  const ground = GroundBuilder.CreateGround("ground", {width: 10, height: 15}, scene);
  ground.position.z = 2;
  ground.material = gridMaterial
  ground.rotation.y= Math.PI /2
  


  SceneLoader.ImportMesh("", "https://cx20.github.io/gltf-test/sampleModels/BrainStem/glTF/","BrainStem.gltf", scene, function (newMeshes) {
  //SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/julien210/thion/julien210-assets/", "coin.gltf", scene, function (newMeshes) {
  
  const perso =  newMeshes[0];
  perso.position.x = 2;
  perso.position.y = 0;   
  perso.position.z = 2;
  perso.isVisible = false;

  });

/////////////////// BABYLON HUI

const manager = new GUI.GUI3DManager(scene);

// Create a horizontal stack panel
const panel = new GUI.StackPanel3D();
panel.margin = 0.02;

manager.addControl(panel);
panel.position.z = -0.5;
panel.position.x = 0.5;
panel.position.y = 0.5;


// Let's add some buttons!
const  addButton = function() {
const button = new GUI.Button3D("orientation");
  panel.addControl(button);
  button.onPointerUpObservable.add(function(){
    navigateTo('login')
  });      
const text1 = new GUI.TextBlock();
  text1.text = "Login";
  text1.color = "purple";
  text1.fontSize = 60;
button.content = text1;  
}

addButton()
}


const onRender = (scene) => {
  const coin = scene.meshes[0];
  console.log(coin)

  if (coin !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();
    const rpm = 3;
    coin.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));  
  }
}
export default () => {
//   babylonLink = useRef(null);

  return (
    <>
      <BabylonScene antialias onSceneReady={onSceneReady}  onRender={onRender} id='render-canvas' />
      {/* <a ref={babylonLink} target="_blank" rel="noopener noreferrer" href="https://www.babylonjs.com/">
        Babylon documentation
      </a> */}
    </>
  )
}
