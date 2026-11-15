import * as THREE from 'three';

function createBox(w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    return mesh;
}

function createChair({
    SEAT_TOP = 0.398,
    CHAIR_Z = 0.09,
    legMat,
} = {}) {
    const group = new THREE.Group();

    const chairMat = new THREE.MeshStandardMaterial({ color: 0x18181b });
    const legMaterial = legMat || new THREE.MeshStandardMaterial({ color: 0x0f172a });

    // Seat
    group.add(createBox(0.44, 0.045, 0.42, chairMat, 0, SEAT_TOP - 0.0225, CHAIR_Z));

    // Backrest
    const back = createBox(0.38, 0.34, 0.035, chairMat, 0, 0.62, -0.085);
    back.rotation.x = -0.05;
    group.add(back);

    // Bracket & post
    group.add(createBox(0.04, 0.2, 0.03, legMaterial, 0, 0.48, -0.1));

    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.32, 10), legMaterial);
    post.position.set(0, 0.2, CHAIR_Z);
    group.add(post);

    // Base
    const spokeLen = 0.24;
    const spokeGeo = new THREE.CylinderGeometry(0.012, 0.012, spokeLen, 6);
    spokeGeo.rotateZ(Math.PI / 2);
    const casterGeo = new THREE.SphereGeometry(0.02, 8, 8);

    for (let c = 0; c < 5; c++) {
        const arm = new THREE.Group();
        arm.position.set(0, 0.04, CHAIR_Z);
        arm.rotation.y = (c * Math.PI * 2) / 5;

        const spoke = new THREE.Mesh(spokeGeo, legMaterial);
        spoke.position.set(spokeLen / 2, 0, 0);
        arm.add(spoke);

        const caster = new THREE.Mesh(casterGeo, legMaterial);
        caster.position.set(spokeLen, -0.02, 0);
        arm.add(caster);

        group.add(arm);
    }

    return { group };
}

export { createChair };
