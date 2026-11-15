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
    getMouseAnchor,
    interactionState,
    SCENE_CONFIG,
}) {
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
    }, { threshold: 0 });
    observer.observe(container);

    const clock = new THREE.Clock();
    const anchorPos = new THREE.Vector3();
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

        // Tilt
        mainGroup.rotation.y += (interactionState.targetRotY - mainGroup.rotation.y) * 0.05;
        mainGroup.rotation.x += (-interactionState.targetRotX - mainGroup.rotation.x) * 0.05;

        // Anchor tracking
        const mouseAnchor = getMouseAnchor?.();
        if (mouseAnchor) {
            mainGroup.updateMatrixWorld(true);
            mouseAnchor.getWorldPosition(anchorPos);
            deskGroup.worldToLocal(anchorPos);

            const dx = anchorPos.x - SCENE_CONFIG.MOUSE_HOME.x;
            const dz = anchorPos.z - SCENE_CONFIG.MOUSE_HOME.z;
            const distance = Math.hypot(dx, dz);

            const weight = 1 - THREE.MathUtils.smoothstep(
                distance,
                SCENE_CONFIG.MOUSE_FOLLOW_NEAR,
                SCENE_CONFIG.MOUSE_FOLLOW_FAR
            );

            mouseTargetX = SCENE_CONFIG.MOUSE_HOME.x + dx * weight;
            mouseTargetZ = SCENE_CONFIG.MOUSE_HOME.z + dz * weight;
        } else {
            mouseTargetX = SCENE_CONFIG.MOUSE_HOME.x;
            mouseTargetZ = SCENE_CONFIG.MOUSE_HOME.z;
        }

        // Clamp
        mouseTargetX = Math.max(-0.34, Math.min(-0.14, mouseTargetX));
        mouseTargetZ = Math.max(0.5, Math.min(0.7, mouseTargetZ));

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

