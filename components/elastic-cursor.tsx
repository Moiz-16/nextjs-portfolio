"use client";

import { useEffect, useRef } from "react";

const TARGET_SELECTOR =
  "a, button, summary, input, textarea, .cursor-can-hover, [data-cursor-target]";
const BASE_CURSOR_SIZE = 38;
const TARGET_CURSOR_SIZE = 44;

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

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: pointer.x, y: pointer.y };
    const size = { diameter: BASE_CURSOR_SIZE };
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
      targetElement = findTarget(event.target);
      cursor.classList.add("has-moved");
      dot.classList.add("has-moved");
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) setHidden(true);
    };

    const handlePointerOver = () => setHidden(false);

    const render = () => {
      const previousX = current.x;
      const previousY = current.y;
      const isTargeting = Boolean(targetElement?.isConnected);
      const nextSize = isTargeting ? TARGET_CURSOR_SIZE : BASE_CURSOR_SIZE;

      current.x += (pointer.x - current.x) * 0.18;
      current.y += (pointer.y - current.y) * 0.18;
      size.diameter += (nextSize - size.diameter) * 0.18;

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

      cursor.style.width = `${size.diameter + speed * 14}px`;
      cursor.style.height = `${Math.max(28, size.diameter - speed * 7)}px`;
      cursor.style.borderRadius = "999px";
      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) rotate(${angle}deg)`;
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;

      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("pointerover", handlePointerOver);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("pointerover", handlePointerOver);
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
