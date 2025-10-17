import { PerspectiveCamera } from '@react-three/drei';
import {type FC, type Ref, useEffect} from "react";
import * as THREE from "three";
import gsap from "gsap";

interface CameraProps {
    cameraRef: Ref<THREE.PerspectiveCamera>
}

const AnimatedCamera: FC<CameraProps> = (props: CameraProps) => {
    useEffect(() => {
        if (!props.cameraRef) return;
        if(typeof props.cameraRef !== "function" && props.cameraRef.current) {
            gsap.to(props.cameraRef.current.position, {x: 0, y: 4, z: 7, duration: 2, delay: 0.3, ease: "power2.inOut"})
            gsap.to(props.cameraRef.current.rotation, {x: -0.3, y: 0, z: 0, duration: 2, delay: 0.3, ease: "power2.inOut"})
        }
    }, []);

    return <PerspectiveCamera ref={props.cameraRef} makeDefault position={[0, 6, 11]} rotation={[0, 0, 0]} />
}

export default AnimatedCamera;