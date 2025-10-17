import {Text3D, useMatcapTexture} from "@react-three/drei";
import type {FC} from "react";

const fontUrl = "/Fonts/BoldFont3d.json"

interface TextProps {
    position: [number, number, number];
}

const TextBackground: FC<TextProps> = (props) => {
    const [matcap] = useMatcapTexture("2E763A_78A0B7_B3D1CF_14F209", 64)

    return (
        <>
            <Text3D
                font={fontUrl}
                size={1.7}
                height={0.5}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.05}
                bevelSize={0.05}
                bevelOffset={0}
                bevelSegments={5}
                position={props.position}
            >
                Fisherino
                <meshMatcapMaterial matcap={matcap}/>
            </Text3D>
        </>
    )
}

export default TextBackground