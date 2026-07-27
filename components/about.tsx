"use client";

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

export default function About() {
  const { ref } = useSectionInView("About", 0.6);

  return (
    <section ref={ref} className="about grid-surface section-shell" id="about">
      <div className="section-index">01 / ABOUT</div>

      <div className="about-heading reveal">
        <p className="eyebrow">A LITTLE CONTEXT</p>

        <h2>
          Engineer by craft,
          <br />
          <em>mathematician</em> by training.
        </h2>
      </div>

      <div className="about-copy reveal reveal-delay">
        <p className="about-lead">
          I&apos;m a Mathematics and Computer Science graduate from the
          University of Bristol who likes turning complex systems into useful,
          intuitive products.
        </p>

        <p>
          My work moves between software engineering, quantitative finance,
          applied AI and product design. Whether I&apos;m training a neural SDE,
          speeding up a document pipeline or shaping a new app, I care about
          elegant systems, clear thinking and the details people actually feel.
        </p>

        <div className="skills" aria-label="Core skills">
          <span>PYTHON</span>
          <span>JAVA</span>
          <span>C / C++</span>
          <span>TYPESCRIPT</span>
          <span>PYTORCH</span>
          <span>AWS</span>
        </div>
      </div>

      <div className="about-stat reveal">
        <strong>4-8x</strong>
        <span>RESEARCH PIPELINE SPEED-UP</span>
      </div>

      <div className="orbit-badge" aria-hidden="true">
        <span>+</span>
        <i />
        <i />
        <i />
        <i />
      </div>

      <PixelFlower className="about-flower" variant="coral" />
    </section>
  );
}
