"use client"

import {useRef} from "react";
import * as THREE from "three";
import {OrthographicCamera} from "three";

const MySpotLight = () => {
    const spotLightRef = useRef<THREE.Light>(null!)
    const shadow = useRef<OrthographicCamera>(null)

    return (
        <>
            <spotLight angle={0.6}
                       decay={0.2}
                       penumbra={1}
                       distance={12}
                       intensity={15} ref={spotLightRef} position={[-2, 6, 5]} color={"white"} castShadow>
                <orthographicCamera attach="shadow-camera" ref={shadow} args={[-4, 4, 3, -2]}></orthographicCamera>
            </spotLight>
        </>
    )
}

export default MySpotLight