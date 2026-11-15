import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createDesk } from './Desk.js';
import { createChair } from './Chair.js';
import { createLaptop } from './Laptop.js';
import { createMouse } from './Mouse.js';
import { createBottle } from './Bottle.js';
import { createPhone } from './Phone.js';
import { setupInteraction } from './interaction.js';
import { startAnimation } from './animation.js';

export const SCENE_CONFIG = {
    SEAT_TOP: 0.398,
    DESK_Y: 0.635,
    MAT_TOP: 0.635 + 0.003,
    DESK_FRONT_Z: 0.45,
    DESK_DEPTH: 0.6,
    DESK_CENTER_Z: 0.45 + 0.6 / 2,
    LAPTOP_POS: new THREE.Vector3(0.06, 0.635 + 0.003, 0.6),
    MOUSE_HOME: { x: -0.25, z: 0.58 },
    MOUSE_LIFT: 0.008,
    MOUSE_Z_OFFSET: -0.02,
    MOUSE_ZONE_X: -0.14,
};

export const initScene = (container, { onProgress, onLoad, onError } = {}) => {
    if (!container) return { dispose: () => {} };

    let disposed = false;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 340;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 40);
    camera.position.set(2.2, 1.5, 1.35);
    camera.lookAt(0, 0.68, 0.45);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1.1));

    const keyLight = new THREE.DirectionalLight(0xf8fafc, 1.8);
    keyLight.position.set(2.8, 3.8, 2.8);
    scene.add(keyLight);

    const cyanRim = new THREE.PointLight(0x00d8f6, 3.2, 9);
    cyanRim.position.set(-2.5, 2.2, -2.2);
    scene.add(cyanRim);

    const blueFill = new THREE.PointLight(0x38bdf8, 1.2, 7);
    blueFill.position.set(0, -1.5, 2.5);
    scene.add(blueFill);

    // 4. Main diorama group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Pedestal floor & ring
    const floor = new THREE.Mesh(
        new THREE.CylinderGeometry(1.18, 1.22, 0.03, 36),
        new THREE.MeshStandardMaterial({ color: 0x080e18 })
    );
    floor.position.set(0, -0.015, 0.4);
    mainGroup.add(floor);

    const floorRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.2, 0.006, 8, 48),
        new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.4 })
    );
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.set(0, 0.002, 0.4);
    mainGroup.add(floorRing);

    // 5. Modular objects
    const { group: deskGroup, legMaterial } = createDesk({
        DESK_Y: SCENE_CONFIG.DESK_Y,
        DESK_DEPTH: SCENE_CONFIG.DESK_DEPTH,
        DESK_FRONT_Z: SCENE_CONFIG.DESK_FRONT_Z,
        DESK_CENTER_Z: SCENE_CONFIG.DESK_CENTER_Z,
    });

    const { group: chairGroup } = createChair({
        SEAT_TOP: SCENE_CONFIG.SEAT_TOP,
        legMat: legMaterial,
    });
    deskGroup.add(chairGroup);

    const { group: laptopGroup, screenLight, kbTex } = createLaptop({
        LAPTOP_POS: SCENE_CONFIG.LAPTOP_POS,
    });
    deskGroup.add(laptopGroup);
    deskGroup.add(screenLight);

    const mouseObj = createMouse({
        MOUSE_HOME: SCENE_CONFIG.MOUSE_HOME,
        MAT_TOP: SCENE_CONFIG.MAT_TOP,
        MOUSE_LIFT: SCENE_CONFIG.MOUSE_LIFT,
    });
    const mouseGroup = mouseObj.group;
    deskGroup.add(mouseGroup);

    const { group: bottle } = createBottle({ DESK_Y: SCENE_CONFIG.DESK_Y });
    deskGroup.add(bottle);

    const { mesh: phone } = createPhone({ DESK_Y: SCENE_CONFIG.DESK_Y });
    deskGroup.add(phone);

    mainGroup.add(deskGroup);

    // 6. Character model (typing.glb)
    let mixer = null;
    let rightHand = null;

    new GLTFLoader().load(
        '/models/typing.glb',
        (gltf) => {
            if (disposed) return;
            const model = gltf.scene;

            model.traverse((child) => {
                if (child.isBone && /RightHandMiddle1$/.test(child.name)) {
                    rightHand = child;
                }
                if (child.isMesh && child.material) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.frustumCulled = false;
                }
            });

            mainGroup.add(model);

            if (gltf.animations && gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(model);
                const action = mixer.clipAction(gltf.animations[0]);
                action.setLoop(THREE.LoopRepeat, Infinity);
                action.play();
            }

            onLoad?.();
        },
        (xhr) => {
            if (disposed) return;
            if (xhr.total > 0) {
                onProgress?.(Math.min(100, Math.round((xhr.loaded / xhr.total) * 100)));
            } else {
                onProgress?.((prev) => Math.min(95, (prev || 0) + 12));
            }
        },
        (error) => {
            console.error('Error loading typing.glb:', error);
            onError?.(error);
            if (!disposed) onLoad?.();
        }
    );

    // 7. Interaction & Animation
    const { state: interactionState, cleanup: cleanupInteraction } = setupInteraction({
        domElement: renderer.domElement,
        container,
        camera,
        renderer,
        mouseObj,
    });

    const { stop: stopAnimation } = startAnimation({
        scene,
        camera,
        renderer,
        container,
        mainGroup,
        deskGroup,
        mouseGroup,
        getMixer: () => mixer,
        getRightHand: () => rightHand,
        interactionState,
        SCENE_CONFIG,
    });

    // 8. Cleanup
    const dispose = () => {
        disposed = true;
        stopAnimation();
        cleanupInteraction();
        if (mixer) mixer.stopAllAction();

        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.geometry?.dispose();
                const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
                mats.forEach((m) => m?.dispose());
            }
        });
        kbTex?.dispose();
        renderer.dispose();

        if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
        }
    };

    return { dispose, renderer, scene, camera };
};
