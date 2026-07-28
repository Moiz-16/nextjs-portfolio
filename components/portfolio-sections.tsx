"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
    image: "/tradingview_indicators.png",
    background: "/assets/backgrounds/neural-sdes.jpg",
    previewLines: [
      "dS = mu(t,S)dt + sigma(t,S)dW",
      "Monte Carlo paths",
      "No-arbitrage diagnostics",
    ],
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
    image: "/nexus.png",
    background: "/assets/backgrounds/lumen.jpg",
    previewLines: [
      "call stream -> policy engine",
      "identity confidence",
      "fraud signal monitor",
    ],
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
    image: "/dropkick_app.png",
    background: "/assets/backgrounds/cardfolio.jpg",
    previewLines: ["collection value", "grade-aware pricing", "set completion"],
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
    image: "/IMA_TMT_2025_Conference_Abstract.png",
    background: "/assets/backgrounds/sec-dealscan.jpg",
    previewLines: [
      "SEC filing match",
      "DealScan linkage",
      "parallel extraction",
    ],
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

function ScrollFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0.94, 1, 1, 0.96],
  );

  return (
    <motion.div
      className={`scroll-effect-frame ${className}`}
      ref={ref}
      style={{ opacity, scale }}
    >
      {children}
    </motion.div>
  );
}

const PAN_SPEED = 70;
const PAN_PAUSE = 1.2;
const MIN_SCROLL_OVERFLOW = 0.2;
const FALLBACK_PROJECT_BG = "linear-gradient(135deg, #1e293b, #0f172a)";

function ProjectScrollingPreview({
  src,
  alt,
  bg,
}: {
  src: string;
  alt: string;
  bg?: string;
}) {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollPx, setScrollPx] = useState(0);
  const [bgReady, setBgReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();

    const compute = () => {
      const viewport = viewportRef.current;
      if (cancelled || !viewport || !img.naturalWidth) return;

      const ratio = img.naturalHeight / img.naturalWidth;
      const displayedHeight = viewport.clientWidth * ratio;
      const overflow = displayedHeight - viewport.clientHeight;
      setScrollPx(
        overflow > viewport.clientHeight * MIN_SCROLL_OVERFLOW ? overflow : 0,
      );
    };

    img.onload = compute;
    img.src = src;
    if (img.complete) compute();
    window.addEventListener("resize", compute);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", compute);
    };
  }, [src]);

  useEffect(() => {
    if (!bg) {
      setBgReady(false);
      return;
    }

    let cancelled = false;
    const img = new window.Image();
    img.onload = () => !cancelled && setBgReady(true);
    img.onerror = () => !cancelled && setBgReady(false);
    img.src = bg;

    return () => {
      cancelled = true;
    };
  }, [bg]);

  const scrolls = scrollPx > 0;
  const animate = !reduceMotion && scrolls;
  const pan = scrollPx / PAN_SPEED;
  const total = pan * 2 + PAN_PAUSE * 2;
  const times = [
    0,
    pan / total,
    (pan + PAN_PAUSE) / total,
    (pan * 2 + PAN_PAUSE) / total,
    1,
  ];

  return (
    <div
      className="project-scrolling-preview"
      role="img"
      aria-label={alt}
    >
      <div
        className="project-preview-background"
        style={{
          backgroundImage: bgReady && bg ? `url("${bg}")` : FALLBACK_PROJECT_BG,
        }}
      />

      <div className="project-preview-shot" ref={viewportRef}>
        <motion.div
          className="project-preview-image"
          style={{
            backgroundImage: `url("${src}")`,
            backgroundSize: scrolls ? "100% auto" : "cover",
            backgroundPosition: scrolls ? "50% 0%" : "center",
          }}
          animate={
            animate
              ? {
                  backgroundPosition: [
                    "50% 0%",
                    "50% 100%",
                    "50% 100%",
                    "50% 0%",
                    "50% 0%",
                  ],
                }
              : undefined
          }
          transition={
            animate
              ? {
                  duration: total,
                  ease: "easeInOut",
                  repeat: Infinity,
                  times,
                }
              : undefined
          }
        />
      </div>
    </div>
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
    <motion.div
      className="project-card-shell"
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <article
        className={`project-card project-card-template accent-${project.color}`}
        data-cursor-target
      >
        <ProjectScrollingPreview
          src={project.image}
          alt={project.title}
          bg={project.background}
        />

        <div className="project-template-overlay">
          <div className="project-template-overlay-inner">
            <div>{project.title}</div>
            <span>{project.category}</span>
          </div>
        </div>
      </article>
    </motion.div>
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
    <motion.div
      className="experience-card-shell"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <article className="experience-card" data-cursor-target>
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
            <span key={skill}>
              <i aria-hidden="true" />
              {skill}
            </span>
          ))}
        </div>
      </article>
    </motion.div>
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
        <ScrollFrame className="projects-inner">
          <div className="projects-heading ps-reveal">
            <p className="ps-eyebrow">Projects</p>
            <h2>Projects</h2>
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
        </ScrollFrame>
      </section>

      <section
        ref={experienceView.ref}
        className="experience ps-grid-surface ps-section-shell"
        id="experience"
      >
        <ScrollFrame className="experience-inner">
          <div className="experience-heading ps-reveal">
            <p className="ps-eyebrow">Experience</p>
            <h2>Experience</h2>
            <p>My professional journey.</p>
          </div>

          <div className="experience-card-list">
            <div className="experience-connector" aria-hidden="true" />
            {experience.map((item, index) => (
              <ExperienceCard
                item={item}
                index={index}
                key={`${item.company}-${item.period}`}
              />
            ))}
          </div>
        </ScrollFrame>

        <PixelFlower className="experience-flower" variant="yellow" />
      </section>

      <section
        ref={contactView.ref}
        className="contact ps-section-shell"
        id="contact"
      >
        <ScrollFrame className="contact-scroll-frame">
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
        </ScrollFrame>
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
