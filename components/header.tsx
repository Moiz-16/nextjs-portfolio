"use client";

import { BsMoon, BsSun } from "react-icons/bs";
import { useTheme } from "@/context/theme-context";
import { headerData } from "@/lib/data";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <header className="site-header">
      <a
        className="wordmark cursor-can-hover"
        href="#home"
        aria-label={headerData.homeAriaLabel}
      >
        {headerData.wordmark}
        <span>{headerData.suffix}</span>
      </a>

      <nav aria-label="Main navigation">
        {headerData.nav.map((item) => (
          <a className="cursor-can-hover" href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
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
