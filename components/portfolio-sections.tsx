"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { SiGithub, SiLinkedin } from "react-icons/si";
import toast from "react-hot-toast";
import { sendEmail } from "@/actions/sendEmail";
import { projectsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import type { StaticImageData } from "next/image";

type ProjectAccent = "yellow" | "coral" | "green" | "sky";

type ProjectItem = {
  number: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  color: ProjectAccent;
  image: string;
  background: string;
};

const projectAccents: ProjectAccent[] = ["yellow", "coral", "green", "sky"];

const projectBackgrounds: Record<string, string> = {
  "Nexus - Internship Application Tracker": "/assets/backgrounds/nexus.jpg",
  "IMC Prosperity 3 Challenge": "/assets/backgrounds/imc-prosperity.jpg",
  "Quantum Bank Heist: QAOA Path Optimisation (QHack 2025)":
    "/assets/backgrounds/qhack.jpg",
  "IMA TMT 2025 Conference Talk": "/assets/backgrounds/ima-tmt.jpg",
  "Mobile App Games": "/assets/backgrounds/mobile-app.jpg",
  "Neural SDE Dissertation Project": "/assets/backgrounds/neural-sdes.jpg",
  "HPC Code Optimisation": "/assets/backgrounds/sec-dealscan.jpg",
  "TradingView Strategy Indicators": "/assets/backgrounds/tradingview.jpg",
  "Forex/Crypto Trading Bot": "/assets/backgrounds/fx-bot.jpg",
  "ChatGPT News Trader": "/assets/backgrounds/news-trader.jpg",
  "Scotland Yard AI": "/assets/backgrounds/scotland-yard.jpg",
  "Self Driving Car AI": "/assets/backgrounds/self-driving.jpg",
  "Mobile App Prototype": "/assets/backgrounds/mobile-app.jpg",
  "HE+ Research Project": "/assets/backgrounds/he-research.jpg",
};

function projectImageSrc(image: string | StaticImageData) {
  return typeof image === "string" ? image : image.src;
}

function projectCategory(tags: readonly string[]) {
  return tags.slice(0, 2).join(" / ").toUpperCase();
}

const projects: ProjectItem[] = projectsData.map((project, index) => ({
  number: `${index + 1}`.padStart(2, "0"),
  title: project.title,
  category: projectCategory(project.tags),
  year: "",
  tags: [...project.tags],
  color: projectAccents[index % projectAccents.length],
  image: projectImageSrc(project.imageUrl),
  background: projectBackgrounds[project.title] ?? projectImageSrc(project.imageUrl),
}));

const experience = [
  {
    period: "JUN 2025 - AUG 2025",
    role: "Research Intern",
    company: "University of Bristol",
    description: [
      "Devised a process for maximising links between financial databases using textual analysis and natural language processing.",
      "Built research tooling for document matching, entity comparison and large-scale data workflows.",
    ],
    skills: ["PYTHON", "NLP", "DATA LINKING"],
  },
  {
    period: "MAR 2025 - PRESENT",
    role: "Founder",
    company: "Nexus",
    description: [
      "Created an intelligent platform to streamline internship applications for students.",
      "Built a centralised dashboard with AI-assisted data entry, application insights and interview preparation tools.",
    ],
    skills: ["PRODUCT", "AI", "NEXT.JS"],
  },
  {
    period: "JUN 2024 - JAN 2025",
    role: "Applied Data Science Lab",
    company: "WorldQuant University",
    description: [
      "Developed an ARMA time-series model for forecasting particulate matter levels in Kenya using MongoDB datasets.",
      "Built a machine-learning pipeline with feature encoding and imputation to predict apartment prices in Argentina.",
    ],
    skills: ["DATA SCIENCE", "MONGODB", "TIME SERIES"],
  },
  {
    period: "FEB 2024 - MAR 2024",
    role: "AI Foundation Bootcamp",
    company: "Encode Club",
    description: [
      "Explored the architecture and applications of large language models including ChatGPT and LLaMA-2.",
      "Integrated the ChatGPT API with a local web UI and experimented with Stable Diffusion text-to-image workflows.",
    ],
    skills: ["LLMS", "PROMPTING", "AI"],
  },
  {
    period: "AUG 2021",
    role: "Quantum Technology Research",
    company: "KETS Quantum Security LTD",
    description: [
      "Collaborated on a group research project into quantum technology and computing fundamentals.",
      "Presented the findings to the company and engaged with external experts to deepen industry understanding.",
    ],
    skills: ["QUANTUM", "RESEARCH", "PRESENTATION"],
  },
];

const education = [
  {
    period: "SEP 2023 - JUN 2026",
    institution: "University of Bristol",
    qualification: "BSc Mathematics and Computer Science",
    focus: "Mathematics, computer systems, software engineering and applied AI.",
    result: "Graduated",
    modules: [
      {
        label: "Mathematics",
        items: [
          "Probability and statistics",
          "Linear algebra",
          "Mathematics for computer science",
        ],
      },
      {
        label: "Computer Science",
        items: [
          "Imperative and functional programming",
          "Object-oriented programming and algorithms",
          "Computer systems",
        ],
      },
      {
        label: "Final Focus",
        items: [
          "Neural SDE dissertation project",
          "High performance computing",
          "Software engineering project work",
        ],
      },
    ],
    achievements: [
      "Built a neural SDE dissertation project using PyTorch and stochastic modelling.",
      "Worked on HPC code optimisation and systems-level performance problems.",
      "Invited IMA TMT speaker on cointegration-based trading strategies.",
      "Founded Nexus, an internship application platform for students.",
      "Built trading bots and research tooling across data, markets and automation.",
    ],
    stats: [
      { label: "Dissertation", value: "Neural SDE" },
      { label: "Coursework", value: "HPC" },
      { label: "Talk", value: "IMA TMT" },
      { label: "Build", value: "Nexus" },
    ],
  },
];

function getTimelineYear(period: string) {
  const years = Array.from(period.matchAll(/\b\d{4}\b/g), (match) => match[0]);

  if (years.length > 1 && years[0] !== years[years.length - 1]) {
    return `${years[0]}-${years[years.length - 1].slice(2)}`;
  }

  return years[0] ?? period;
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
    [0.99, 1, 1, 0.995],
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
  showTimelineYear,
}: {
  item: (typeof experience)[number];
  index: number;
  showTimelineYear: boolean;
}) {
  const timelineYear = getTimelineYear(item.period);

  return (
    <motion.div
      className="experience-card-shell"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div
        className={`experience-timeline-marker ${
          showTimelineYear ? "has-year" : ""
        }`}
        aria-hidden="true"
      >
        {showTimelineYear ? <span>{timelineYear}</span> : null}
      </div>

      <article className="experience-card" data-cursor-target>
        <header>
          <div>
            <h3>{item.company}</h3>
            <p>{item.role}</p>
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

function EducationSection() {
  const item = education[0];

  return (
    <ScrollFrame className="education-inner">
      <div className="education-heading ps-reveal">
        <p className="ps-eyebrow">A FORMAL BASE</p>
        <h2>Where the work started.</h2>
      </div>

      <div className="education-layout">
        <div className="education-list ps-reveal">
          {education.map((entry) => (
            <article
              className="education-list-card"
              data-cursor-target
              key={`${entry.institution}-${entry.period}`}
            >
              <time>{entry.period}</time>
              <h3>{entry.institution}</h3>
              <p>{entry.qualification}</p>
            </article>
          ))}
        </div>

        <article
          className="education-detail ps-reveal ps-reveal-delay"
          data-cursor-target
        >
          <header>
            <div>
              <p className="education-detail-label">Result</p>
              <h3>{item.result}</h3>
            </div>
            <p>{item.focus}</p>
          </header>

          <div className="education-modules" aria-label="Selected study areas">
            {item.modules.map((group) => (
              <section key={group.label}>
                <h4>{group.label}</h4>
                <ul>
                  {group.items.map((module) => (
                    <li key={module}>{module}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="education-achievements">
            <h4>Built from it</h4>
            <ul>
              {item.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>

          <div className="education-score-grid" aria-label="Education highlights">
            {item.stats.map((stat) => (
              <div className="education-score-card" key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>
    </ScrollFrame>
  );
}

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      className="reference-contact-form ps-reveal ps-reveal-delay"
      ref={formRef}
      action={async (formData) => {
        setIsSubmitting(true);

        try {
          const { error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Message sent successfully.");
          formRef.current?.reset();
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <div className="contact-form-row">
        <label className="contact-input-group">
          <span>Full name</span>
          <input
            autoComplete="name"
            name="senderName"
            placeholder="Moiz Saleem"
            type="text"
          />
        </label>

        <label className="contact-input-group">
          <span>Email address</span>
          <input
            autoComplete="email"
            name="senderEmail"
            placeholder="you@example.com"
            required
            type="email"
          />
        </label>
      </div>

      <label className="contact-input-group">
        <span>Your message</span>
        <textarea
          name="message"
          placeholder="Tell me about your project, idea or opportunity."
          required
          rows={7}
        />
      </label>

      <p className="contact-form-note">
        I&apos;ll never share your details. Straight to my inbox, nothing noisy.
      </p>

      <button className="contact-submit" disabled={isSubmitting} type="submit">
        <span>{isSubmitting ? "Sending..." : "Send message"}</span>
        <FiArrowRight aria-hidden="true" />
        <i aria-hidden="true" />
        <i aria-hidden="true" />
      </button>
    </form>
  );
}

export default function PortfolioSections() {
  const projectsView = useSectionInView("Projects", 0.25);
  const educationView = useSectionInView("Education", 0.25);
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

        <ScrollFrame className="projects-inner">
          <div className="projects-heading ps-reveal">
            <h2>
              Things I&apos;ve <em>built</em>
            </h2>
            <p>
              Research, infrastructure and products built to solve real
              problems.
            </p>
          </div>

          <div className="project-card-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </ScrollFrame>
      </section>

      <section
        ref={educationView.ref}
        className="education ps-section-shell"
        id="education"
      >
        <div className="ps-section-index">03 / EDUCATION</div>
        <EducationSection />
      </section>

      <section
        ref={experienceView.ref}
        className="experience ps-grid-surface ps-section-shell"
        id="experience"
      >
        <div className="ps-section-index">04 / EXPERIENCE</div>

        <ScrollFrame className="experience-inner">
          <div className="experience-heading ps-reveal">
            <h2>
              A timeline of
              <br />
              <em>building and learning.</em>
            </h2>
            <p>Research, products and technical work that shaped how I build.</p>
          </div>

          <div className="experience-groups">
            <section className="experience-group" aria-labelledby="experience-heading">
              <h3 className="experience-side-label" id="experience-heading">
                Experience
              </h3>
              <div className="experience-card-list">
                <div className="experience-connector" aria-hidden="true" />
                {experience.map((item, index) => (
                  <ExperienceCard
                    item={item}
                    index={index}
                    showTimelineYear={
                      index === 0 ||
                      getTimelineYear(item.period) !==
                        getTimelineYear(experience[index - 1].period)
                    }
                    key={`${item.company}-${item.period}`}
                  />
                ))}
              </div>
            </section>
          </div>
        </ScrollFrame>
      </section>

      <section
        ref={contactView.ref}
        className="contact ps-section-shell"
        id="contact"
      >
        <div className="ps-section-index">05 / CONTACT</div>

        <ScrollFrame className="contact-scroll-frame">
          <div className="contact-rings" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>

          <div className="contact-layout">
            <div className="contact-copy">
              <p className="ps-eyebrow ps-reveal">GET IN TOUCH</p>
              <h2 className="ps-reveal ps-reveal-delay">
                Let&apos;s build something
                <br />
                <em>worth talking about.</em>
              </h2>
              <p className="contact-summary ps-reveal">
                Send a note about software, research, quant ideas or anything
                ambitious enough to be interesting.
              </p>
            </div>

            <ContactForm />
          </div>
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
          <a href="#education">Education</a>
          <a href="#experience">Experience</a>
          <a href="#home">Back to top</a>
        </nav>
      </footer>
    </div>
  );
}
