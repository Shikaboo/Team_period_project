import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Sec3D = () => {
  const gltf = useLoader(GLTFLoader, 'gungbockgung.glb');
  const modelRef = useRef();

  // 회전 애니메이션을 프레임별로 업데이트
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003; // y축 기준으로 회전
    }
  });
  return (
    <>
      <ambientLight intensity={50} />
      <directionalLight color="white" intensity={10} />
      <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} />
      <primitive ref={modelRef} object={gltf.scene} scale={10} />
    </>
  );
};

export default Sec3D;