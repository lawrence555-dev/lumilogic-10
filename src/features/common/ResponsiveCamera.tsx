import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ResponsiveCameraProps {
    defaultZ?: number;
    mobileZ?: number; // Distance for narrow screens or mobile landscape
}

export function ResponsiveCamera({ defaultZ = 11, mobileZ = 16 }: ResponsiveCameraProps) {
    const { camera, size } = useThree();

    useFrame(() => {
        // Detect Mobile Landscape-ish ratio or just small width
        const isSmallScreen = size.width < 1024;
        const targetZ = isSmallScreen ? mobileZ : defaultZ;

        // Smooth Lerp
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    });

    return null;
}
