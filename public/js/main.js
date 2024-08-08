import * as THREE from 'three';
import { initScene, animate } from './scene.js';
import { loadModel, changeModelColor } from './modelLoader.js';
import { createAnnotation } from './annotation.js';


const MODEL_PATH = '/models/ovini_chair.glb';
let MATERIAL_NAME = '';
let COLOR_HEX = '';


function init() {
    const canvas = document.getElementById('canvas');
    const { scene, camera, renderer} = initScene(canvas);

    //Adding model to scene
    loadModel(scene, MODEL_PATH);


    // Create annotations
    const annotation1Position = new THREE.Vector3(0, 0.1, 0.5);
    const annotation2Position = new THREE.Vector3(0, 0.5, -0.5);
    const annotationTextureUrl = '/textures/toll-free.png';
    const annotationColor = 0xff0000;
    const annotationWidth = 0.2; 
    const annotationHeight = 0.2; 

    createAnnotation(scene, camera, renderer, annotation1Position, annotationTextureUrl, annotationColor, () => {
        console.log('Annotation 1 clicked!');
    }, annotationWidth, annotationHeight);

    createAnnotation(scene, camera, renderer, annotation2Position, annotationTextureUrl, annotationColor, () => {
        console.log('Annotation 2 clicked!');
    }, annotationWidth, annotationHeight);

    function resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', resize);
    animate(scene, camera, renderer);
    
    //Updates the size of the renderer and the aspect ratio of the camera when the window resizes.
    resize();
}
init(); 



/**model anotations:
 * fabric_mat,
 * metal_mat,
 * laces_mat,
 * wood_mat
 */

//#008000 green

document.getElementById('button1').addEventListener('click', (event) => {
    MATERIAL_NAME = event.target.getAttribute('data-material');
    console.log("selected material: " + MATERIAL_NAME)
});
document.getElementById('button2').addEventListener('click', (event) => {   
    MATERIAL_NAME = event.target.getAttribute('data-material');
    console.log("selected material: " + MATERIAL_NAME)
});
document.getElementById('button3').addEventListener('click', (event) => {  
    MATERIAL_NAME = event.target.getAttribute('data-material');
    console.log("selected material: " + MATERIAL_NAME)
});
document.getElementById('button4').addEventListener('click', (event) => { 
    MATERIAL_NAME = event.target.getAttribute('data-material');
    console.log("selected material: " + MATERIAL_NAME)
});


//change color 
document.getElementById('changeColorButton').addEventListener('click', (event) => {
    console.log("color change")
    COLOR_HEX = event.target.getAttribute('data-color');
    changeModelColor(MATERIAL_NAME, COLOR_HEX);
});


