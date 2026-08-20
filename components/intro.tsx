"use client";

import { useEffect } from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { useSectionInView } from "@/lib/hooks";
import ParticlesContainer from "@/components/particles-container";
import { homeData, socialLinks } from "@/lib/data";

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
        <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit--two" aria-hidden="true" />

        <span className="pixel-comet pixel-comet--one" aria-hidden="true" />
        <span className="pixel-comet pixel-comet--two" aria-hidden="true" />
        <div className="hero-background-fade" aria-hidden="true" />

        <p className="hero-coordinates">{homeData.coordinates}</p>

        {/* <div className="hero-kicker">
          <span>{homeData.hiddenLabels.kicker[0]}</span>
          <span>{homeData.hiddenLabels.kicker[1]}</span>
        </div> */}

        <div className="hero-title-wrap">
          <h1 id="hero-title">
            <span className="hero-ghost hero-ghost--one" aria-hidden="true">
              {homeData.name}
            </span>

            <span className="hero-ghost hero-ghost--two" aria-hidden="true">
              {homeData.name}
            </span>

            <span className="hero-name">{homeData.name}</span>
          </h1>
        </div>

        {/* <p className="hero-location">{homeData.hiddenLabels.location}</p> */}

        <p className="hero-intro">{homeData.intro}</p>

        <div className="hero-socials" aria-label="Home links">
          <a
            className="hero-socials-contact"
            href={homeData.socials.contactHref}
            data-cursor-target
          >
            {homeData.socials.contactLabel}
          </a>
          <div className="hero-socials-icons">
            <a
              className="hero-socials-icon"
              href={socialLinks.github.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialLinks.github.label}
              data-cursor-target
            >
              <SiGithub />
            </a>
            <a
              className="hero-socials-icon"
              href={socialLinks.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialLinks.linkedin.label}
              data-cursor-target
            >
              <SiLinkedin />
            </a>
          </div>
        </div>

        <div className="hero-footer">
          {/* <span>
            {homeData.hiddenLabels.footerLeft[0]}
            <br />
            {homeData.hiddenLabels.footerLeft[1]}
          </span> */}

          <a href="#about">{homeData.scrollPrompt}</a>

          {/* <span className="hero-footer-right">
            {homeData.hiddenLabels.footerRight[0]}
            <br />
            {homeData.hiddenLabels.footerRight[1]}
          </span> */}
        </div>
      </section>
    </>
  );
}
