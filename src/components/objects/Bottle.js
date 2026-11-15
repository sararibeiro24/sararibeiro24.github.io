import * as THREE from 'three';

function createBottle({
    DESK_Y = 0.635,
    pos = new THREE.Vector3(0.42, DESK_Y, 0.82),
} = {}) {
    const group = new THREE.Group();
    group.position.copy(pos);

    const bottleMat = new THREE.MeshStandardMaterial({ color: 0xcfd8e0 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x18181b });
    const cyanMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });

    // Body
    const profile = [
        [0, 0], [0.03, 0], [0.032, 0.004], [0.032, 0.15],
        [0.03, 0.17], [0.022, 0.184], [0.016, 0.19], [0.016, 0.205]
    ].map(([r, y]) => new THREE.Vector2(r, y));

    group.add(new THREE.Mesh(new THREE.LatheGeometry(profile, 24), bottleMat));

    // Cap
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.019, 0.019, 0.035, 16), darkMat);
    cap.position.y = 0.2225;
    group.add(cap);

    const loop = new THREE.Mesh(new THREE.TorusGeometry(0.012, 0.0025, 8, 16), darkMat);
    loop.position.y = 0.243;
    loop.rotation.y = Math.PI / 2;
    group.add(loop);

    // Ring
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.0325, 0.0325, 0.006, 24), cyanMat);
    ring.position.y = 0.06;
    group.add(ring);

    return { group };
}

export { createBottle };
