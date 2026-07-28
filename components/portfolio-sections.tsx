"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { SiGithub, SiLinkedin } from "react-icons/si";
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
    stats: ["SPX DATA", "GREEKS", "ARBITRAGE CHECKS"],
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
    stats: ["LIVE CALLS", "POLICY RISK", "IDENTITY"],
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
    stats: ["VALUATION", "SCANNING", "PRICE HISTORY"],
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
    stats: ["4-8X FASTER", "100 DOCS/MIN", "12D MATCHING"],
    color: "sky",
  },
];

const experience = [
  {
    period: "2026-NOW",
    role: "Software Engineer",
    company: "JPMorganChase",
    description: [
      "Engineering reliable software at global scale.",
      "Working across production systems where correctness, observability and clarity matter.",
    ],
    skills: ["RELIABILITY", "SYSTEM DESIGN", "ENGINEERING"],
  },
  {
    period: "2025",
    role: "Research Intern",
    company: "University of Bristol",
    description: [
      "Built data-intensive systems for large-scale financial research.",
      "Designed document-matching and parallel processing workflows for SEC filing analysis.",
    ],
    skills: ["PYTHON", "NLP", "DATA PIPELINES"],
  },
  {
    period: "2025",
    role: "Quantitative Analyst",
    company: "Bristol Trading Society",
    description: [
      "Explored neural networks for options pricing with PyTorch.",
      "Compared learned stochastic models against classical pricing baselines.",
    ],
    skills: ["PYTORCH", "OPTIONS", "RESEARCH"],
  },
  {
    period: "2024",
    role: "Software Engineering Fellow",
    company: "Headstarter AI",
    description: [
      "Shipped five AI products through rapid, collaborative build cycles.",
      "Worked through product scoping, implementation and iteration under tight timelines.",
    ],
    skills: ["NEXT.JS", "AI", "PRODUCT"],
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

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <motion.article
      className={`project-card project-card-tile accent-${project.color}`}
      data-cursor-target
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="project-preview" aria-hidden="true">
        <div className="project-preview-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="project-preview-body">
          <div className="project-preview-title">{project.title}</div>
          <div className="project-preview-grid">
            {project.stats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
          <div className="project-preview-lines">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>

      <div className="project-card-content">
        <div className="project-card-topline">
          <span>{project.number}</span>
          <span>{project.category}</span>
          <time>{project.year}</time>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <p className="project-card-detail">{project.detail}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function ExperienceCard({
  item,
  index,
}: {
  item: (typeof experience)[number];
  index: number;
}) {
  return (
    <motion.article
      className="experience-card"
      data-cursor-target
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: index * 0.08, ease: "easeOut" }}
      viewport={{ once: true, margin: "-70px" }}
    >
      <header>
        <div>
          <h3>{item.role}</h3>
          <p>{item.company}</p>
        </div>
        <time>{item.period}</time>
      </header>

      <ul>
        {item.description.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <div className="experience-skills">
        {item.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </motion.article>
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

        <div className="project-card-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
            />
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

        <div className="experience-card-list">
          {experience.map((item, index) => (
            <ExperienceCard
              item={item}
              index={index}
              key={`${item.company}-${item.period}`}
            />
          ))}
        </div>

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
      </section>

      <footer className="portfolio-footer">
        <p>2026 Moiz Saleem. All rights reserved.</p>
        <div className="portfolio-footer-socials" aria-label="Social links">
          <a
            href="https://github.com/Moiz-16"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            data-cursor-target
          >
            <SiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/moiz-saleem/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            data-cursor-target
          >
            <SiLinkedin />
          </a>
        </div>
        <nav>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#home">Back to top</a>
        </nav>
      </footer>
    </div>
  );
}
