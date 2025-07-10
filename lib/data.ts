import React from "react";
import { CgWorkAlt } from "react-icons/cg";
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
    date: "Sep 2023 - Present",
  },
  {
    title: "University of Bristol",
    subtitle: "Research Intern",
    description:
      `Devising a process for maximising the number of links between financial databases using textual analysis and natural language processing techniques.`,
    icon: MdOutlineScience,
    date: "Jun 2025 - Present",
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
    title: "TradingView Strategy Indicators",
    description:
    "Actively developing and optimising algorithmic trading strategies across multiple asset classes, including equities, forex, and cryptocurrencies, using Pine Script on TradingView.",
    tags: ["Pine Script","Data Analysis"],
    imageUrl: tvImg,
    link: "",
  },
  {
    title: "Forex/Crypto Trading Bot",
    description:
    "5-min scalping strategy using VWAP, Bollinger Bands, and RSI indicators produced in Python. Achieved impressive 123% returns with a Sharpe ratio of 2.21 on EURUSD currency pair over a 2 year backtest.",
    tags: ["Python","Pandas", "MQL"],
    imageUrl: fxBotImg,
    link: "",
  },
  {
    title: "ChatGPT News Trader",
    description:
    "System that processes real-time news events, utilizing the Alpaca and OpenAI APIs to feed headlines to ChatGPT, generating impact ratings and placing trades based on the predicted market influence.",
    tags: ["JavaScript","ChatGPT", "API"],
    imageUrl: gptBotImg,
    link: "",
  },
  {
    title: "Scotland Yard AI",
    description:
    "AI agent designed to play the Scotlandyard boardgame, implementing Dijkstra’s algorithm and a Mini-Max game tree to optimize the AI agents winning performance based on a custom scoring function.",
    tags: ["Java","OOP", "Design Patterns"],
    imageUrl: scotlandImg,
    link: "",
  },
  {
    title: "Self Driving Car AI",
    description:
    "Implemented an AI-driven self-driving car simulation using Deep Q-Learning (DQN), a reinforcement learning technique, that learns to autonomously navigate a dynamic 2D environment with obstacles.",
    tags: ["Python","PyTorch", "OOP"],
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