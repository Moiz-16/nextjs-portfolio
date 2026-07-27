"use client";

export default function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Moiz Saleem - home">
        moizsaleem.dev
      </a>

      <nav aria-label="Main navigation">
        <a href="#about">ABOUT</a>
        <a href="#projects">PROJECTS</a>
        <a href="#experience">EXPERIENCE</a>
        <a href="#contact">CONTACT</a>
      </nav>

      <a className="header-status" href="#contact">
        <span />
        OPEN TO IDEAS
      </a>
    </header>
  );
}
