import * as THREE from 'three';

function createPhone({
    DESK_Y = 0.635,
    pos = new THREE.Vector3(0.42, DESK_Y + 0.0035, 0.6),
    rotationY = -0.2,
} = {}) {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.065, 0.007, 0.13),
        new THREE.MeshStandardMaterial({ color: 0x09090b })
    );
    mesh.position.copy(pos);
    mesh.rotation.y = rotationY;

    return { mesh };
}

export { createPhone };
