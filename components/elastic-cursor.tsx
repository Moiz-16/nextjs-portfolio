"use client";

import { useEffect, useRef } from "react";

const TARGET_SELECTOR =
  "a, button, summary, input, textarea, .cursor-can-hover, [data-cursor-target]";
const BASE_CURSOR_SIZE = 38;
const WRAP_PADDING = 8;
const WRAP_RADIUS = 8;
const WRAP_EASE = 0.16;
const FREE_EASE = 0.18;
const CURSOR_LEAD = 0.1;
const MAX_CURSOR_LEAD = 8;

type TargetBounds = {
  cx: number;
  cy: number;
  padding: number;
  radius: number;
  width: number;
  height: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const measureTarget = (element: HTMLElement): TargetBounds => {
  const rect = element.getBoundingClientRect();
  const compact = element.hasAttribute("data-cursor-compact");

  return {
    cx: rect.left + rect.width / 2,
    cy: rect.top + rect.height / 2,
    padding: compact ? 3 : WRAP_PADDING,
    radius: compact ? 5 : WRAP_RADIUS,
    width: rect.width,
    height: rect.height,
  };
};

export default function ElasticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!finePointer || reducedMotion) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let frame = 0;
    let targetElement: HTMLElement | null = null;
    let targetBounds: TargetBounds | null = null;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: pointer.x, y: pointer.y };
    const size = {
      width: BASE_CURSOR_SIZE,
      height: BASE_CURSOR_SIZE,
      radius: BASE_CURSOR_SIZE / 2,
    };
    const velocity = { x: 0, y: 0 };

    const setHidden = (hidden: boolean) => {
      cursor.classList.toggle("is-hidden", hidden);
      dot.classList.toggle("is-hidden", hidden);
    };

    const findTarget = (node: EventTarget | null) => {
      if (!(node instanceof Element)) return null;
      return node.closest<HTMLElement>(TARGET_SELECTOR);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      cursor.classList.add("has-moved");
      dot.classList.add("has-moved");
    };

    const acquireTarget = (element: HTMLElement | null) => {
      if (!element || element === targetElement) return;

      targetElement = element;
      targetBounds = measureTarget(element);
    };

    const releaseTarget = () => {
      targetElement = null;
      targetBounds = null;
    };

    const handlePointerOver = (event: PointerEvent) => {
      setHidden(false);
      acquireTarget(findTarget(event.target));
    };

    const handlePointerOutOfTarget = (event: PointerEvent) => {
      if (!targetElement) return;

      const nextTarget = findTarget(event.relatedTarget);
      if (nextTarget === targetElement) return;

      releaseTarget();
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) setHidden(true);
    };

    const updateTargetBounds = () => {
      if (!targetElement?.isConnected) {
        releaseTarget();
        return;
      }

      targetBounds = measureTarget(targetElement);
    };

    const render = () => {
      const previousX = current.x;
      const previousY = current.y;
      if (targetElement?.isConnected) {
        targetBounds = measureTarget(targetElement);
      }

      const isTargeting = Boolean(targetElement?.isConnected && targetBounds);
      const ease = isTargeting ? WRAP_EASE : FREE_EASE;
      let nextX = pointer.x;
      let nextY = pointer.y;
      let nextWidth = BASE_CURSOR_SIZE;
      let nextHeight = BASE_CURSOR_SIZE;
      let nextRadius = BASE_CURSOR_SIZE / 2;

      if (isTargeting && targetBounds) {
        const leadX = clamp(
          (pointer.x - targetBounds.cx) * CURSOR_LEAD,
          -MAX_CURSOR_LEAD,
          MAX_CURSOR_LEAD,
        );
        const leadY = clamp(
          (pointer.y - targetBounds.cy) * CURSOR_LEAD,
          -MAX_CURSOR_LEAD,
          MAX_CURSOR_LEAD,
        );

        nextX = targetBounds.cx + leadX;
        nextY = targetBounds.cy + leadY;
        nextWidth = targetBounds.width + targetBounds.padding * 2;
        nextHeight = targetBounds.height + targetBounds.padding * 2;
        nextRadius = targetBounds.radius;
      }

      current.x += (nextX - current.x) * ease;
      current.y += (nextY - current.y) * ease;
      size.width += (nextWidth - size.width) * ease;
      size.height += (nextHeight - size.height) * ease;
      size.radius += (nextRadius - size.radius) * ease;

      if (isTargeting) {
        cursor.classList.add("is-targeting");
        dot.classList.add("is-targeting");
      } else {
        cursor.classList.remove("is-targeting");
        dot.classList.remove("is-targeting");
      }

      velocity.x = current.x - previousX;
      velocity.y = current.y - previousY;

      const speed = Math.min(
        Math.hypot(velocity.x, velocity.y) / 62,
        0.16,
      );
      const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
      const stretch = isTargeting ? 0 : speed;

      cursor.style.width = `${size.width + stretch * 14}px`;
      cursor.style.height = `${Math.max(28, size.height - stretch * 7)}px`;
      cursor.style.borderRadius = `${size.radius}px`;
      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) rotate(${isTargeting ? 0 : angle}deg)`;
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;

      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOutOfTarget);
    window.addEventListener("scroll", updateTargetBounds, { passive: true });
    window.addEventListener("resize", updateTargetBounds);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOutOfTarget);
      window.removeEventListener("scroll", updateTargetBounds);
      window.removeEventListener("resize", updateTargetBounds);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="elastic-cursor" ref={cursorRef} aria-hidden="true" />
      <div className="elastic-cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
