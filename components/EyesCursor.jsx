'use client';

import React, { useEffect, useRef } from 'react';

export default function EyesCursor() {
  const cursorRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  useEffect(() => {
    // Only run on desktop/pointer devices
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let prevX = window.innerWidth / 2;
    let prevY = window.innerHeight / 2;
    let pupilX = 3;
    let pupilY = 6;
    let targetPupilX = 3;
    let targetPupilY = 6;
    let isBlinking = false;
    let animationFrameId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - prevX;
      const dy = mouseY - prevY;
      prevX = mouseX;
      prevY = mouseY;

      const moveNormX = Math.max(-1, Math.min(1, dx / 6));
      const moveNormY = Math.max(-1, Math.min(1, dy / 6));

      const vpNormX = (mouseX / (window.innerWidth || 1) - 0.5) * 2;
      const vpNormY = (mouseY / (window.innerHeight || 1) - 0.5) * 2;

      const combinedX = Math.max(-1, Math.min(1, moveNormX * 0.75 + vpNormX * 0.45));
      const combinedY = Math.max(-1, Math.min(1, moveNormY * 0.75 + vpNormY * 0.45));

      targetPupilX = 2.5 + combinedX * 4.8;
      targetPupilY = 5.5 + combinedY * 6.8;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Smooth render loop using requestAnimationFrame without triggering any React re-render
    const render = () => {
      // Linear interpolation (lerp) for smooth trailing
      currentX += (mouseX - currentX) * 0.35;
      currentY += (mouseY - currentY) * 0.35;
      pupilX += (targetPupilX - pupilX) * 0.3;
      pupilY += (targetPupilY - pupilY) * 0.3;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX - 17}px, ${currentY - 14}px, 0)`;
      }

      if (leftPupilRef.current) {
        leftPupilRef.current.style.transform = `translate3d(${pupilX}px, ${pupilY}px, 0)`;
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.style.transform = `translate3d(${pupilX}px, ${pupilY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Blinking interval
    const blinkInterval = setInterval(() => {
      if (leftEyeRef.current && rightEyeRef.current) {
        leftEyeRef.current.style.transform = 'scaleY(0.08)';
        rightEyeRef.current.style.transform = 'scaleY(0.08)';
        setTimeout(() => {
          if (leftEyeRef.current && rightEyeRef.current) {
            leftEyeRef.current.style.transform = 'scaleY(1)';
            rightEyeRef.current.style.transform = 'scaleY(1)';
          }
        }, 140);
      }
    }, 3600);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
        pointerEvents: 'none',
        zIndex: 999999,
        willChange: 'transform',
      }}
    >
      {/* Left Eye */}
      <div
        ref={leftEyeRef}
        style={{
          width: '16px',
          height: '26px',
          backgroundColor: '#ffffff',
          borderRadius: '13px',
          position: 'relative',
          boxShadow: '0 3px 12px rgba(0,0,0,0.7)',
          transformOrigin: 'center center',
          transition: 'transform 0.08s ease',
        }}
      >
        <div
          ref={leftPupilRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '11px',
            height: '15px',
            backgroundColor: '#000000',
            borderRadius: '50%',
            willChange: 'transform',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '3px',
              right: '3px',
              width: '2.5px',
              height: '2.5px',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
            }}
          />
        </div>
      </div>

      {/* Right Eye */}
      <div
        ref={rightEyeRef}
        style={{
          width: '16px',
          height: '26px',
          backgroundColor: '#ffffff',
          borderRadius: '13px',
          position: 'relative',
          boxShadow: '0 3px 12px rgba(0,0,0,0.7)',
          transformOrigin: 'center center',
          transition: 'transform 0.08s ease',
        }}
      >
        <div
          ref={rightPupilRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '11px',
            height: '15px',
            backgroundColor: '#000000',
            borderRadius: '50%',
            willChange: 'transform',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '3px',
              right: '3px',
              width: '2.5px',
              height: '2.5px',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
            }}
          />
        </div>
      </div>
    </div>
  );
}
