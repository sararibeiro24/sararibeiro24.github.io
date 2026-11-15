import * as THREE from 'three';

function createBox(width, height, depth, material, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.set(x, y, z);
    return mesh;
}

function createLaptop({ LAPTOP_POS = new THREE.Vector3(0.06, 0.638, 0.6) } = {}) {

    const group = new THREE.Group();
    group.position.copy(LAPTOP_POS);

    const keyboardWidth = 0.28;
    const keyboardDepth = (keyboardWidth * 344) / 898;
    const keyboardCenterZ = 0.026;

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.8,
        roughness: 0.25,
    });

    // Base
    group.add(createBox(0.34, 0.01, 0.22, metalMaterial, 0, 0.005, 0));

    // Keyboard
    const keyboardTexture = new THREE.TextureLoader().load('/keyboard.png');
    keyboardTexture.colorSpace = THREE.SRGBColorSpace;
    keyboardTexture.anisotropy = 4;

    const keyboard = new THREE.Mesh(
        new THREE.PlaneGeometry(keyboardWidth, keyboardDepth),
        new THREE.MeshStandardMaterial({
            map: keyboardTexture,
            roughness: 0.45,
            metalness: 0.15,
            emissive: 0x00d8f6,
            emissiveIntensity: 0.12,
            emissiveMap: keyboardTexture,
        })
    );
    keyboard.position.set(0, 0.0108, keyboardCenterZ);
    keyboard.rotation.set(-Math.PI / 2, 0, Math.PI);
    group.add(keyboard);

    // Lid
    const lid = new THREE.Group();
    lid.position.set(0, 0.01, 0.105);
    lid.rotation.x = 0.28;
    lid.add(createBox(0.34, 0.2, 0.007, metalMaterial, 0, 0.105, 0));
    group.add(lid);

    const screenLight = new THREE.PointLight(0x38bdf8, 1.4, 1.3);
    screenLight.position.set(LAPTOP_POS.x, 0.8, 0.5);

    return { group, screenLight, kbTex: keyboardTexture };
}

export { createLaptop };