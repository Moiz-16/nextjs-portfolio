"use client";

import { useEffect, useRef } from "react";

const TARGET_SELECTOR =
  "a, button, summary, input, textarea, .cursor-can-hover, [data-cursor-target]";

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
    let previousTarget: HTMLElement | null = null;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: pointer.x, y: pointer.y };
    const size = { width: 50, height: 50, radius: 999 };
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
      const targetBounds = targetElement?.getBoundingClientRect();

      if (previousTarget && previousTarget !== targetElement) {
        previousTarget.style.transform = "";
      }

      if (targetBounds) {
        const centerX = targetBounds.left + targetBounds.width / 2;
        const centerY = targetBounds.top + targetBounds.height / 2;
        const pullX = Math.max(-12, Math.min(12, (pointer.x - centerX) * 0.22));
        const pullY = Math.max(-12, Math.min(12, (pointer.y - centerY) * 0.22));
        const nextWidth = targetBounds.width + 18;
        const nextHeight = targetBounds.height + 18;
        current.x += (centerX + pullX * 0.4 - current.x) * 0.22;
        current.y += (centerY + pullY * 0.4 - current.y) * 0.22;
        size.width += (nextWidth - size.width) * 0.24;
        size.height += (nextHeight - size.height) * 0.24;
        size.radius += (12 - size.radius) * 0.24;
        targetElement!.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
        cursor.classList.add("is-targeting");
        dot.classList.add("is-targeting");
        previousTarget = targetElement;
      } else {
        current.x += (pointer.x - current.x) * 0.16;
        current.y += (pointer.y - current.y) * 0.16;
        size.width += (50 - size.width) * 0.24;
        size.height += (50 - size.height) * 0.24;
        size.radius += (999 - size.radius) * 0.24;
        cursor.classList.remove("is-targeting");
        dot.classList.remove("is-targeting");
        previousTarget = null;
      }

      velocity.x = current.x - previousX;
      velocity.y = current.y - previousY;

      const speed = Math.min(
        Math.hypot(velocity.x, velocity.y) / 46,
        0.42,
      );
      const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);

      cursor.style.width = `${size.width + speed * 70}px`;
      cursor.style.height = `${Math.max(18, size.height - speed * 30)}px`;
      cursor.style.borderRadius = `${size.radius}px`;
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
      if (previousTarget) previousTarget.style.transform = "";
    };
  }, []);

  return (
    <>
      <div className="elastic-cursor" ref={cursorRef} aria-hidden="true" />
      <div className="elastic-cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
