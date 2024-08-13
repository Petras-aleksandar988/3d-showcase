import * as THREE from 'three';

/**
 * Creates an annotation using a sprite and adds it to the scene.
 * @param {THREE.Scene} scene - The Three.js scene to add the annotation to.
 * @param {THREE.Camera} camera - The camera used for raycasting.
 * @param {THREE.WebGLRenderer} renderer - The renderer used for rendering.
 * @param {THREE.Vector3} position - The position of the annotation.
 * @param {string} textureUrl - The URL of the sprite texture.
 * @param {number} color - The color of the sprite.
 * @param {Function} onClick - The callback function to execute on click.
 * @param {number} [width=1] - The width of the sprite.
 * @param {number} [height=1] - The height of the sprite.
 */
export function createAnnotation(scene, camera, renderer, position, textureUrl, color, onClick, width = 1, height = 1) {
    // Create a sprite material
    const spriteMaterial = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load(textureUrl),
        color: color,
        depthTest: false, // Disable depth test
        depthWrite: false, // Disable depth write
        // Use blending to ensure the sprite appears correctly
        blending: THREE.NormalBlending,

    });

    // Create the sprite
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.copy(position); // Set the position of the sprite
    sprite.scale.set(width, height, 1); // Set the dimensions of the sprite

    // Add the sprite to the scene
    scene.add(sprite);

    // Add interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the raycaster with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObject(sprite);

        if (intersects.length > 0) {
            onClick(); // Execute the onClick callback if the sprite is clicked
        }
    }

    // Add event listener for mouse click
    window.addEventListener('click', onMouseClick, false);

    return sprite;
}
