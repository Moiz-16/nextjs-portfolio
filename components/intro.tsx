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

        <div className="hero-background-elements" aria-hidden="true">
          <div className="cursor-glow" />
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />

          <span className="pixel-comet pixel-comet--one" />
          <span className="pixel-comet pixel-comet--two" />
        </div>

        <p className="hero-coordinates">51.5072° N&nbsp;&nbsp;0.1276° W</p>

        <div className="hero-kicker">
          <span>SITE RELIABILITY ENGINEER</span>
          <span>QUANTITATIVE BUILDER</span>
        </div>

        <div className="hero-title-wrap">
          <p className="hero-greeting">Hi, I am</p>

          <h1 id="hero-title">
            <span className="hero-ghost hero-ghost--one" aria-hidden="true">
              <span>moiz</span>
              <span>saleem</span>
            </span>

            <span className="hero-ghost hero-ghost--two" aria-hidden="true">
              <span>moiz</span>
              <span>saleem</span>
            </span>

            <span className="hero-name">
              <span>moiz</span>
              <span>saleem</span>
            </span>
          </h1>
        </div>

        <p className="hero-location">BSC MATHEMATICS AND COMPUTER SCIENCE</p>

        <p className="hero-intro">
          I build thoughtful software at the intersection of engineering, data
          and markets.
        </p>

        <div className="hero-footer">
          <a href="#about">↓ SCROLL TO EXPLORE</a>
        </div>

        <div className="hero-actions" aria-label="Home actions">
          <a className="hero-contact-link" href="#contact" data-cursor-target>
            CONTACT
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
          <a
            href="https://github.com/Moiz-16"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            data-cursor-target
          >
            <SiGithub />
          </a>
        </div>
      </section>
    </>
  );
}
