import * as THREE from 'three';
import { initScene, animate } from './scene.js';
import { loadModel, changeModelColor } from './modelLoader.js';
import { annotationInteraction, createAnnotation } from './annotation.js';

//globals
const MODEL_PATH = '/models/ovini_chair.glb';
let MATERIAL_NAME = '';
let COLOR_HEX = '';


function init() {
    const canvas = document.getElementById('canvas');
    const {scene, camera, renderer} = initScene(canvas);

    //Adding model to scene
    loadModel(scene, MODEL_PATH);


    // Build annotations
    const annotations1 = createAnnotation(scene, new THREE.Vector3(0, 0.1, 0.5), '/textures/toll-free.png');

   
    setupAnnotationToggle(annotations1, camera);

    // annotationInteraction(camera, annotations1, ()=>{
    //     console.log("annotation 1 clicked");
    // });

    
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

 

function setupAnnotationToggle(annotation, camera) {

    //hide on start scene
    setAnnotationVisibility(annotation, false);

    document.getElementById('button1').addEventListener('click', () => {
        setAnnotationVisibility(annotation, false);

        annotationInteraction(camera, annotation, () => {
            console.log("annotation clicked");
        }, false); 
    });

    document.getElementById('button2').addEventListener('click', () => {

        setAnnotationVisibility(annotation, true);

        annotationInteraction(camera, annotation, () => {
            console.log("annotation clicked");
        }, true); 

        
    
    });
}

function setAnnotationVisibility(annotation, visible) {
    annotation.visible = visible;

} 

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


