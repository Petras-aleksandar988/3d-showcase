import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



let MODEL_LOADED = null;

/**
 * Loads a GLTF model and adds it to the provided scene.
 * @param {THREE.Scene} scene - The Three.js scene to add the model to.
 * @param {string} modelPath - The path to the GLTF model file.
 * @param {Function} onLoad - Callback function to execute once the model is loaded.
 */
export function loadModel(scene, modelPath) {
    const loader = new GLTFLoader();

    loader.load(modelPath, (gltf) => {
        MODEL_LOADED = gltf.scene;
        scene.add(MODEL_LOADED);
    });
}


/**
 * Changes the color of the loaded model.
 * @param {THREE.Color | string} color - The color to apply to the material.
 * @param {THREE.Color | string} materialName - The material to apply the color.
 */
export function changeModelColor(materialName, color) {
    if (MODEL_LOADED) {

        let materialFound = false;

        MODEL_LOADED.traverse((child) => {
            if (child.isMesh && child.material) {
                if(child.material.name === materialName){

                    // child.material.map = null; // Remove texture map
                    child.material.color.set(color);
                    materialFound = true;
                }
            }
        });
        
        if(!materialFound){
            console.warn("There is no material named " + materialName)
        }
    } else {
        console.warn('Model is not loaded yet.');
    }
}

