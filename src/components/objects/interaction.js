function setupInteraction({ domElement, container, camera, renderer, mouseObj }) {
    const state = {
        targetRotX: 0,
        targetRotY: 0,
    };

    const onPointerMove = (e) => {
        const rect = domElement.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        state.targetRotY = mouseX * 0.28;
        state.targetRotX = mouseY * 0.16;
    };

    const onPointerDown = () => mouseObj?.onDown();
    const onPointerUp = () => mouseObj?.onUp();
    const onPointerLeave = () => {
        state.targetRotX = 0;
        state.targetRotY = 0;
        mouseObj?.onLeave();
    };

    const handleResize = () => {
        if (!container) return;
        const nw = container.clientWidth || 320;
        const nh = container.clientHeight || 340;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
    };

    domElement.style.cursor = 'pointer';
    domElement.addEventListener('pointermove', onPointerMove, { passive: true });
    domElement.addEventListener('pointerdown', onPointerDown, { passive: true });
    domElement.addEventListener('pointerup', onPointerUp, { passive: true });
    domElement.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('resize', handleResize);

    const cleanup = () => {
        domElement.removeEventListener('pointermove', onPointerMove);
        domElement.removeEventListener('pointerdown', onPointerDown);
        domElement.removeEventListener('pointerup', onPointerUp);
        domElement.removeEventListener('pointerleave', onPointerLeave);
        window.removeEventListener('resize', handleResize);
    };

    return { state, cleanup };
}

export { setupInteraction };

