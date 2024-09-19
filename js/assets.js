import * as THREE from "three";
export default [
    {   id: "10",
        name: "Ovini chair",
        type: "glbModel",
        path: "/models/ovini_chair.glb",
        pathFabric: "/textures/fabric.png",       
        pathLegs: "/textures/legs.png",   
        annotationFabricPos: new THREE.Vector3(0, 0.55, 0.4),
        annotationFabricMobilePos: new THREE.Vector3(0, 0.7, 0.1),
        annotationLegsPos:  new THREE.Vector3(0, 0.15, -0.3),
        annotationLegsMobilePos: new THREE.Vector3(0, -0.08, -0.1),
        cameraPos: new THREE.Vector3(2, 0.35, 0),
        cameraPosMobile: new THREE.Vector3(2.6, 0.35, 0),
        animateFabricDesctop: new THREE.Vector3(0.6, 1.5, 0.4),
        animateFabricMobile: new THREE.Vector3(0.9, 1.5, 0.5),
        animateLegsDesctop: new THREE.Vector3(1, -0.2,0.3),
        animateLegsMobile:new THREE.Vector3(1.2, -0.8, 0.9),
        animateBodyMobile:new THREE.Vector3(2.4, 0.35, 0),
        animateBodyDesctop: new THREE.Vector3(1.5, 0.35, 0),
        parts: [
            { id: "body", label: "Body" },
            { id: "laces", label: "Laces" },
            { id: "fabric", label: "Fabric" },
            { id: "legs", label: "Legs" }
        ],
        colors: [
            { "name": "ALUMINUM", "color": "#d4c8a3" },
            { "name": "BLACK", "color": "#444444" },
            { "name": "RED", "color": "#FF0000" },
            { "name": "BLUE", "color": "#0000FF" },
            { "name": "GREEN", "color": "#6AA84F" },
            { "name": "ORANGE", "color": "#E69138" }
          ], 
          materials: {
            body: "metal_mat",    
            fabric: "fabric_mat", 
            laces: "laces_mat",   
            legs: "wood_mat"      
        },
    },
    {    id: "11",
        name: "Tamarack chair",
        type: "glbModel",
        path: "/models/tamarack_chair_w_shadow.glb",
        pathFabric: "/textures/fabric.png",       
        pathLegs: "/textures/legs.png",   
        annotationFabricPos: new THREE.Vector3(0, 0.55, 0.4),
        annotationFabricMobilePos: new THREE.Vector3(0, 0.7, 0.1),
        annotationLegsPos:  new THREE.Vector3(0, 0.15, -0.6),
        annotationLegsMobilePos: new THREE.Vector3(0, -0.25, -0.3),
        cameraPos: new THREE.Vector3(2.3, 1.3, 1.5),
        cameraPosMobile: new THREE.Vector3(3.5, 2, 1.9),
        animateFabricDesctop:new THREE.Vector3(1, 1.5, 0.4),
        animateFabricMobile: new THREE.Vector3(2.3, 1.2, 0.9),
        animateLegsDesctop: new THREE.Vector3(1, -0.2, 0.3),
        animateLegsMobile: new THREE.Vector3(2.5, -0.4, 1.3),
        animateBodyMobile:new THREE.Vector3(3, 1.5, 0.9),
        animateBodyDesctop:new THREE.Vector3(1.8, 1, 0.5),
        parts: [
            { id: "body", label: "Body" },
        
        ],
        colors: [
            { "name": "ALUMINUM", "color": "#d4c8a3" },
            { "name": "BLACK", "color": "#444444" },
            { "name": "RED", "color": "#FF0000" },
            { "name": "BLUE", "color": "#0000FF" },
            { "name": "GREEN", "color": "#6AA84F" },
            { "name": "ORANGE", "color": "#E69138" }
          ],

          materials: {
            body: "tamarack_mat",   
           
        },
    }
]