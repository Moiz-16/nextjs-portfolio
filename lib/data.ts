import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import placeholderImg from "@/public/placeholder.png";
// import rmtdevImg from "@/public/rmtdev.png";
// import wordanalyticsImg from "@/public/wordanalytics.png";

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
    title: "Placeholder 1",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    icon: React.createElement(LuGraduationCap),
    date: "2024 - present",
  },
  {
    title: "Placeholder 2",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    icon: React.createElement(CgWorkAlt),
    date: "2024 - present",
  },
  {
    title: "Placeholder 3",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    icon: React.createElement(FaReact),
    date: "2024",
  },
] as const;

export const projectsData = [
  {
    title: "Placeholder 1",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    tags: ["One", "Two", "Three", "Four", "Five"],
    imageUrl: placeholderImg,
  },
  {
    title: "Placeholder 2",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    tags: ["One", "Two", "Three", "Four", "Five"],
    imageUrl: placeholderImg,
  },
  {
    title: "Placeholder 3",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    tags: ["One", "Two", "Three", "Four", "Five"],
    imageUrl: placeholderImg,
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
  "Tailwind",
  "React",
  "Next.js",
  "Git",
  "GitHub",
  "Probabillity",
  "Statistics",
  "Algorithms",
  "Figma",
  "Notion",

] as const;