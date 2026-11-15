import * as THREE from 'three';

function createBox(w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    return mesh;
}

function createCylinder(r, h, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 12), mat);
    mesh.position.set(x, y, z);
    return mesh;
}

function createDesk({
    DESK_Y = 0.635,
    DESK_DEPTH = 0.6,
    DESK_FRONT_Z = 0.45,
    DESK_CENTER_Z = 0.45 + 0.6 / 2,
    DESK_THICK = 0.025,
    legMat,
} = {}) {
    const group = new THREE.Group();

    const deskMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const legMaterial = legMat || new THREE.MeshStandardMaterial({ color: 0x0f172a });
    const cyanMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const padMat = new THREE.MeshStandardMaterial({ color: 0x0b1120 });

    // Tabletop & cyan front edge
    group.add(createBox(1.15, DESK_THICK, DESK_DEPTH, deskMat, 0, DESK_Y - DESK_THICK / 2, DESK_CENTER_Z));
    group.add(createBox(1.152, 0.005, 0.006, cyanMat, 0, DESK_Y - 0.004, DESK_FRONT_Z + DESK_DEPTH + 0.002));

    // Legs & feet
    const legH = DESK_Y - DESK_THICK;
    [-0.53, 0.53].forEach((x) => {
        group.add(createCylinder(0.016, legH, legMaterial, x, legH / 2, DESK_FRONT_Z + 0.08));
        group.add(createCylinder(0.016, legH, legMaterial, x, legH / 2, DESK_FRONT_Z + DESK_DEPTH - 0.08));
        group.add(createBox(0.035, 0.02, DESK_DEPTH - 0.1, legMaterial, x, 0.01, DESK_CENTER_Z));
    });

    // Desk mat
    group.add(createBox(0.68, 0.003, 0.32, padMat, -0.04, DESK_Y + 0.0015, 0.64));

    return { group, legMaterial };
}

export { createDesk };
