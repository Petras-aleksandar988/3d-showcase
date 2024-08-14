import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';

let myTWEEN; 
let originalStartPosition;  
let originalTargetPosition;

export function animateCamera(camera, targetPosition, duration = 2000, easing = TWEEN.Easing.Quadratic.InOut) {
    const startPosition = camera.position.clone();
    const target = new THREE.Vector3().copy(targetPosition);

    originalStartPosition = startPosition.clone();
    originalTargetPosition = target.clone();  

    myTWEEN = new TWEEN.Tween(startPosition)
        .to(target, duration)
        .easing(easing)
        .onUpdate(() => {
            camera.position.copy(startPosition);
            camera.lookAt(0, 0.35, 0); // Look at a specific point

        })
        .start();

        myTWEEN.startPosition = startPosition;
        myTWEEN.targetPosition = targetPosition;
        console.log(myTWEEN.startPosition);
        console.log(myTWEEN.targetPosition);
}

export function reverseCameraAnimation(camera, duration = 2000, easing = TWEEN.Easing.Quadratic.InOut) {
    console.log(originalStartPosition);
    console.log(originalTargetPosition);

    if (myTWEEN) {
        myTWEEN = new TWEEN.Tween(originalTargetPosition.clone())  // Start from the original target position
            .to(originalStartPosition, duration)  // Animate back to the original start position
            .easing(easing)
            .onUpdate((updatedPosition) => {
                camera.position.copy(updatedPosition);  // Update camera position
                camera.lookAt(0, 0.35, 0);  // Look at a specific point
            })
            .start();
    }
}


export function updateCameraAnimation() {
    if (myTWEEN) {
        myTWEEN.update();
    }
}
