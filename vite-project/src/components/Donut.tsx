"use client"

import type {Ref} from "types-react";
import {GUI} from "lil-gui";
import {DoubleSide, Object3D, Vector3} from "three";
import {type FC, useEffect, useState} from "react";
import {useMatcapTexture} from "@react-three/drei";

interface DonutProps {
    position: [number, number, number];
    rotation: [number, number, number];
    guiRef: Ref<GUI>;
    donutRef: Ref<Object3D>;
    moveToObject: (position: Vector3) => void;
}

const Donut: FC<DonutProps> = (props) => {
    const [donutArgs, setDonutArgs] = useState({
        radius: 0.7,
        tube: 0.3,
        radialSegments: 32,
        tubularSegments: 32,
    });

    const [matcap] = useMatcapTexture("04CC77_0CF7CA_04E9A7_04AB54", 64);

    useEffect(() => {

        if(props.donutRef && props.guiRef) {
            if(typeof props.donutRef !== "function" && props.donutRef.current && typeof props.guiRef !== "function" && props.guiRef.current) {
                const donutFolder = props.guiRef.current.addFolder("Donut")

                const donutSettingsFolder = donutFolder.addFolder("Donut settings")
                donutSettingsFolder.add(donutArgs, "radius").min(0.01).max(4).step(0.01).name("Radius").onChange((value: number) => setDonutArgs({...donutArgs, radius: value}))
                donutSettingsFolder.add(donutArgs, "tube").min(0.01).max(4).step(0.01).name("Tube").onChange((value: number) => setDonutArgs({...donutArgs, tube: value}))
                donutSettingsFolder.add(donutArgs, "radialSegments").min(1).max(128).step(1).name("radialSegments").onChange((value: number) => setDonutArgs({...donutArgs, radialSegments: value}))
                donutSettingsFolder.add(donutArgs, "tubularSegments").min(1).max(128).step(1).name("tubularSegments").onChange((value: number) => setDonutArgs({...donutArgs, tubularSegments: value}))

                const donutPosFolder = donutFolder.addFolder("Donut position")
                donutPosFolder.add(props.donutRef.current.position, "x").min(-4).max(4).step(0.01).name("X Pos")
                donutPosFolder.add(props.donutRef.current.position, "y").min(-4).max(4).step(0.01).name("Y Pos")

                const donutRotationFolder = donutFolder.addFolder("Donut rotation")
                donutRotationFolder.add(props.donutRef.current.rotation, "x").min(-4).max(4).step(0.01).name("X Rotation")
                donutRotationFolder.add(props.donutRef.current.rotation, "y").min(-4).max(4).step(0.01).name("Y Rotation")
            }
        }
    }, []);

    const position =
        props.donutRef && typeof props.donutRef !== "function" && props.donutRef.current
            ? props.donutRef.current.position
            : new Vector3(props.position[0], props.position[1], props.position[2]);

    return (
        <>
        <mesh rotation={props.rotation} position={props.position} ref={props.donutRef} onClick={() => props.moveToObject(position)}>
            <torusGeometry args={[donutArgs.radius, donutArgs.tube, donutArgs.radialSegments, donutArgs.tubularSegments]}/>

            <meshMatcapMaterial matcap={matcap} side={DoubleSide} />
        </mesh>
        </>
    )
}

export default Donut;