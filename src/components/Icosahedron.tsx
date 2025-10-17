"use client"

import {type Ref, useRef} from "react";
import {GUI} from "lil-gui";
import {Object3D, Vector3} from "three";
import {type FC, useEffect, useState} from "react";
import * as THREE from "three";

interface IcoProps {
    position: [number, number, number];
    guiRef: Ref<GUI>;
    icoRef: Ref<Object3D>;
    moveToObject: (position: Vector3) => void;
}

const Ico: FC<IcoProps> = (props) => {
    const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)

    const [icoArgs, setIcoArgs] = useState({
        radius: 0.8,
        detail: 0,
        flatShading: false
    });

    useEffect(() => {

        if(props.icoRef && props.guiRef) {
            if(typeof props.icoRef !== "function" && props.icoRef.current && typeof props.guiRef !== "function" && props.guiRef.current) {
                const icoFolder = props.guiRef.current.addFolder("Ico")

                const icoSettingsFolder = icoFolder.addFolder("Ico settings")
                icoSettingsFolder.add(icoArgs, "radius").min(0.1).max(2).step(0.01).name("Radius").onChange((value: number) => setIcoArgs({...icoArgs, radius: value}))
                icoSettingsFolder.add(icoArgs, "detail").min(0).max(10).step(1).name("Detail").onChange((value: number) => setIcoArgs({...icoArgs, detail: value}))
                icoSettingsFolder.add(icoArgs, "flatShading").name("Flat Shading").onChange((value: boolean) => {
                    setIcoArgs((prev) => ({ ...prev, flatShading: value }))
                    if (materialRef.current) {
                        materialRef.current.flatShading = value
                        materialRef.current.needsUpdate = true
                    }
                })

                const donutPosFolder = icoFolder.addFolder("Ico position")
                donutPosFolder.add(props.icoRef.current.position, "x").min(-4).max(4).step(0.01).name("X Pos")
                donutPosFolder.add(props.icoRef.current.position, "y").min(-4).max(4).step(0.01).name("Y Pos")
            }
        }
    }, []);

    const position =
        props.icoRef && typeof props.icoRef !== "function" && props.icoRef.current
            ? props.icoRef.current.position
            : new Vector3(props.position[0], props.position[1], props.position[2]);

    return (
        <>
            <mesh position={props.position} ref={props.icoRef} onClick={() => props.moveToObject(position)}>
                <icosahedronGeometry args={[icoArgs.radius, icoArgs.detail]}/>

                <meshPhysicalMaterial
                    color="#ffffff"
                    transmission={1}
                    roughness={0}
                    thickness={0.5}
                    ior={1.5}
                    reflectivity={1}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    flatShading={icoArgs.flatShading}
                    ref={materialRef}
                />
            </mesh>
        </>
    )
}

export default Ico;