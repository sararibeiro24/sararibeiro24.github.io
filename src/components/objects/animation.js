import * as THREE from 'three';

function startAnimation({
    scene,
    camera,
    renderer,
    container,
    mainGroup,
    deskGroup,
    mouseGroup,
    getMixer,
    getRightHand,
    interactionState,
    SCENE_CONFIG,
}) {
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
    }, { threshold: 0 });
    observer.observe(container);

    const clock = new THREE.Clock();
    const handPos = new THREE.Vector3();
    let mouseTargetX = SCENE_CONFIG.MOUSE_HOME.x;
    let mouseTargetZ = SCENE_CONFIG.MOUSE_HOME.z;
    let animId;

    const animate = () => {
        animId = requestAnimationFrame(animate);
        if (!isVisible) {
            clock.getDelta();
            return;
        }

        const delta = Math.min(clock.getDelta(), 0.1);
        const mixer = getMixer();
        if (mixer) mixer.update(delta);

        // Tilt from interaction
        mainGroup.rotation.y += (interactionState.targetRotY - mainGroup.rotation.y) * 0.05;
        mainGroup.rotation.x += (-interactionState.targetRotX - mainGroup.rotation.x) * 0.05;

        // Hand-tracking mouse movement
        const rightHand = getRightHand();
        if (rightHand) {
            mainGroup.updateMatrixWorld(true);
            rightHand.getWorldPosition(handPos);
            deskGroup.worldToLocal(handPos);
            if (handPos.x < SCENE_CONFIG.MOUSE_ZONE_X) {
                mouseTargetX = Math.max(-0.34, Math.min(-0.14, handPos.x));
                mouseTargetZ = Math.max(0.5, Math.min(0.7, handPos.z + SCENE_CONFIG.MOUSE_Z_OFFSET));
            }
        }

        mouseGroup.position.x += (mouseTargetX - mouseGroup.position.x) * 0.14;
        mouseGroup.position.z += (mouseTargetZ - mouseGroup.position.z) * 0.14;
        mouseGroup.rotation.y = 0.12 + (mouseTargetX - mouseGroup.position.x) * 1.8;

        mainGroup.position.y = Math.sin(clock.elapsedTime * 1.4) * 0.015;

        renderer.render(scene, camera);
    };

    animate();

    const stop = () => {
        cancelAnimationFrame(animId);
        observer.disconnect();
    };

    return { stop };
}

export { startAnimation };

