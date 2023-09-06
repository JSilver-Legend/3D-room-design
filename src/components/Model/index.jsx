import * as THREE from 'three';
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';

import { PngInitMap } from '../../utils/ImageInfo';
import { Image } from '@react-three/drei';

const Model = ({ model, selectedMapInfo }) => {
  const modelRef = useRef();
  const [rotate, setRotate] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(-4);
  const [ringColor, setRingColor] = useState("white");
  const [isRotating, setIsRotating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  
  const selectedTexture = useLoader(TextureLoader, selectedMapInfo ? selectedMapInfo.texture : PngInitMap);
  selectedTexture.flipY = false;
  selectedTexture.wrapS = selectedTexture.wrapT = THREE.RepeatWrapping;
  
  const limitValue = useMemo(() => {
    const minLimitX = -window.innerWidth * 0.004 / 2.2;
    const maxLimitX = window.innerWidth * 0.004 / 2.2;
    const minLimitY = -4;
    const maxLimitY = -1;

    return {minLimitX, maxLimitX, minLimitY, maxLimitY}
  }, [window.innerWidth, window.innerHeight])

  const bindRotate = useDrag(
    ({ down, delta, first }) => {
      if (first) {
        setIsRotating(true);
      }
      if (down) {
        setRotate((prev) => prev + delta[0] * 0.01);
      }
    },
    { pointerEvents: true },
  )

  const bindModel = useDrag(
    ({ down, delta, first }) => {
      if (first) {
        setIsRotating(false);
      }
      if (down && !isRotating) {
        setIsDragging(true);
        
        if (positionX >= limitValue.minLimitX && positionX <= limitValue.maxLimitX) {
          if (positionY <= limitValue.maxLimitY && positionY >= (-0.56 * positionX - 3.62) ) {
            setPositionX((prev) => prev + delta[0] * 0.005);
            setPositionY((prev) => prev + delta[1] * 0.005);
          } else if (positionY > limitValue.maxLimitY) {
            setPositionY(limitValue.maxLimitY)
          } else if (positionY < (-0.56 * positionX - 3.62)) {
            setPositionY((-0.56 * positionX - 3.62));
          }
        } else if (positionX < limitValue.minLimitX) {
          setPositionX(limitValue.minLimitX);
        } else if (positionX > limitValue.maxLimitX) {
          setPositionX(limitValue.maxLimitX);
        }
      }
      if (!down) {
        setIsDragging(false);
      }
    },
    { pointerEvents: true }
  )
  
  useEffect(() => {
    if (selectedMapInfo && model) {
      model.children.map((item) => {
        if (item.name === selectedMapInfo.obj_value) {
          item.material.side = THREE.DoubleSide
          item.material.metalness = 0.8;
          item.material.map = selectedTexture;
          item.material.needsUpdate = true;
        }
      })
    }

    if (model && modelRef.current !== undefined) {
      document.addEventListener("wheel", (event) => {
        if (event.deltaY < 0) {          
          if (modelRef.current.scale.x < 1.49) {  
            modelRef.current.scale.x += 0.01;
            modelRef.current.scale.y += 0.01;
            modelRef.current.scale.z += 0.01;
          }
        } else if (event.deltaY > 0) {
          if (modelRef.current.scale.x > 1) {  
            modelRef.current.scale.x -= 0.01;
            modelRef.current.scale.y -= 0.01;
            modelRef.current.scale.z -= 0.01;
          }
        }
      })
    }
  }, [selectedMapInfo, model, modelRef])
  
  return (
    <group ref={modelRef} position={[positionX, -2.2, positionY]} rotation={[-0.1 ,rotate, 0]}>
      <group {...bindModel()} position={[0, -0.5, 0]}>
        <Suspense fallback={null}>
          <primitive object={model} />
        </Suspense>
      </group>
      <group {...bindRotate()} name='arrow' onPointerEnter={()=>{ isDragging ? setRingColor('white') : setRingColor('red') }} onPointerLeave={()=>{ setRingColor('white') }} rotation={[0, -1.1, 0]}>
        <mesh position={[0, -0.5, 0]} rotation={[Math.PI/2,0,0]}>
          <torusGeometry args={[1, 0.02, 25, 60, 6.1]} />
          <meshStandardMaterial color={ringColor} side={THREE.DoubleSide} metalness={0.6} />
        </mesh>
        <mesh position={[0.995, -0.5, -0.04]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.04, 0.16, 25, 1]} />
          <meshStandardMaterial color={'red'} side={THREE.DoubleSide} metalness={0.6} />
        </mesh>
      </group>
    </group>
  )
}

export default Model