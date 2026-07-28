"use client";

import { useEffect } from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { useSectionInView } from "@/lib/hooks";
import ParticlesContainer from "@/components/particles-container";

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
        <ParticlesContainer />
        <div className="cursor-glow" aria-hidden="true" />
        <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit--two" aria-hidden="true" />

        <span className="pixel-comet pixel-comet--one" aria-hidden="true" />
        <span className="pixel-comet pixel-comet--two" aria-hidden="true" />

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
        </div>

        <p className="hero-location">BASED IN THE UK</p>

        <p className="hero-intro">
          I build thoughtful software at the intersection of engineering, data
          and markets.
        </p>

        <div className="hero-socials" aria-label="Home links">
          <a className="hero-socials-contact" href="#contact" data-cursor-target>
            Contact
          </a>
          <a
            href="https://github.com/Moiz-16"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            data-cursor-target
          >
            <SiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/moiz-saleem/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            data-cursor-target
          >
            <SiLinkedin />
          </a>
        </div>

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
