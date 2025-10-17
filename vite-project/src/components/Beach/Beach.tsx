import type {FC} from "react";
import {DoubleSide} from "three";
import {useTexture} from "@react-three/drei";

interface PalmProps {
    position: [number, number, number];
}

const Beach: FC<PalmProps> = (props) => {
    const textures = useTexture({
        map: "/textures/BeachTextures/aerial_beach_01_diff_4k.jpg",        // Color / Diffuse / Base color
        normalMap: "/textures/BeachTextures/aerial_beach_01_nor_gl_4k.jpg",    // Normal map
        roughnessMap: "/textures/BeachTextures/aerial_beach_01_rough_4k.jpg",
        metalnessMap: "/textures/BeachTextures/aerial_beach_01_arm_4k.jpg",
        aoMap: "/textures/BeachTextures/aerial_beach_01_ao_4k.jpg",            // Ambient occlusion
        displacementMap: "/textures/BeachTextures/aerial_beach_01_disp_4k.jpg"
    })

    return (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={props.position}>
            <planeGeometry args={[50, 30]} />

            <meshStandardMaterial {...textures} displacementScale={0.05} side={DoubleSide}></meshStandardMaterial>
        </mesh>
    )
}

export default Beach;