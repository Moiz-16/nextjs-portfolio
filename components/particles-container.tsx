"use client";

import { useEffect, useRef } from "react";

type Circle = {
  alpha: number;
  dx: number;
  dy: number;
  magnetism: number;
  size: number;
  targetAlpha: number;
  translateX: number;
  translateY: number;
  x: number;
  y: number;
};

const PARTICLE_COUNT = 58;
const STATICITY = 46;
const EASE = 62;

export default function ParticlesContainer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const circlesRef = useRef<Circle[]>([]);
  const rafRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ dpr: 1, h: 0, w: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = canvas.getContext("2d");
    if (!context) return;
    contextRef.current = context;

    const createCircle = (): Circle => ({
      alpha: 0,
      dx: (Math.random() - 0.5) * 0.16,
      dy: (Math.random() - 0.5) * 0.16,
      magnetism: 0.35 + Math.random() * 3.4,
      size: Math.random() * 1.8 + 0.45,
      targetAlpha: Math.random() * 0.38 + 0.14,
      translateX: 0,
      translateY: 0,
      x: Math.random() * sizeRef.current.w,
      y: Math.random() * sizeRef.current.h,
    });

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { offsetWidth, offsetHeight } = container;
      sizeRef.current = { dpr, h: offsetHeight, w: offsetWidth };
      canvas.width = offsetWidth * dpr;
      canvas.height = offsetHeight * dpr;
      canvas.style.width = `${offsetWidth}px`;
      canvas.style.height = `${offsetHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      circlesRef.current = Array.from({ length: PARTICLE_COUNT }, createCircle);
    };

    const clear = () => {
      const { h, w } = sizeRef.current;
      context.clearRect(0, 0, w, h);
    };

    const remap = (
      value: number,
      start1: number,
      end1: number,
      start2: number,
      end2: number,
    ) => Math.max(((value - start1) * (end2 - start2)) / (end1 - start1) + start2, 0);

    const drawCircle = (circle: Circle) => {
      const { dpr } = sizeRef.current;
      context.translate(circle.translateX, circle.translateY);
      context.beginPath();
      context.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
      context.fillStyle = `rgba(16, 16, 16, ${circle.alpha})`;
      context.fill();
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      clear();
      const { h, w } = sizeRef.current;

      circlesRef.current.forEach((circle, index) => {
        const closestEdge = Math.min(
          circle.x + circle.translateX - circle.size,
          w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          h - circle.y - circle.translateY - circle.size,
        );
        const edgeAlpha = remap(closestEdge, 0, 24, 0, 1);
        circle.alpha += (circle.targetAlpha * edgeAlpha - circle.alpha) * 0.05;
        circle.x += circle.dx;
        circle.y += circle.dy;

        if (!reducedMotion) {
          circle.translateX +=
            (pointerRef.current.x / (STATICITY / circle.magnetism) -
              circle.translateX) /
            EASE;
          circle.translateY +=
            (pointerRef.current.y / (STATICITY / circle.magnetism) -
              circle.translateY) /
            EASE;
        }

        if (
          circle.x < -circle.size ||
          circle.x > w + circle.size ||
          circle.y < -circle.size ||
          circle.y > h + circle.size
        ) {
          circlesRef.current[index] = createCircle();
        }

        drawCircle(circle);
      });

      if (!reducedMotion) rafRef.current = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left - sizeRef.current.w / 2;
      const y = event.clientY - rect.top - sizeRef.current.h / 2;
      const inside =
        x < sizeRef.current.w / 2 &&
        x > -sizeRef.current.w / 2 &&
        y < sizeRef.current.h / 2 &&
        y > -sizeRef.current.h / 2;

      if (inside) {
        pointerRef.current = { x, y };
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else if (!reducedMotion) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = window.requestAnimationFrame(draw);
      }
    };

    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div className="hero-particles" ref={containerRef} aria-hidden="true">
      <canvas className="hero-particles-canvas" ref={canvasRef} />
      <div className="hero-particles-halo" />
    </div>
  );
}
