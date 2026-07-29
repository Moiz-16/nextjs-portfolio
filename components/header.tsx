"use client";

import { BsMoon, BsSun } from "react-icons/bs";
import { useTheme } from "@/context/theme-context";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <header className="site-header">
      <a
        className="wordmark cursor-can-hover"
        href="#home"
        aria-label="Moiz Saleem - home"
      >
        MS<span>©26</span>
      </a>

      <nav aria-label="Main navigation">
        <a className="cursor-can-hover" href="#about">
          ABOUT
        </a>
        <a className="cursor-can-hover" href="#projects">
          PROJECTS
        </a>
        <a className="cursor-can-hover" href="#experience">
          EXPERIENCE
        </a>
        <a className="cursor-can-hover" href="#contact">
          CONTACT
        </a>
      </nav>

      <div className="header-actions">
        <a className="header-status cursor-can-hover" href="#contact">
          <span />
          OPEN TO IDEAS
        </a>
        <button
          aria-label={`Switch to ${nextTheme} mode`}
          className="theme-toggle cursor-can-hover"
          onClick={toggleTheme}
          title="Toggle theme (D)"
          type="button"
        >
          <BsSun className="theme-toggle-sun" aria-hidden="true" />
          <BsMoon className="theme-toggle-moon" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
