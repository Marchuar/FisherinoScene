import {DoubleSide, Object3D, Vector3} from "three";
import {type FC, type Ref, useEffect} from "react";
import {GUI} from "lil-gui";
import {useTexture} from "@react-three/drei";

interface BoxProps {
    position: [number, number, number];
    boxRef: Ref<Object3D>;
    colors: [string, string];
    moveToObject: (position: Vector3) => void;
    guiRef: Ref<GUI>;
}

const Box:  FC<BoxProps> = (props: BoxProps) => {
    const boxTexture = useTexture("/Images/Minecraft_texture.png")

    useEffect(() => {
        if(props.boxRef && props.guiRef) {
            if(typeof props.boxRef !== "function" && props.boxRef.current && typeof props.guiRef !== "function" && props.guiRef.current) {
                const cubeFolder = props.guiRef.current.addFolder(props.colors[1] + " Cube Pos")
                cubeFolder.add(props.boxRef.current.position, "x").min(-4).max(4).step(0.01).name("X Pos: " + props.colors[1])
                cubeFolder.add(props.boxRef.current.position, "y").min(-4).max(4).step(0.01).name("Y Pos: " + props.colors[1])
            }
        }
    }, [])

    const position =
        props.boxRef && typeof props.boxRef !== "function" && props.boxRef.current
            ? props.boxRef.current.position
            : new Vector3(props.position[0], props.position[1], props.position[2]);

    return (
        <mesh position={props.position} rotation={[0, 0, 0]} ref={props.boxRef} onClick={() => props.moveToObject(position)}>
            <boxGeometry args={[1, 1, 1]}/>

            <meshBasicMaterial map={boxTexture} side={DoubleSide}/>
        </mesh>
    )
}

export default Box;