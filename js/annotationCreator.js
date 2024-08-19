import * as THREE from 'three';


export class Annotation {
    constructor(scene, position, textureUrl, width = 0.2, height = 0.2) {
        this.scene = scene;

        const spriteMaterial = new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load(textureUrl),
            depthTest: true,
            depthWrite: true,
            blending: THREE.NormalBlending,
        });

        this.sprite = new THREE.Sprite(spriteMaterial);
        this.sprite.position.copy(position);
        this.sprite.scale.set(width, height, 1);

        this.scene.add(this.sprite);
        this.onMouseClick = null; // Initialize as null for later use
    }

    setVisibility(visible) {
        this.sprite.visible = visible;
        this.updateInteraction(); // Automatically update interaction based on visibility
    }

    setInteraction(camera, onClick) {
        this.camera = camera; // Store camera reference
        this.onClick = onClick; // Store the callback function
        this.updateInteraction(); // Apply interaction state
    }

    updateInteraction() {
        // Disable interaction if the annotation is not visible
        if (!this.sprite.visible) {
            if (this.onMouseClick) {
                window.removeEventListener('click', this.onMouseClick, false);
                this.onMouseClick = null;
            }
        } else {
            // Enable interaction if the annotation is visible
            if (!this.onMouseClick && this.camera && this.onClick) {
                const raycaster = new THREE.Raycaster();
                const mouse = new THREE.Vector2();

                this.onMouseClick = (event) => {
                    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                    raycaster.setFromCamera(mouse, this.camera);
                    const intersects = raycaster.intersectObject(this.sprite);

                    if (intersects.length > 0 && this.onClick) {
                        this.onClick();
                    }
                };

                window.addEventListener('click', this.onMouseClick, false);
            }
        }
    }
}
