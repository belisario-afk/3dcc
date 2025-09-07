import React, { useEffect, useRef } from 'react';
import { MOVEMENT_CONFIG } from '../config.js';

export default function NavigationControls() {
  const movement = useRef({ forward: false, backward: false, left: false, right: false, sprint: false });
  const isMobile = useRef(/Mobi|Android/i.test(navigator.userAgent));
  const joystickRef = useRef(null);
  const stickRef = useRef(null);
  const joystickActive = useRef(false);
  const joystickCenter = useRef({ x: 0, y: 0 });
  const joystickVector = useRef({ x: 0, y: 0 });

  const getCamera = () => window.__THREE_MAIN_CAMERA || null;

  useEffect(() => {
    let prev = performance.now();
    const loop = () => {
      requestAnimationFrame(loop);
      const cam = getCamera();
      if (!cam) return;
      const now = performance.now();
      const dt = (now - prev) / 1000;
      prev = now;

      let { forward, backward, left, right, sprint } = movement.current;

      if (isMobile.current && (joystickVector.current.x || joystickVector.current.y)) {
        forward = Math.max(0, -joystickVector.current.y);
        backward = Math.max(0, joystickVector.current.y);
        left = Math.max(0, -joystickVector.current.x);
        right = Math.max(0, joystickVector.current.x);
      }

      const speed = MOVEMENT_CONFIG.speed * (sprint ? MOVEMENT_CONFIG.sprintMultiplier : 1) * dt;
      const dz = forward - backward;
      const dx = right - left;

      if (dx || dz) {
        const angle = Math.atan2(dx, dz);
        const yaw = cam.rotation.y;
        cam.position.x += Math.sin(angle + yaw) * speed;
        cam.position.z += Math.cos(angle + yaw) * speed;
      }

      const b = MOVEMENT_CONFIG.boundary;
      cam.position.x = Math.min(Math.max(cam.position.x, b.minX), b.maxX);
      cam.position.z = Math.min(Math.max(cam.position.z, b.minZ), b.maxZ);
    };
    loop();
  }, []);

  useEffect(() => {
    const down = e => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp': movement.current.forward = true; break;
        case 'KeyS':
        case 'ArrowDown': movement.current.backward = true; break;
        case 'KeyA':
        case 'ArrowLeft': movement.current.left = true; break;
        case 'KeyD':
        case 'ArrowRight': movement.current.right = true; break;
        case 'ShiftLeft':
        case 'ShiftRight': movement.current.sprint = true; break;
      }
    };
    const up = e => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp': movement.current.forward = false; break;
        case 'KeyS':
        case 'ArrowDown': movement.current.backward = false; break;
        case 'KeyA':
        case 'ArrowLeft': movement.current.left = false; break;
        case 'KeyD':
        case 'ArrowRight': movement.current.right = false; break;
        case 'ShiftLeft':
        case 'ShiftRight': movement.current.sprint = false; break;
      }
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  useEffect(() => {
    const elem = document.body;
    let locked = false;
    const requestLock = () => { if (!locked) elem.requestPointerLock?.(); };
    const change = () => { locked = document.pointerLockElement === elem; };
    const move = e => {
      if (!locked) return;
      const cam = getCamera();
      if (!cam) return;
      cam.rotation.y -= (e.movementX || 0) * 0.0025;
      cam.rotation.x -= (e.movementY || 0) * 0.002;
      const limit = Math.PI / 2.3;
      cam.rotation.x = Math.max(-limit, Math.min(limit, cam.rotation.x));
    };
    window.addEventListener('click', requestLock);
    document.addEventListener('pointerlockchange', change);
    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('click', requestLock);
      document.removeEventListener('pointerlockchange', change);
      window.removeEventListener('mousemove', move);
    };
  }, []);

  useEffect(() => {
    if (!isMobile.current) return;
    const base = joystickRef.current;
    const stick = stickRef.current;
    if (!base || !stick) return;

    const getPos = e => e.touches && e.touches[0] ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };
    const start = e => {
      const rect = base.getBoundingClientRect();
      joystickCenter.current.x = rect.left + rect.width / 2;
      joystickCenter.current.y = rect.top + rect.height / 2;
      joystickActive.current = true;
      move(e);
    };
    const move = e => {
      if (!joystickActive.current) return;
      const pos = getPos(e);
      const dx = pos.x - joystickCenter.current.x;
      const dy = pos.y - joystickCenter.current.y;
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 40);
      const angle = Math.atan2(dy, dx);
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;
      stick.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      joystickVector.current.x = x / 40;
      joystickVector.current.y = y / 40;
    };
    const end = () => {
      joystickActive.current = false;
      stick.style.transform = 'translate(-50%, -50%)';
      joystickVector.current.x = 0;
      joystickVector.current.y = 0;
    };

    base.addEventListener('touchstart', start, { passive: true });
    base.addEventListener('touchmove', move, { passive: true });
    base.addEventListener('touchend', end);
    base.addEventListener('mousedown', start);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);

    return () => {
      base.removeEventListener('touchstart', start);
      base.removeEventListener('touchmove', move);
      base.removeEventListener('touchend', end);
      base.removeEventListener('mousedown', start);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', end);
    };
  }, []);

  return (
    <>
      {isMobile.current && (
        <div className="mobile-joystick" ref={joystickRef}>
          <div className="stick" ref={stickRef} />
        </div>
      )}
    </>
  );
}