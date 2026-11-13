import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Sparkles, Terminal } from "lucide-react";
import { useLocale } from "../locale-context";

// medidas tiradas da própria animação da Sara (em metros, pés no chão, ela olha para +Z)
const SEAT_TOP = 0.398;
const DESK_Y = 0.635;
const MAT_TOP = DESK_Y + 0.003;
const DESK_FRONT_Z = 0.45;
const DESK_DEPTH = 0.6;
const DESK_CENTER_Z = DESK_FRONT_Z + DESK_DEPTH / 2;

const LAPTOP_POS = new THREE.Vector3(0.06, MAT_TOP, 0.6);
// a mão direita pousa aqui quando vai ao rato
const MOUSE_HOME = { x: -0.25, z: 0.58 };
// o rato fica um pouco acima do tapete e um pouco à frente da articulação do dedo
const MOUSE_LIFT = 0.008;
const MOUSE_Z_OFFSET = -0.02;
// a partir daqui a mão dela já está na zona do rato
const MOUSE_ZONE_X = -0.14;

const createEditorTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 340;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#090d16";
  ctx.fillRect(0, 0, 512, 340);

  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, 512, 32);

  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(18, 16, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#facc15";
  ctx.beginPath();
  ctx.arc(32, 16, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#22c55e";
  ctx.beginPath();
  ctx.arc(46, 16, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1e293b";
  ctx.beginPath();
  ctx.roundRect(65, 5, 120, 27, [4, 4, 0, 0]);
  ctx.fill();
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 11px monospace";
  ctx.fillText("engineer.rs", 80, 22);

  const colors = [
    "#38bdf8",
    "#818cf8",
    "#34d399",
    "#f472b6",
    "#facc15",
    "#cbd5e1",
    "#64748b",
  ];

  let y = 52;
  for (let i = 0; i < 15; i++) {
    const indent =
      i % 5 === 0
        ? 20
        : i % 5 === 1 || i % 5 === 2
        ? 38
        : i % 5 === 3
        ? 56
        : 20;

    let x = indent;
    const tokens = 2 + (i % 4);
    for (let t = 0; t < tokens; t++) {
      const len = 24 + ((i * 19 + t * 37) % 64);
      ctx.fillStyle = colors[(i + t * 2) % colors.length];
      ctx.beginPath();
      ctx.roundRect(x, y, len, 6, 2);
      ctx.fill();
      x += len + 8;
    }
    y += 18;
  }

  ctx.fillStyle = "#00e5ff";
  ctx.fillRect(80, y, 9, 14);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

export const TypingScene = () => {
  const mountRef = useRef(null);
  const { t } = useLocale();
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // StrictMode corre o effect duas vezes, isto evita callbacks atrasados
    let disposed = false;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 40);

    // câmara do lado esquerdo dela para o ecrã não tapar a mão do rato
    const defaultCamPos = new THREE.Vector3(2.2, 1.5, 1.35);
    const targetLookAt = new THREE.Vector3(0, 0.68, 0.45);
    camera.position.copy(defaultCamPos);
    camera.lookAt(targetLookAt);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

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

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const deskGroup = new THREE.Group();

    const DESK_THICK = 0.025;
    const deskTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.15, DESK_THICK, DESK_DEPTH),
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.35,
        metalness: 0.1,
      })
    );
    deskTop.position.set(0, DESK_Y - DESK_THICK / 2, DESK_CENTER_Z);
    deskGroup.add(deskTop);

    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(1.152, 0.005, 0.006),
      new THREE.MeshBasicMaterial({ color: 0x00e5ff })
    );
    strip.position.set(0, DESK_Y - 0.004, DESK_FRONT_Z + DESK_DEPTH + 0.002);
    deskGroup.add(strip);

    const legMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.3,
    });
    const LEG_H = DESK_Y - DESK_THICK;
    const legGeo = new THREE.CylinderGeometry(0.016, 0.016, LEG_H, 12);
    [
      [-0.53, DESK_FRONT_Z + 0.08],
      [0.53, DESK_FRONT_Z + 0.08],
      [-0.53, DESK_FRONT_Z + DESK_DEPTH - 0.08],
      [0.53, DESK_FRONT_Z + DESK_DEPTH - 0.08],
    ].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(lx, LEG_H / 2, lz);
      deskGroup.add(leg);
    });

    const footGeo = new THREE.BoxGeometry(0.035, 0.02, DESK_DEPTH - 0.1);
    [-0.53, 0.53].forEach((fx) => {
      const foot = new THREE.Mesh(footGeo, legMat);
      foot.position.set(fx, 0.01, DESK_CENTER_Z);
      deskGroup.add(foot);
    });

    const deskMat = new THREE.Mesh(
      new THREE.BoxGeometry(0.68, 0.003, 0.32),
      new THREE.MeshStandardMaterial({ color: 0x0b1120, roughness: 0.9 })
    );
    deskMat.position.set(-0.04, DESK_Y + 0.0015, 0.64);
    deskGroup.add(deskMat);

    const laptopGroup = new THREE.Group();
    laptopGroup.position.copy(LAPTOP_POS);

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.8,
      roughness: 0.25,
    });

    const laptopBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.01, 0.22),
      metalMat
    );
    laptopBase.position.set(0, 0.005, 0);
    laptopGroup.add(laptopBase);

    const trackpad = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.001, 0.065),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 })
    );
    trackpad.position.set(0, 0.011, -0.065);
    laptopGroup.add(trackpad);

    const kb = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.002, 0.11),
      new THREE.MeshStandardMaterial({
        color: 0x09090b,
        roughness: 0.8,
        emissive: 0x00d8f6,
        emissiveIntensity: 0.14,
      })
    );
    kb.position.set(0, 0.011, 0.015);
    laptopGroup.add(kb);

    const screenPivot = new THREE.Group();
    screenPivot.position.set(0, 0.01, 0.105);
    screenPivot.rotation.x = 0.28;

    const screenFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.21, 0.007),
      metalMat
    );
    screenFrame.position.set(0, 0.105, 0);
    screenPivot.add(screenFrame);

    const screenTex = createEditorTexture();
    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.3, 0.19),
      new THREE.MeshBasicMaterial({ map: screenTex })
    );
    screenMesh.position.set(0, 0.105, -0.0045);
    screenMesh.rotation.y = Math.PI;
    screenPivot.add(screenMesh);

    laptopGroup.add(screenPivot);
    deskGroup.add(laptopGroup);

    const screenLight = new THREE.PointLight(0x38bdf8, 1.4, 1.3);
    screenLight.position.set(LAPTOP_POS.x, 0.8, 0.5);
    deskGroup.add(screenLight);

    const mouseGroup = new THREE.Group();
    let mouseTargetX = MOUSE_HOME.x;
    let mouseTargetZ = MOUSE_HOME.z;
    mouseGroup.position.set(mouseTargetX, MAT_TOP + MOUSE_LIFT, mouseTargetZ);
    mouseGroup.rotation.y = 0.12;

    const mouseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.35,
      metalness: 0.25,
    });

    const mouseBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.027, 0.031, 0.102, 16),
      mouseMat
    );
    mouseBody.rotation.x = Math.PI / 2;
    mouseBody.scale.set(1, 0.95, 0.45);
    mouseBody.position.set(0, 0.013, 0);
    mouseGroup.add(mouseBody);

    const seam = new THREE.Mesh(
      new THREE.BoxGeometry(0.002, 0.003, 0.045),
      new THREE.MeshBasicMaterial({ color: 0x09090b })
    );
    seam.position.set(0, 0.025, 0.024);
    mouseGroup.add(seam);

    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });
    const wheel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0045, 0.0045, 0.005, 10),
      wheelMat
    );
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(0, 0.026, 0.02);
    mouseGroup.add(wheel);

    const mouseGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.045, 0.065),
      new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.35,
      })
    );
    mouseGlow.rotation.x = -Math.PI / 2;
    mouseGlow.position.set(0, 0.001, 0);
    mouseGroup.add(mouseGlow);

    deskGroup.add(mouseGroup);

    const chairGroup = new THREE.Group();

    const chairMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.65,
      metalness: 0.2,
    });

    const CHAIR_Z = 0.09;

    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(0.44, 0.045, 0.42),
      chairMat
    );
    seat.position.set(0, SEAT_TOP - 0.0225, CHAIR_Z);
    chairGroup.add(seat);

    const back = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.34, 0.035),
      chairMat
    );
    back.position.set(0, 0.62, -0.085);
    back.rotation.x = -0.05;
    chairGroup.add(back);

    const bracket = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.2, 0.03),
      legMat
    );
    bracket.position.set(0, 0.48, -0.1);
    chairGroup.add(bracket);

    const chairPost = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.32, 10),
      legMat
    );
    chairPost.position.set(0, 0.2, CHAIR_Z);
    chairGroup.add(chairPost);

    const spokeLen = 0.24;
    for (let c = 0; c < 5; c++) {
      const arm = new THREE.Group();
      arm.position.set(0, 0.04, CHAIR_Z);
      arm.rotation.y = (c * Math.PI * 2) / 5;

      const spoke = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, spokeLen, 6),
        legMat
      );
      spoke.rotation.z = Math.PI / 2;
      spoke.position.set(spokeLen / 2, 0, 0);
      arm.add(spoke);

      const caster = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 8, 8),
        legMat
      );
      caster.position.set(spokeLen, -0.02, 0);
      arm.add(caster);

      chairGroup.add(arm);
    }
    deskGroup.add(chairGroup);

    // garrafa de alumínio
    const bottle = new THREE.Group();
    bottle.position.set(0.42, DESK_Y, 0.82);

    const bottleProfile = [
      [0, 0],
      [0.03, 0],
      [0.032, 0.004],
      [0.032, 0.15],
      [0.03, 0.17],
      [0.022, 0.184],
      [0.016, 0.19],
      [0.016, 0.205],
    ].map(([r, y]) => new THREE.Vector2(r, y));

    const bottleBody = new THREE.Mesh(
      new THREE.LatheGeometry(bottleProfile, 32),
      new THREE.MeshStandardMaterial({
        color: 0xcfd8e0,
        metalness: 0.65,
        roughness: 0.32,
      })
    );
    bottle.add(bottleBody);

    const bottleCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.019, 0.019, 0.035, 20),
      new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5 })
    );
    bottleCap.position.y = 0.2225;
    bottle.add(bottleCap);

    const bottleLoop = new THREE.Mesh(
      new THREE.TorusGeometry(0.012, 0.0025, 8, 16),
      new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5 })
    );
    bottleLoop.position.y = 0.243;
    bottleLoop.rotation.y = Math.PI / 2;
    bottle.add(bottleLoop);

    // anel ciano para combinar com o resto da cena
    const bottleRing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0325, 0.0325, 0.006, 32),
      new THREE.MeshBasicMaterial({ color: 0x00e5ff })
    );
    bottleRing.position.y = 0.06;
    bottle.add(bottleRing);

    deskGroup.add(bottle);

    const phone = new THREE.Mesh(
      new THREE.BoxGeometry(0.065, 0.007, 0.13),
      new THREE.MeshStandardMaterial({
        color: 0x09090b,
        metalness: 0.8,
        roughness: 0.2,
      })
    );
    phone.position.set(0.42, DESK_Y + 0.0035, 0.6);
    phone.rotation.y = -0.2;
    deskGroup.add(phone);

    const floor = new THREE.Mesh(
      new THREE.CylinderGeometry(1.18, 1.22, 0.03, 36),
      new THREE.MeshStandardMaterial({
        color: 0x080e18,
        roughness: 0.8,
        metalness: 0.1,
      })
    );
    floor.position.set(0, -0.015, 0.4);
    mainGroup.add(floor);

    const floorRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.006, 8, 48),
      new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.4,
      })
    );
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.set(0, 0.002, 0.4);
    mainGroup.add(floorRing);

    mainGroup.add(deskGroup);

    // a animação toca em loop assim que o modelo carrega
    let mixer = null;
    let rightHand = null;
    const handPos = new THREE.Vector3();
    const loader = new GLTFLoader();

    loader.load(
      "/models/typing.glb",
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;

        model.traverse((child) => {
          // o loader tira os ":" dos nomes, por isso procuro só pelo fim do nome
          if (child.isBone && /RightHandMiddle1$/.test(child.name)) {
            rightHand = child;
          }
          if (child.isMesh && child.material) {
            child.castShadow = true;
            child.receiveShadow = true;
            // sem isto o corpo some em alguns ângulos
            child.frustumCulled = false;
            if (child.material.roughness !== undefined) {
              child.material.roughness = Math.max(child.material.roughness, 0.35);
            }
          }
        });

        mainGroup.add(model);

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.play();
        }

        setIsLoaded(true);
      },
      (xhr) => {
        if (disposed) return;
        if (xhr.total > 0) {
          setLoadProgress(
            Math.min(100, Math.round((xhr.loaded / xhr.total) * 100))
          );
        } else {
          setLoadProgress((prev) => Math.min(95, prev + 12));
        }
      },
      (error) => {
        console.error("Error loading typing.glb:", error);
        if (!disposed) setIsLoaded(true);
      }
    );

    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onPointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = mouseX * 0.28;
      targetRotX = mouseY * 0.16;
    };

    const onPointerDown = () => {
      mouseBody.position.y = 0.01;
      wheelMat.emissiveIntensity = 1.6;
    };

    const onPointerUp = () => {
      mouseBody.position.y = 0.013;
      wheelMat.emissiveIntensity = 0.8;
    };

    const onPointerLeave = () => {
      targetRotY = 0;
      targetRotX = 0;
      mouseBody.position.y = 0.013;
      wheelMat.emissiveIntensity = 0.8;
    };

    const domElement = renderer.domElement;
    domElement.style.cursor = "pointer";
    domElement.addEventListener("pointermove", onPointerMove, { passive: true });
    domElement.addEventListener("pointerdown", onPointerDown, { passive: true });
    domElement.addEventListener("pointerup", onPointerUp, { passive: true });
    domElement.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const handleResize = () => {
      const nw = container.clientWidth || 320;
      const nh = container.clientHeight || 340;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) {
        clock.getDelta();
        return;
      }

      const delta = Math.min(clock.getDelta(), 0.1);

      if (mixer) mixer.update(delta);

      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (-targetRotX - mainGroup.rotation.x) * 0.05;

      // o rato anda com a mão dela: quando ela vai ao rato ele segue-a,
      // quando volta ao teclado fica onde ficou
      if (rightHand) {
        mainGroup.updateMatrixWorld(true);
        rightHand.getWorldPosition(handPos);
        deskGroup.worldToLocal(handPos);
        if (handPos.x < MOUSE_ZONE_X) {
          mouseTargetX = Math.max(-0.34, Math.min(-0.14, handPos.x));
          mouseTargetZ = Math.max(0.5, Math.min(0.7, handPos.z + MOUSE_Z_OFFSET));
        }
      }

      mouseGroup.position.x += (mouseTargetX - mouseGroup.position.x) * 0.14;
      mouseGroup.position.z += (mouseTargetZ - mouseGroup.position.z) * 0.14;
      mouseGroup.rotation.y = 0.12 + (mouseTargetX - mouseGroup.position.x) * 1.8;

      mainGroup.position.y = Math.sin(clock.elapsedTime * 1.4) * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("pointermove", onPointerMove);
      domElement.removeEventListener("pointerdown", onPointerDown);
      domElement.removeEventListener("pointerup", onPointerUp);
      domElement.removeEventListener("pointerleave", onPointerLeave);

      if (mixer) mixer.stopAllAction();

      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m?.dispose());
        }
      });
      screenTex.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div
        ref={mountRef}
        className="w-full relative flex items-center justify-center overflow-visible"
        style={{ height: "340px" }}
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/60 backdrop-blur-xs rounded-2xl z-10 border border-cyan-500/20">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
              <Terminal size={18} className="text-cyan-300" />
            </div>
            <div className="flex flex-col items-center gap-1.5 px-4 w-48">
              <span className="text-[11px] font-mono tracking-wide text-cyan-300 text-center">
                {t.typingLoading || "Loading 3D workspace..."}
              </span>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden border border-cyan-500/20">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-200"
                  style={{ width: `${Math.max(8, loadProgress)}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {loadProgress > 0 ? `${loadProgress}%` : "Initialising..."}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};