"use client";

import { useEffect } from "react";
import { useSectionInView } from "@/lib/hooks";

function PixelFlower({
  className = "",
  variant = "coral",
}: {
  className?: string;
  variant?: "coral" | "yellow" | "small";
}) {
  return (
    <span
      className={`pixel-flower pixel-flower--${variant} ${className}`}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    const updatePointer = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", updatePointer, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return null;
}

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);

  return (
    <>
      <MotionEffects />

      <section
        ref={ref}
        className="hero grid-surface"
        id="home"
        aria-labelledby="hero-title"
      >
        <div className="cursor-glow" aria-hidden="true" />
        <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit--two" aria-hidden="true" />

        <span className="pixel-comet pixel-comet--one" aria-hidden="true" />
        <span className="pixel-comet pixel-comet--two" aria-hidden="true" />

        <PixelFlower className="flower-one" variant="coral" />
        <PixelFlower className="flower-two" variant="yellow" />
        <PixelFlower className="flower-three" variant="small" />
        <PixelFlower className="flower-four" variant="coral" />

        <p className="hero-coordinates">51.5072° N&nbsp;&nbsp;0.1276° W</p>

        <div className="hero-kicker">
          <span>SOFTWARE ENGINEER</span>
          <span>QUANTITATIVE BUILDER</span>
        </div>

        <div className="hero-title-wrap">
          <h1 id="hero-title">
            <span className="hero-ghost hero-ghost--one" aria-hidden="true">
              moiz saleem
            </span>

            <span className="hero-ghost hero-ghost--two" aria-hidden="true">
              moiz saleem
            </span>

            <span className="hero-name">moiz saleem</span>
          </h1>

          <PixelFlower className="title-flower" variant="yellow" />
        </div>

        <p className="hero-location">BASED IN THE UK</p>

        <p className="hero-intro">
          I build thoughtful software at the intersection of engineering, data
          and markets.
        </p>

        <div className="hero-footer">
          <span>
            AVAILABLE FOR
            <br />
            INTERESTING IDEAS
          </span>

          <a href="#about">↓ SCROLL TO EXPLORE</a>

          <span className="hero-footer-right">
            MATHEMATICS × CS
            <br />
            BRISTOL
          </span>
        </div>
      </section>
    </>
  );
}
