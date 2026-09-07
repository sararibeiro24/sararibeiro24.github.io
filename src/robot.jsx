// This was made with the help of an AI assistant
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const Robot = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    // Tighter zoom, low 3/4 isometric perspective
    camera.position.set(3.8, 2.6, 4.4);
    camera.lookAt(0, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(5, 8, 4);
    scene.add(sunLight);

    const cyanRim = new THREE.PointLight(0x00d8f6, 3.5, 12);
    cyanRim.position.set(-4, 2, -3);
    scene.add(cyanRim);

    const blueFill = new THREE.PointLight(0x38bdf8, 2, 8);
    blueFill.position.set(0, -3, 3);
    scene.add(blueFill);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const car = new THREE.Group();

    const chassisGeo = new THREE.BoxGeometry(2.1, 0.08, 1.35);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0xba7c44,
      roughness: 0.6,
      metalness: 0.05,
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    car.add(chassis);

    const postGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.35, 12);
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.9, roughness: 0.2 });
    [
      [0.9, 0.18, 0.55],
      [0.9, 0.18, -0.55],
      [-0.9, 0.18, 0.55],
      [-0.9, 0.18, -0.55],
    ].forEach(([px, py, pz]) => {
      const post = new THREE.Mesh(postGeo, brassMat);
      post.position.set(px, py, pz);
      car.add(post);
    });

    const batteryGeo = new THREE.BoxGeometry(0.85, 0.36, 0.82);
    const batteryMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.5,
      metalness: 0.3,
    });
    const battery = new THREE.Mesh(batteryGeo, batteryMat);
    battery.position.set(-0.45, 0.22, 0);
    car.add(battery);

    const leadMatR = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const leadMatB = new THREE.MeshBasicMaterial({ color: 0x09090b });
    const leadGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 8);
    const leadR = new THREE.Mesh(leadGeo, leadMatR);
    leadR.position.set(-0.02, 0.25, 0.12);
    leadR.rotation.z = Math.PI / 3;
    const leadB = new THREE.Mesh(leadGeo, leadMatB);
    leadB.position.set(-0.02, 0.25, 0.16);
    leadB.rotation.z = Math.PI / 3;
    car.add(leadR);
    car.add(leadB);

    const heatsinkGeo = new THREE.BoxGeometry(0.3, 0.32, 0.3);
    const heatsinkMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.85, roughness: 0.25 });
    const heatsink = new THREE.Mesh(heatsinkGeo, heatsinkMat);
    heatsink.position.set(-0.1, 0.2, -0.38);
    car.add(heatsink);

    const pcbGeo = new THREE.BoxGeometry(0.75, 0.05, 0.55);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.3,
      metalness: 0.2,
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    pcb.position.set(0.18, 0.07, 0.1);
    car.add(pcb);

    const icGeo = new THREE.BoxGeometry(0.4, 0.04, 0.14);
    const icMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.4 });
    const ic = new THREE.Mesh(icGeo, icMat);
    ic.position.set(0.18, 0.11, 0.1);
    car.add(ic);

    const servoGeo = new THREE.BoxGeometry(0.2, 0.25, 0.18);
    const servoMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.4,
      metalness: 0.1,
    });
    const servo = new THREE.Mesh(servoGeo, servoMat);
    servo.position.set(0.72, 0.17, 0);
    car.add(servo);

    const sensorGroup = new THREE.Group();
    sensorGroup.position.set(0.82, 0.42, 0);

    const sensorBackingGeo = new THREE.BoxGeometry(0.06, 0.28, 0.68);
    const sensorBackingMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
    const sensorBacking = new THREE.Mesh(sensorBackingGeo, sensorBackingMat);
    sensorGroup.add(sensorBacking);

    const barrelGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.22, 28);
    const barrelMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.95,
      roughness: 0.15,
    });

    const meshScreenMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.9,
    });
    const screenGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.225, 20);

    [-0.2, 0.2].forEach((zOffset) => {
      const barrel = new THREE.Mesh(barrelGeo, barrelMat);
      barrel.rotation.z = Math.PI / 2;
      barrel.position.set(0.11, 0, zOffset);

      const screen = new THREE.Mesh(screenGeo, meshScreenMat);
      screen.rotation.z = Math.PI / 2;
      screen.position.set(0.115, 0, zOffset);

      sensorGroup.add(barrel);
      sensorGroup.add(screen);
    });

    const crystalGeo = new THREE.BoxGeometry(0.04, 0.07, 0.14);
    const crystal = new THREE.Mesh(crystalGeo, barrelMat);
    crystal.position.set(0.04, 0, 0);
    sensorGroup.add(crystal);

    car.add(sensorGroup);

    const cableCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0.2, 0.1, 0.1),
      new THREE.Vector3(0.25, 0.95, 0.12),
      new THREE.Vector3(0.65, 0.85, -0.05),
      new THREE.Vector3(0.8, 0.44, 0)
    );
    const cableGeo = new THREE.TubeGeometry(cableCurve, 24, 0.035, 8, false);
    const cableMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.4,
    });
    const cable = new THREE.Mesh(cableGeo, cableMat);
    car.add(cable);

    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.85,
    });
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15, 
      roughness: 0.35,
      metalness: 0.1,
    });
    const hubNutMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 });

    const wheelPositions = [
      [0.65, -0.02, 0.78],
      [0.65, -0.02, -0.78],
      [-0.65, -0.02, 0.78],
      [-0.65, -0.02, -0.78],
    ];

    wheelPositions.forEach(([x, y, z]) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(x, y, z);

      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.22, 28), tireMat);
      tire.rotation.x = Math.PI / 2;
      wheelGroup.add(tire);

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.23, 20), rimMat);
      rim.rotation.x = Math.PI / 2;
      wheelGroup.add(rim);

      for (let s = 0; s < 5; s++) {
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.26, 0.24), rimMat);
        spoke.rotation.z = (s * Math.PI * 2) / 5;
        wheelGroup.add(spoke);
      }

      const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.25, 12), hubNutMat);
      nut.rotation.x = Math.PI / 2;
      wheelGroup.add(nut);

      const motorGeo = new THREE.BoxGeometry(0.42, 0.2, 0.2);
      const motor = new THREE.Mesh(motorGeo, rimMat);
      motor.position.set(0, 0, z > 0 ? -0.16 : 0.16);
      wheelGroup.add(motor);

      car.add(wheelGroup);
    });

    mainGroup.add(car);

    const createGlowingOrbit = (radius, tiltX, tiltZ, colorHex) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.95, 0, Math.PI * 2);
      const points = curve.getPoints(100);
      const geo = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const mat = new THREE.LineDashedMaterial({
        color: colorHex,
        dashSize: 0.18,
        gapSize: 0.09,
        transparent: true,
        opacity: 0.75,
      });
      const line = new THREE.Line(geo, mat);
      line.computeLineDistances();
      line.rotation.x = tiltX;
      line.rotation.z = tiltZ;
      return line;
    };

    const orbit1 = createGlowingOrbit(2.5, Math.PI / 3.2, 0.25, 0x00d8f6);
    const orbit2 = createGlowingOrbit(2.0, -Math.PI / 3.8, -0.3, 0x38bdf8);
    mainGroup.add(orbit1);
    mainGroup.add(orbit2);

    const satGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const satellite = new THREE.Mesh(satGeo, satMat);
    scene.add(satellite);

    const particleGeo = new THREE.BufferGeometry();
    const count = 35;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 7;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / height) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      car.position.y = Math.sin(t * 1.6) * 0.07;
      car.rotation.y = Math.sin(t * 0.7) * 0.18 - 0.35; 
      car.rotation.z = Math.sin(t * 1.2) * 0.03;

      sensorGroup.rotation.y = Math.sin(t * 2.8) * 0.45;

      orbit1.rotation.y = t * 0.28;
      orbit2.rotation.y = -t * 0.22;

      const satAngle = t * 1.1;
      const rx = 2.5;
      const rz = 2.5 * 0.95;
      const satPos = new THREE.Vector3(Math.cos(satAngle) * rx, 0, Math.sin(satAngle) * rz);
      satPos.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 3.2);
      satPos.applyAxisAngle(new THREE.Vector3(0, 0, 1), 0.25);
      satellite.position.copy(satPos);

      mainGroup.rotation.y += (mouseX * 0.35 - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (-mouseY * 0.25 - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "260px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
      }}
    />
  );
};