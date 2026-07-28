"use client";

import { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useSectionInView } from "@/lib/hooks";

const projects = [
  {
    number: "01",
    title: "Neural SDEs",
    category: "QUANT RESEARCH",
    year: "2026",
    summary:
      "A research-led options pricing system comparing learned stochastic dynamics with Black-Scholes and Heston.",
    detail:
      "Built in PyTorch with Monte Carlo pricing, Greeks estimation and arbitrage checks across SPX option data.",
    tags: ["PYTORCH", "STOCHASTIC CALCULUS", "MONTE CARLO"],
    color: "yellow",
  },
  {
    number: "02",
    title: "Lumen",
    category: "AI / INFRASTRUCTURE",
    year: "2026",
    summary:
      "A real-time compliance and fraud-monitoring layer for production voice agents.",
    detail:
      "Designed to sit above Vapi, Retell and Twilio, inspect live calls and surface policy, identity and fraud risks without replacing the underlying agent.",
    tags: ["TYPESCRIPT", "REAL-TIME SYSTEMS", "VOICE AI"],
    color: "coral",
  },
  {
    number: "03",
    title: "Cardfolio",
    category: "PRODUCT / MOBILE",
    year: "2026",
    summary:
      "A smarter portfolio and market-intelligence app for trading-card collectors.",
    detail:
      "Combines collection valuation, cross-market price history, grade-aware pricing, set-completion intelligence and rapid scanning.",
    tags: ["SWIFT", "COMPUTER VISION", "PRODUCT DESIGN"],
    color: "green",
  },
  {
    number: "04",
    title: "SEC x DealScan",
    category: "DATA ENGINEERING",
    year: "2025",
    summary:
      "A high-throughput research pipeline linking corporate filings to syndicated loan records.",
    detail:
      "Created a twelve-dimensional similarity model and parallel filing pipeline processing 50-100 documents per minute, delivering a 4-8x speed-up.",
    tags: ["PYTHON", "NLP", "PARALLEL COMPUTING"],
    color: "sky",
  },
];

const experience = [
  {
    period: "2026-NOW",
    role: "Software Engineer",
    company: "JPMorganChase",
    description: "Engineering reliable software at global scale.",
  },
  {
    period: "2025",
    role: "Research Intern",
    company: "University of Bristol",
    description:
      "Built data-intensive systems for large-scale financial research.",
  },
  {
    period: "2025",
    role: "Quantitative Analyst",
    company: "Bristol Trading Society",
    description:
      "Explored neural networks for options pricing with PyTorch.",
  },
  {
    period: "2024",
    role: "Software Engineering Fellow",
    company: "Headstarter AI",
    description:
      "Shipped five AI products through rapid, collaborative build cycles.",
  },
];

function PixelFlower({
  className = "",
  variant = "coral",
}: {
  className?: string;
  variant?: "coral" | "yellow";
}) {
  return (
    <span
      className={`ps-pixel-flower ps-pixel-flower--${variant} ${className}`}
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

export default function PortfolioSections() {
  const projectsView = useSectionInView("Projects", 0.25);
  const experienceView = useSectionInView("Experience", 0.25);
  const contactView = useSectionInView("Contact", 0.35);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document
      .querySelectorAll(".portfolio-sections .ps-reveal")
      .forEach((element) => revealObserver.observe(element));

    const cardCleanups: Array<() => void> = [];

    if (!reducedMotion) {
      document
        .querySelectorAll<HTMLElement>(".portfolio-sections .project-card")
        .forEach((card) => {
          const handlePointerMove = (event: PointerEvent) => {
            const bounds = card.getBoundingClientRect();
            card.style.setProperty(
              "--card-x",
              `${event.clientX - bounds.left}px`,
            );
            card.style.setProperty(
              "--card-y",
              `${event.clientY - bounds.top}px`,
            );
          };

          card.addEventListener("pointermove", handlePointerMove);
          cardCleanups.push(() =>
            card.removeEventListener("pointermove", handlePointerMove),
          );
        });
    }

    return () => {
      revealObserver.disconnect();
      cardCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="portfolio-sections">
      <section
        ref={projectsView.ref}
        className="projects ps-section-shell"
        id="projects"
      >
        <div className="ps-section-index">02 / SELECTED PROJECTS</div>

        <div className="projects-heading ps-reveal">
          <p className="ps-eyebrow">THINGS I&apos;VE BUILT</p>
          <h2>
            Selected <em>work</em>
          </h2>
          <p>
            Research, infrastructure and products - built to solve real
            problems.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <details
              className={`project-card accent-${project.color} ps-reveal`}
              key={project.number}
            >
              <summary>
                <span className="project-number">{project.number}</span>
                <span className="project-meta">
                  {project.category}
                  <small>{project.year}</small>
                </span>
                <span className="project-title">{project.title}</span>
                <span className="project-summary">{project.summary}</span>
                <span className="project-open" aria-hidden="true">
                  +
                </span>
              </summary>

              <div className="project-detail">
                <p>{project.detail}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section
        ref={experienceView.ref}
        className="experience ps-grid-surface ps-section-shell"
        id="experience"
      >
        <div className="ps-section-index">03 / EXPERIENCE</div>

        <div className="experience-heading ps-reveal">
          <p className="ps-eyebrow">WHERE I&apos;VE BEEN</p>
          <h2>
            A timeline of
            <br />
            <em>making & learning.</em>
          </h2>
        </div>

        <ol className="timeline">
          {experience.map((item, index) => (
            <li className="ps-reveal" key={`${item.company}-${item.period}`}>
              <span className="timeline-count">
                {String(index + 1).padStart(2, "0")}
              </span>
              <time>{item.period}</time>
              <div className="timeline-role">
                <h3>{item.role}</h3>
                <p>{item.company}</p>
              </div>
              <p className="timeline-description">{item.description}</p>
            </li>
          ))}
        </ol>

        <PixelFlower className="experience-flower" variant="yellow" />
      </section>

      <section
        ref={contactView.ref}
        className="contact ps-section-shell"
        id="contact"
      >
        <div className="ps-section-index">04 / CONTACT</div>

        <div className="contact-rings" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>

        <PixelFlower className="contact-flower" variant="coral" />

        <p className="ps-eyebrow ps-reveal">HAVE SOMETHING IN MIND?</p>
        <h2 className="ps-reveal ps-reveal-delay">
          Let&apos;s build something
          <br />
          <em>worth talking about.</em>
        </h2>

        <a className="contact-cta ps-reveal" href="mailto:saleem.moiz@outlook.com">
          START A CONVERSATION
          <FiArrowRight aria-hidden="true" />
        </a>

        <footer className="contact-footer">
          <a href="#home">MOIZ SALEEM (C) 2026</a>
          <div>
            <a
              href="https://github.com/Moiz-16"
              target="_blank"
              rel="noreferrer"
            >
              GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/moiz-saleem/"
              target="_blank"
              rel="noreferrer"
            >
              LINKEDIN
            </a>
          </div>
          <a href="#home">BACK TO TOP</a>
        </footer>
      </section>
    </div>
  );
}
