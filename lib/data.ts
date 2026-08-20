import { RiRobot2Line } from "react-icons/ri";
import { FiDatabase } from "react-icons/fi";
import { MdOutlineScience } from "react-icons/md";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import scotlandImg from "@/public/scotlandyard_ai.png";
import appImg from "@/public/dropkick_app.png";
import heImg from "@/public/he_project.png";
import fxBotImg from "@/public/fx_trading_bot.png";
import gptBotImg from "@/public/gpt_bot.png";
import tvImg from "@/public/tradingview_indicators.png";
import carAiImg from "@/public/self_driving_car.png";
import qhackImg from "@/public/qhack_2025.png";
import imcImg from "@/public/imc_prosperity.png";
import nexusImg from "@/public/nexus.png";
import tmtImg from "@/public/IMA_TMT_2025_Conference_Abstract.png";
import { FaBriefcase } from "react-icons/fa";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Education",
    hash: "#education",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const headerData = {
  wordmark: "MS",
  suffix: "©26",
  homeAriaLabel: "Moiz Saleem - home",
  nav: [
    { label: "ABOUT", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "EDUCATION", href: "#education" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "CONTACT", href: "#contact" },
  ],
} as const;

export const socialLinks = {
  github: {
    label: "GitHub",
    href: "https://github.com/Moiz-16",
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/moiz-saleem/",
  },
} as const;

export const homeData = {
  name: "moiz saleem",
  coordinates: "51.5054° N\u00A0\u00A00.0235° W",
  intro:
    "Bristol Maths and Computer Science graduate building across software, data and systems as an incoming Site Reliability Engineer.",
  socials: {
    contactLabel: "Contact",
    contactHref: "#contact",
  },
  scrollPrompt: "↓ SCROLL TO EXPLORE",
  hiddenLabels: {
    kicker: ["SOFTWARE ENGINEER", "QUANTITATIVE BUILDER"],
    location: "BASED IN THE UK",
    footerLeft: ["AVAILABLE FOR", "INTERESTING IDEAS"],
    footerRight: ["MATHEMATICS × CS", "BRISTOL"],
  },
} as const;

export const aboutData = {
  sectionIndex: "01 / ABOUT",
  heading: {
    lineOne: "A little context",
    lineTwo: "about",
    emphasis: "me",
  },
  lead:
    "I'm a Bristol Maths and Computer Science graduate joining JPMorgan Chase as a Site Reliability Engineer.",
  body:
    "My work spans neural SDE research, trading bots, HPC code optimisation, financial NLP, product design, data science and quantitative finance. I've built Nexus, an internship application platform for students, developed cointegration-based trading strategies that led to an invited IMA TMT talk, worked on dissertation research around neural SDEs, and taken on performance-focused systems work through HPC optimisation. I'm drawn to projects where there's a knot of complexity to untangle, whether that means turning research into usable tools, making data-heavy workflows clearer, or building products that solve practical problems. Away from software, I'm into word puzzles, reading, travelling, training, trying new food, Lego and board games.",
} as const;

export const aboutDashboardData = {
  githubFallback: {
    latest: {
      branch: "main",
      hash: "sync",
      message: "Fetching public GitHub activity",
      repo: "Moiz-16",
      when: "loading",
    },
    source: "GitHub",
  },
  panels: {
    latestWork: {
      label: "RECENT WORK",
    },
    githubActivity: {
      label: "GitHub activity",
      ariaLabel: "GitHub contribution activity graph",
    },
    sevenDayCommits: {
      label: "LAST 7D",
      unit: "commits",
    },
    techStack: {
      label: "Tech stack",
      title: "Tech stacks I'm familiar with",
      detail:
        "Python, Java, C / C++, TypeScript, PyTorch and AWS across research, product experiments and systems-focused work.",
    },
    learning: {
      label: "One thing I'm learning",
      title: "Kubernetes internals",
      detail: "Systems get more interesting when the abstractions leak.",
    },
    reading: {
      label: "Currently reading",
      title: "Iliad - Homer",
      detail: "Penguin Classics - Fagles",
    },
    queue: {
      label: "Book queue",
      title: "Same As Ever - Morgan Housel",
      detail: "Next after Iliad.",
    },
    country: {
      label: "Last visited country",
      title: "Indonesia",
      detail: "Jakarta - most recent travel pin",
    },
    travel: {
      label: "Travel list",
      title: "Japan, Türkiye, Morocco",
      detail: "Next three places I'd like to explore.",
    },
    photoRoll: {
      label: "Photo roll",
      places: ["Jakarta", "Bristol", "London", "Next"],
      detail: "Tiny memory pins from places, walks and weekends.",
    },
    quote: {
      label: "Favourite quote",
      title: "Make failure boring.",
      detail: "A useful little rule for software, systems and life.",
    },
    game: {
      label: "Favourite game",
      title: "Catan: Starfarers",
      detail: "Trade, explore and over-negotiate slightly.",
    },
    lego: {
      label: "Current Lego set",
      title: "LEGO Icons Concorde",
      detail: "Engineering nostalgia in tiny white bricks.",
    },
    life: {
      label: "If not coding",
      title: "Reading, travelling, training or trying new food.",
      detail: "Usually with a notes app open somewhere nearby.",
    },
  },
} as const;

export const techStackData = [
  "Python",
  "Java",
  "C / C++",
  "TypeScript",
  "PyTorch",
  "AWS",
] as const;

export const experiencesData = [
  {
    title: "University of Bristol",
    subtitle: "BSc Mathematics and Computer Science",
    description:
      `Modules Including:
    Imperative and Functional Programming
    Object-Oriented Programming and Algorithms I
    Probability and Statistics
    Linear Algebra`,
    icon: LuGraduationCap,
    date: "Sep 2023 - Jun 2026",
  },
  {
    title: "University of Bristol",
    subtitle: "Research Intern",
    description:
      `Devising a process for maximising the number of links between financial databases using textual analysis and natural language processing techniques.`,
    icon: MdOutlineScience,
    date: "Jun 2025 - Aug 2025",
  },
  {
    title: "Nexus",
    subtitle: "Founder",
    description:
      `Created Nexus, an intelligent platform designed to streamline the internship application process for students. It provides a centralised dashboard to track applications, leverages AI to automate data entry, and offers tools for data-driven insights and interview preparation.`,
    icon: FaBriefcase,
    date: "Mar 2025 - Present",
  },
  {
    title: "WorldQuant University",
    subtitle: "Applied Data Science Lab",
    description:
      `• Developed an ARMA time-series model for forecasting particulate matter levels in Kenya, leveraging MongoDB datasets and performing comprehensive time series analysis for accuracy.
    • Built a linear regression model with a machine learning pipeline, incorporating feature encoding and imputation, to predict apartment prices in Argentina.`,
    icon: FiDatabase,
    date: "Jun 2024 - Jan 2025",
  },
  {
    title: "Encode Club",
    subtitle: "AI Foundation Bootcamp",
    description:
      `• Explored the architecture and applications of LLMs like ChatGPT and LLaMA-2, including model training methods and prompt engineering.
    • Integrated ChatGPT API with a local web UI to create an adjustable-parameter chatbot.
    • Used the Stable Diffusion Model in Python for text-to-image generation, exploring various techniques.`,
    icon: RiRobot2Line,
    date: "Feb 2024 - Mar 2024",
  },
  {
    title: "KETS Quantum Security LTD",
    subtitle: "",
    description:
      `• Collaborated on a group project to research quantum technology, leading to a presentation on quantum computing fundamentals.
    • Delivered the presentation to the company and effectively addressed follow-up questions.
    • Engaged with external experts to deepen understanding of quantum technologies and industry insights.`,
    icon: FaReact,
    date: "August 2021",
  },
] as const;

export const projectsData = [
  {
    title: "Nexus - Internship Application Tracker",
    description:
      "Nexus is an intelligent platform designed to streamline the internship application process for students. It provides a centralised dashboard to track applications, leverages AI to automate data entry, and offers tools for data-driven insights and interview preparation.",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    imageUrl: nexusImg,
    link: "",
  },
  {
    title: "IMC Prosperity 3 Challenge",
    description:
      "Participated in the IMC Prosperity 3 competition, ranking 107th nationally and 1536th globally among over 12,000 participants. Implemented market making and options strategies across multiple asset classes, adapting through five increasingly complex competition rounds.",
    tags: ["Python", "Pandas", "NumPy", "Data Analysis"],
    imageUrl: imcImg,
    link: "",
  },
  {
    title: "Quantum Bank Heist: QAOA Path Optimisation (QHack 2025)",
    description:
      "🥈Second place at QHack 2025🥈 Solo project using QAOA to optimize escape routes in a bank heist scenario. Implemented 3-layer quantum circuits with Qiskit, achieving 95% approximation to classical algorithms across 50+ test simulations.",
    tags: ["Python", "Qiskit", "Quantum Technology"],
    imageUrl: qhackImg,
    link: "",
  },
  {
    title: "IMA TMT 2025 Conference Talk",
    description:
      "Delivered a talk at the IMA's 2025 TMT conference on using cointegration in finance to develop quantitative trading strategies by identifying equilibrium relationships between time series and trading the spread.",
    tags: ["Research", "Quantitative Finance"],
    imageUrl: tmtImg,
    link: "",
  },
  {
    title: "Mobile App Games",
    description:
      "Built mobile-first game experiments focused on quick sessions, responsive touch interactions, scoring loops and polished feedback across small screens.",
    tags: ["Mobile", "TypeScript", "Game Design"],
    imageUrl: appImg,
    link: "",
  },
  {
    title: "Neural SDE Dissertation Project",
    description:
      "Final-year dissertation exploring neural stochastic differential equations for modelling continuous-time dynamics under uncertainty, combining stochastic calculus with PyTorch experimentation.",
    tags: ["Python", "PyTorch", "SDEs", "Research"],
    imageUrl: tmtImg,
    link: "",
  },
  {
    title: "HPC Code Optimisation",
    description:
      "Optimised scientific code by profiling bottlenecks, improving memory access patterns and tightening computational routines for faster research-style workloads.",
    tags: ["C", "C++", "Profiling", "HPC"],
    imageUrl: heImg,
    link: "",
  },
  {
    title: "TradingView Strategy Indicators",
    description:
      "Actively developing and optimising algorithmic trading strategies across multiple asset classes, including equities, forex, and cryptocurrencies, using Pine Script on TradingView.",
    tags: ["Pine Script", "Data Analysis"],
    imageUrl: tvImg,
    link: "",
  },
  {
    title: "Forex/Crypto Trading Bot",
    description:
      "5-min scalping strategy using VWAP, Bollinger Bands, and RSI indicators produced in Python. Achieved impressive 123% returns with a Sharpe ratio of 2.21 on EURUSD currency pair over a 2 year backtest.",
    tags: ["Python", "Pandas", "MQL"],
    imageUrl: fxBotImg,
    link: "",
  },
  {
    title: "ChatGPT News Trader",
    description:
      "System that processes real-time news events, utilizing the Alpaca and OpenAI APIs to feed headlines to ChatGPT, generating impact ratings and placing trades based on the predicted market influence.",
    tags: ["JavaScript", "ChatGPT", "API"],
    imageUrl: gptBotImg,
    link: "",
  },
  {
    title: "Scotland Yard AI",
    description:
      "AI agent designed to play the Scotlandyard boardgame, implementing Dijkstra’s algorithm and a Mini-Max game tree to optimize the AI agents winning performance based on a custom scoring function.",
    tags: ["Java", "OOP", "Design Patterns"],
    imageUrl: scotlandImg,
    link: "",
  },
  {
    title: "Self Driving Car AI",
    description:
      "Implemented an AI-driven self-driving car simulation using Deep Q-Learning (DQN), a reinforcement learning technique, that learns to autonomously navigate a dynamic 2D environment with obstacles.",
    tags: ["Python", "PyTorch", "OOP"],
    imageUrl: carAiImg,
    link: "",
  },
  {
    title: "Mobile App Prototype",
    description:
      "Prototype for a cross-platform mobile application that acted as a calendar for limited shoe releases using Flutter and a GraphQL API to connect to a local Node.JS headless CMS (Strapi).",
    tags: ["Flutter", "Dart", "UI/UX"],
    imageUrl: appImg,
    link: "",
  },
  {
    title: "HE+ Research Project",
    description:
      "Short research project as part of the Cambridge HE+ programme under the theme of 'uncertainty', focusing on how quantum computers have the ability to affect the security of data and the potential implications of Shor's algorithm on RSA encryption.",
    tags: ["Research", "Quantum Technology"],
    imageUrl: heImg,
    link: "",
  },
] as const;

export const projectAccentCycle = ["yellow", "coral", "green", "sky"] as const;

export const projectBackgrounds = {
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
} as const;

export const portfolioSectionData = {
  projects: {
    sectionIndex: "02 / SELECTED PROJECTS",
    title: {
      prefix: "Things I've",
      emphasis: "built",
    },
    description:
      "Research, infrastructure and products built to solve real problems.",
  },
  education: {
    sectionIndex: "03 / EDUCATION",
    eyebrow: "A FORMAL BASE",
    title: "Where the work started.",
  },
  experience: {
    sectionIndex: "04 / EXPERIENCE",
    title: {
      prefix: "A timeline of",
      emphasis: "building and learning.",
    },
    description: "Research, products and technical work that shaped how I build.",
    sideLabel: "Experience",
  },
  contact: {
    sectionIndex: "05 / CONTACT",
    eyebrow: "GET IN TOUCH",
    title: {
      prefix: "Let's build something",
      emphasis: "worth talking about.",
    },
    summary:
      "Send a note about software, research, quant ideas or anything ambitious enough to be interesting.",
  },
} as const;

export const portfolioExperienceData = [
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
] as const;

export const educationData = [
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
] as const;

export const contactFormData = {
  fields: {
    name: {
      label: "Full name",
      placeholder: "Moiz Saleem",
    },
    email: {
      label: "Email address",
      placeholder: "you@example.com",
    },
    message: {
      label: "Your message",
      placeholder: "Tell me about your project, idea or opportunity.",
    },
  },
  note: "I'll never share your details. Straight to my inbox, nothing noisy.",
  successMessage: "Message sent successfully.",
  submitLabel: "Send message",
  submittingLabel: "Sending...",
} as const;

export const footerData = {
  copyright: "2026 Moiz Saleem. All rights reserved.",
  nav: [
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
    { label: "Back to top", href: "#home" },
  ],
} as const;

export const skillsData = [
  "Java",
  "Python",
  "C",
  "Haskell",
  "R",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "React",
  "Next.js",
  "Vue.js",
  "Git",
  "GitHub",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "pyTorch",
  "Flask",
  "SQL",
  "Jupyter",
  "LaTeX",
  "Probabillity",
  "Statistics",
  "Algorithms",
  "Excel",
  "Figma",
] as const;
