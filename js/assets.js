import * as THREE from "three";
export default [
    {
        name: "ovini_chair_optimized",
        type: "glbModel",
        path: "/models/ovini_chair_optimized.glb",
        pathFabric: "/textures/fabric.png",       
        pathLegs: "/textures/legs.png",   
        annotationFabricPos: new THREE.Vector3(0, 0.55, 0.4),
        annotationFabricMobilePos: new THREE.Vector3(0, 0.7, 0.1),
        annotationLegsPos:  new THREE.Vector3(0, 0.15, -0.3),
        annotationLegsMobilePos: new THREE.Vector3(0, -0.08, -0.1)
    }
]