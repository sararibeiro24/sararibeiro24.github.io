import * as THREE from 'three';

function createMouse({
    MOUSE_HOME = { x: -0.25, y: 0.68, z: 0.58 },
    MAT_TOP = 0.638,
    MOUSE_LIFT = 0.008,
} = {}) {
    const group = new THREE.Group();
    const startY = MOUSE_HOME.y ?? (MAT_TOP + MOUSE_LIFT);
    group.position.set(MOUSE_HOME.x, startY, MOUSE_HOME.z);
    group.rotation.y = 0.12;

    // Body
    const mouseBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.027, 0.031, 0.102, 16),
        new THREE.MeshStandardMaterial({ color: 0x1e293b })
    );
    mouseBody.rotation.x = Math.PI / 2;
    mouseBody.scale.set(1, 0.95, 0.45);
    mouseBody.position.set(0, 0, 0);
    group.add(mouseBody);

    // Seam
    const seam = new THREE.Mesh(
        new THREE.BoxGeometry(0.002, 0.003, 0.045),
        new THREE.MeshBasicMaterial({ color: 0x09090b })
    );
    seam.position.set(0, 0.012, 0.024);
    group.add(seam);

    // Wheel
    const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.0045, 0.0045, 0.005, 10),
        new THREE.MeshBasicMaterial({ color: 0x00e5ff })
    );
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(0, 0.013, 0.02);
    group.add(wheel);

    // Glow
    const glow = new THREE.Mesh(
        new THREE.PlaneGeometry(0.045, 0.065),
        new THREE.MeshBasicMaterial({
            color: 0x00e5ff,
            transparent: true,
            opacity: 0.35,
        })
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.set(0, -0.013, 0);
    group.add(glow);

    return {
        group,
        onDown: () => { mouseBody.position.y = -0.003; },
        onUp: () => { mouseBody.position.y = 0; },
        onLeave: () => { mouseBody.position.y = 0; },
    };
}

export { createMouse };
