import {Canvas} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import {Object3D, type Vector3} from "three";

import {Environment, OrbitControls} from "@react-three/drei";
import * as THREE from 'three'

import gsap from "gsap";
import {useState} from "react";

import Box from "./components/Box";
import GUI from "lil-gui";
import AnimatedCamera from "./components/Camera";
import Donut from "./components/Donut";
import Ico from "./components/Icosahedron";
import TextBackground from "./components/Text3D/textBackground";
import WoodBox from "./components/WoodBox/WoodBox";
import Palm from "./components/Palms/Palm";
import Beach from "./components/Beach/Beach";
import MySpotLight from "./components/Lights/MySpotLight";

function App() {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null!)

    //const [matcap] = useMatcapTexture("FBB43F_FBE993_FB552E_FCDD65", 64)

    //const box2Ref = useRef<Object3D>(null)
    //const box1Ref = useRef<Object3D>(null)
    const boxRef = useRef<Object3D>(null)

    const donutRef = useRef<Object3D>(null)
    const icoRef = useRef<Object3D>(null)

    const guiRef = useRef<GUI | null>(null)

    const controlsRef = useRef<any>(null)

    const [hidden, setHidden] = useState<boolean>(true)
    const [enableOrbit, setEnableOrbit] = useState<boolean>(false)
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (guiRef.current) return;

        // Debug UI Setting
        const gui = new GUI({
            width: 500,
            title: "Debug UI",
            closeFolders: true,
        })

        console.log(gui)

        guiRef.current = gui

        return () => {
            gui.destroy()
            guiRef.current = null
        }
    }, []);

    const moveToObject: (position: Vector3) => Promise<void> = async (position: Vector3) => {
        setButtonDisabled(true);
        setEnableOrbit(false);

        const camera = cameraRef.current;
        const controls = controlsRef.current;

        if (!camera) return;

        // final camera position we want (offset back on z so camera looks at the cube)
        const finalPos = new THREE.Vector3(position.x, position.y, position.z + 4);

        // compute the quaternion that corresponds to "camera at finalPos looking at target"
        const lookAtMatrix = new THREE.Matrix4();
        lookAtMatrix.lookAt(finalPos, position.clone(), camera.up);
        const finalQuat = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);

        const startQuat = camera.quaternion.clone();


        const posPromise = new Promise<void>((resolve) => {
            gsap.to(camera.position, {
                duration: 1,
                ease: "power2.inOut",
                x: finalPos.x,
                y: finalPos.y,
                z: finalPos.z,
                onComplete: resolve,
            });
        });

        const rotPromise = new Promise<void>((resolve) => {
            const obj = { t: 0 };
            gsap.to(obj, {
                t: 1,
                duration: 1,
                ease: "power2.out",
                onUpdate: () => {
                    camera.quaternion.slerpQuaternions(startQuat, finalQuat, obj.t);
                },
                onComplete: resolve,
            });
        });

        // wait for both to finish
        await Promise.all([posPromise, rotPromise]).then(() => {
            setButtonDisabled(false);
        })

        // update orbit controls target and re-enable orbit
        if (controls) {
            if (!controls.target) controls.target = new THREE.Vector3();
            controls.target.set(position.x, position.y, position.z);
            controls.update();
        }

        setEnableOrbit(true);
        setHidden(false);
    };

    const resetCamera = async () => {
        setEnableOrbit(false);
        setHidden(true);

        const camera = cameraRef.current;
        if (!camera) return;

        const finalPos = new THREE.Vector3(0, 4 , 7);

        const posPromise = new Promise<void>((resolve) => {
            gsap.to(camera.position, {
                duration: 1,
                ease: "power2.inOut",
                x: finalPos.x,
                y: finalPos.y,
                z: finalPos.z,
                onComplete: resolve,
            });
        });

        // compute quaternion for the default look direction (look at origin)
        const lookAtMatrix = new THREE.Matrix4();
        lookAtMatrix.lookAt(finalPos, new THREE.Vector3(0, 2, 0), camera.up);
        const finalQuat = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);
        const startQuat = camera.quaternion.clone();

        const rotPromise = new Promise<void>((resolve) => {
            const obj = { t: 0 };
            gsap.to(obj, {
                t: 1,
                duration: 1,
                delay: 0.5,
                ease: "power2.out",
                onUpdate: () => {
                    camera.quaternion.slerpQuaternions(startQuat, finalQuat, obj.t);
                },
                onComplete: resolve,
            });
        });

        await Promise.all([posPromise, rotPromise])
    };

  return (
      <div className="w-full h-screen">
            <Canvas shadows>
                <ambientLight intensity={2}></ambientLight>

                <MySpotLight />

                <AnimatedCamera cameraRef={cameraRef}/>

                <group>
                    <group>
                        <Palm size={[3, 3, 3]} path={"/models/first_palm.glb"} position={[10, -2, -2]} rotation={[0, 0,  0.2]}/>
                        <Palm size={[2, 2, 2]} path={"/models/second_palm.glb"} position={[-8, -2, -2]} rotation={[0, 0,  -0.3]}/>
                        <Beach position={[0, -1.5, 0]}></Beach>
                    </group>

                    <Box guiRef={guiRef} moveToObject={moveToObject} boxRef={boxRef} position={[-3, 1, 0]} colors={["skyblue", "blue"]} />
                    {/*<Box guiRef={guiRef} moveToCube={moveToCube} boxRef={box1Ref} position={[0, 2, 0]} colors={["green", "yellow"]}/>*/}
                    {/*<Box guiRef={guiRef} moveToObject={moveToObject} boxRef={box2Ref} position={[4, 2, 0]} colors={["hotpink", "orange"]}/>*/}

                    <Donut position={[0, 1, 0]} rotation={[-0.94, 2.77, 0]} guiRef={guiRef} donutRef={donutRef} moveToObject={moveToObject}></Donut>

                    <Ico position={[3, 1, 0]} guiRef={guiRef} icoRef={icoRef} moveToObject={moveToObject} />

                    <group>
                        <TextBackground position={[-5.7, 2, -5]}></TextBackground>
                    </group>

                    <group>
                        <WoodBox position={[0, 0.5, -4.5]} size={[12, 2, 3]}></WoodBox>
                        <WoodBox position={[0, -1, 0]} size={[12, 1, 6]}></WoodBox>
                    </group>
                </group>

                <Environment files="/hdrs/sky_4k.hdr" background />

                <OrbitControls enableZoom={false} enabled={enableOrbit} ref={controlsRef} maxPolarAngle={Math.PI / 2} enablePan={false}></OrbitControls>
            </Canvas>

            <div>
                <button disabled={buttonDisabled} className={`${hidden ? "hidden" : "absolute"} top-10 right-15 border-slate-100 text-black`} onClick={() => resetCamera()}>Close</button>
            </div>

            <div className={`${hidden ? "hidden" : "absolute"} left-9/20 bottom-10 text-center`}>
                <p className="text-black">Rotate!</p>
                <p className="text-black">Press to reset Position</p>
            </div>
    </div>
  )
}

export default App
