"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { SiGithub, SiLinkedin } from "react-icons/si";
import toast from "react-hot-toast";
import { sendEmail } from "@/actions/sendEmail";
import { useSectionInView } from "@/lib/hooks";

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

const projects: ProjectItem[] = [
  {
    number: "01",
    title: "Nexus - Internship Application Tracker",
    category: "PRODUCT / AI",
    year: "2025",
    tags: ["NEXT.JS", "TAILWIND", "TYPESCRIPT"],
    color: "yellow",
    image: "/nexus.png",
    background: "/assets/backgrounds/nexus.jpg",
  },
  {
    number: "02",
    title: "IMC Prosperity 3 Challenge",
    category: "QUANT / COMPETITION",
    year: "2025",
    tags: ["PYTHON", "PANDAS", "NUMPY"],
    color: "coral",
    image: "/imc_prosperity.png",
    background: "/assets/backgrounds/imc-prosperity.jpg",
  },
  {
    number: "03",
    title: "Quantum Bank Heist: QAOA Path Optimisation",
    category: "QUANTUM / OPTIMISATION",
    year: "2025",
    tags: ["PYTHON", "QISKIT", "QUANTUM"],
    color: "green",
    image: "/qhack_2025.png",
    background: "/assets/backgrounds/qhack.jpg",
  },
  {
    number: "04",
    title: "Mobile App Games",
    category: "MOBILE / GAME DESIGN",
    year: "2026",
    tags: ["MOBILE", "TYPESCRIPT", "GAME DESIGN"],
    color: "sky",
    image: "/dropkick_app.png",
    background: "/assets/backgrounds/mobile-app.jpg",
  },
  {
    number: "05",
    title: "Neural SDE Dissertation Project",
    category: "DISSERTATION / STOCHASTIC ML",
    year: "2026",
    tags: ["PYTHON", "PYTORCH", "SDES"],
    color: "green",
    image: "/assets/backgrounds/neural-sdes.jpg",
    background: "/assets/backgrounds/neural-sdes.jpg",
  },
  {
    number: "06",
    title: "HPC Code Optimisation",
    category: "PERFORMANCE / PARALLEL COMPUTING",
    year: "2025",
    tags: ["C", "C++", "PROFILING"],
    color: "coral",
    image: "/he_project.png",
    background: "/assets/backgrounds/sec-dealscan.jpg",
  },
  {
    number: "07",
    title: "IMA TMT 2025 Conference Talk",
    category: "RESEARCH / FINANCE",
    year: "2025",
    tags: ["RESEARCH", "QUANT FINANCE"],
    color: "sky",
    image: "/IMA_TMT_2025_Conference_Abstract.png",
    background: "/assets/backgrounds/ima-tmt.jpg",
  },
  {
    number: "08",
    title: "TradingView Strategy Indicators",
    category: "TRADING / INDICATORS",
    year: "2025",
    tags: ["PINE SCRIPT", "DATA ANALYSIS"],
    color: "yellow",
    image: "/tradingview_indicators.png",
    background: "/assets/backgrounds/tradingview.jpg",
  },
  {
    number: "09",
    title: "Forex/Crypto Trading Bot",
    category: "ALGORITHMIC TRADING",
    year: "2025",
    tags: ["PYTHON", "PANDAS", "MQL"],
    color: "coral",
    image: "/fx_trading_bot.png",
    background: "/assets/backgrounds/fx-bot.jpg",
  },
  {
    number: "10",
    title: "ChatGPT News Trader",
    category: "AI / TRADING",
    year: "2025",
    tags: ["JAVASCRIPT", "OPENAI", "API"],
    color: "green",
    image: "/gpt_bot.png",
    background: "/assets/backgrounds/news-trader.jpg",
  },
  {
    number: "11",
    title: "Scotland Yard AI",
    category: "GAME AI",
    year: "2024",
    tags: ["JAVA", "OOP", "ALGORITHMS"],
    color: "sky",
    image: "/scotlandyard_ai.png",
    background: "/assets/backgrounds/scotland-yard.jpg",
  },
  {
    number: "12",
    title: "Self Driving Car AI",
    category: "REINFORCEMENT LEARNING",
    year: "2024",
    tags: ["PYTHON", "PYTORCH", "DQN"],
    color: "yellow",
    image: "/self_driving_car.png",
    background: "/assets/backgrounds/self-driving.jpg",
  },
  {
    number: "13",
    title: "Mobile App Prototype",
    category: "MOBILE / PRODUCT",
    year: "2024",
    tags: ["FLUTTER", "DART", "UI/UX"],
    color: "coral",
    image: "/dropkick_app.png",
    background: "/assets/backgrounds/mobile-app.jpg",
  },
  {
    number: "14",
    title: "HE+ Research Project",
    category: "RESEARCH / QUANTUM",
    year: "2021",
    tags: ["RESEARCH", "QUANTUM", "RSA"],
    color: "green",
    image: "/he_project.png",
    background: "/assets/backgrounds/he-research.jpg",
  },
];

const experience = [
  {
    period: "SEP 2023 - JUN 2026",
    role: "BSc Mathematics and Computer Science",
    company: "University of Bristol",
    description: [
      "Studied a blend of rigorous mathematics and practical computer science.",
      "Covered imperative and functional programming, object-oriented programming, algorithms, probability, statistics and linear algebra.",
    ],
    skills: ["MATHEMATICS", "COMPUTER SCIENCE", "BRISTOL"],
  },
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

const educationItems = experience.slice(0, 1);
const experienceItems = experience.slice(1);

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
            <p className="ps-eyebrow">THINGS I&apos;VE BUILT</p>
            <h2>
              Selected <em>work</em>
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
        ref={experienceView.ref}
        className="experience ps-grid-surface ps-section-shell"
        id="experience"
      >
        <div className="ps-section-index">03 / EXPERIENCE</div>

        <ScrollFrame className="experience-inner">
          <div className="experience-heading ps-reveal">
            <p className="ps-eyebrow">A TIMELINE OF BUILDING AND LEARNING</p>
            <h2>
              A timeline of
              <br />
              <em>making & learning.</em>
            </h2>
            <p>Education, research and projects that shaped how I build.</p>
          </div>

          <div className="experience-groups">
            <section className="experience-group" aria-labelledby="education-heading">
              <h3 className="experience-side-label" id="education-heading">
                Education
              </h3>
              <div className="experience-card-list">
                <div className="experience-connector" aria-hidden="true" />
                {educationItems.map((item, index) => (
                  <ExperienceCard
                    item={item}
                    index={index}
                    key={`${item.company}-${item.period}`}
                  />
                ))}
              </div>
            </section>

            <section className="experience-group" aria-labelledby="experience-heading">
              <h3 className="experience-side-label" id="experience-heading">
                Experience
              </h3>
              <div className="experience-card-list">
                <div className="experience-connector" aria-hidden="true" />
                {experienceItems.map((item, index) => (
                  <ExperienceCard
                    item={item}
                    index={index + educationItems.length}
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
        <div className="ps-section-index">04 / CONTACT</div>

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
          <a href="#experience">Experience</a>
          <a href="#home">Back to top</a>
        </nav>
      </footer>
    </div>
  );
}
