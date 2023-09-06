import React, { useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import SideBar from './SideBar';
import Model from './Model';
import CanvasEnv from './CanvasEnv';

import './style.css';
import { ModelInfo } from '../utils/ModelInfo';

const Components = () => {
  const [optionInfo, setOptionInfo] = useState([])
  const [model, setModel] = useState(null)
  const [modelIndex, setModelIndex] = useState(0)
  const [selectedMapInfo, setSelectedMapInfo] = useState(null)
  
  const model_1 = useLoader(GLTFLoader, '/assets/model/model-1.glb').scene;
  const model_2 = useLoader(GLTFLoader, '/assets/model/model-2.glb').scene;
  
  useEffect(() => {
    setModel(model_1)
  }, [])
  
  useEffect(() => {
    setSelectedMapInfo(null)
    if (modelIndex === 0) setModel(model_1)
    else if (modelIndex === 1) setModel(model_2)
  }, [modelIndex])
  
  useEffect(() => {
    if (model) {
      let tempData = []
      Object.keys(ModelInfo[modelIndex]).map((item) => {
        if (item.substring(0, 4) === 'obj_') {
          tempData.push(item);
        }
      });
      setOptionInfo(tempData)
    }
  }, [model, modelIndex])
  
  
  return (
    <>
      <div className='model-select-btn-area'>
        {ModelInfo.map((item, index) => (
          <button key={index} onClick={() => setModelIndex(item.id - 1)} style={{marginLeft: 5}}>{item.id}.{item.name}</button>
        ))}
      </div>
      <div className='main-container'>
        <SideBar optionInfo={optionInfo} ModelInfo={ModelInfo[modelIndex]} selectedMapInfo={selectedMapInfo} setSelectedMapInfo={setSelectedMapInfo} />
        <Canvas
          className='canvas-area'
          camera={{
            fov: 25,
            near: 0.1,
            far: 1000,
            aspect: window.innerWidth / window.innerHeight,
            position: [0, 1.6, 10]
          }}
        >
          <Model model={model} ModelInfo={ModelInfo[modelIndex]} selectedMapInfo={selectedMapInfo} />
          <CanvasEnv />
        </Canvas>
      </div>
    </>
  )
}

export default Components