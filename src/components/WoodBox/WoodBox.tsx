"use client"

import type {FC} from "react";
import {useTexture} from "@react-three/drei";

import * as THREE from "three";

interface WoodBoxProps {
    position: [number, number, number],
    size: [number, number, number],
}

const WoodBox: FC<WoodBoxProps> = (props) => {
    const textures = useTexture({
        map: "/textures/WoodTexture/wood_planks_diff_4k.jpg",          // Color / Diffuse / Base color
        normalMap: "/textures/WoodTexture/wood_planks_nor_gl_4k.jpg",    // Normal map
        roughnessMap: "/textures/WoodTexture/wood_planks_rough_4k.jpg",
        metalnessMap: "/textures/WoodTexture/wood_planks_arm_4k.jpg",
        aoMap: "/textures/WoodTexture/wood_planks_ao_4k.jpg",            // Ambient occlusion
    })

    textures.map.colorSpace = THREE.SRGBColorSpace

    return (
        <mesh position={props.position} receiveShadow>
            <boxGeometry args={[props.size[0], props.size[1], props.size[2]]}></boxGeometry>

            <meshStandardMaterial {...textures} />
        </mesh>
    )
}

export default WoodBox;