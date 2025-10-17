import {useGLTF} from "@react-three/drei";
import type {FC} from "react";

interface PalmProps {
    path: string;
    position: [number, number, number];
    size: [number, number, number];
    rotation: [number, number, number];
}

const Palm: FC<PalmProps> = (props) => {
    const palmModel = useGLTF(props.path)

    return (
        <mesh scale={props.size} rotation={props.rotation} position={props.position}>
            <primitive object={palmModel.scene}></primitive>
        </mesh>
    )
}

export default Palm;