"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BsAirplane,
  BsBook,
  BsBookHalf,
  BsBricks,
  BsCamera,
  BsCodeSlash,
  BsGithub,
  BsGlobe2,
  BsJoystick,
  BsLightbulb,
  BsQuote,
  BsStack,
} from "react-icons/bs";
import { FaJava } from "react-icons/fa";
import {
  SiAmazonaws,
  SiCplusplus,
  SiPytorch,
  SiPython,
  SiTypescript,
} from "react-icons/si";
import { useSectionInView } from "@/lib/hooks";

type GitHubActivityDay = {
  level: number;
  count: number;
};

type GitHubStats = {
  graph: GitHubActivityDay[];
  latest: {
    branch: string;
    hash: string;
    message: string;
    repo: string;
    when: string;
  };
  source: string;
  totalContributions: number;
  sevenDayCommits: number;
};

const FALLBACK_GRAPH: GitHubActivityDay[] = Array.from({ length: 371 }, () => ({
  count: 0,
  level: 0,
}));

const FALLBACK_GITHUB_STATS: GitHubStats = {
  graph: FALLBACK_GRAPH,
  latest: {
    branch: "main",
    hash: "sync",
    message: "Fetching public GitHub activity",
    repo: "Moiz-16",
    when: "loading",
  },
  source: "GitHub",
  totalContributions: 0,
  sevenDayCommits: 0,
};

function AboutDashboard() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [githubStats, setGithubStats] = useState<GitHubStats>(
    FALLBACK_GITHUB_STATS,
  );

  useEffect(() => {
    let isMounted = true;

    async function loadGitHubActivity() {
      try {
        const response = await fetch("/api/github-activity");

        if (!response.ok) return;

        const stats = (await response.json()) as GitHubStats;
        if (isMounted) setGithubStats(stats);
      } catch {
        // The fallback keeps the card useful when GitHub is rate-limited.
      }
    }

    loadGitHubActivity();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const dashboard = dashboardRef.current;
    if (!dashboard) return;

    const handlePointerMove = (event: PointerEvent) => {
      const panel = (event.target as Element).closest(".about-panel");
      if (!(panel instanceof HTMLElement) || !dashboard.contains(panel)) return;

      const rect = panel.getBoundingClientRect();
      panel.style.setProperty("--panel-x", `${event.clientX - rect.left}px`);
      panel.style.setProperty("--panel-y", `${event.clientY - rect.top}px`);
    };

    const handlePointerLeave = () => {
      dashboard.querySelectorAll<HTMLElement>(".about-panel").forEach((panel) => {
        panel.style.setProperty("--panel-x", "50%");
        panel.style.setProperty("--panel-y", "50%");
      });
    };

    dashboard.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    dashboard.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      dashboard.removeEventListener("pointermove", handlePointerMove);
      dashboard.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  const graphCells = useMemo(
    () =>
      githubStats.graph.map((day, index) => (
        <span
          aria-hidden="true"
          className={`commit-cell commit-cell--${day.level}`}
          key={`${day.count}-${index}`}
          title={`${day.count} contributions`}
        />
      )),
    [githubStats.graph],
  );

  return (
    <div className="about-dashboard reveal reveal-dashboard" ref={dashboardRef}>
      <article className="about-panel about-panel--latest">
        <span className="about-panel-kicker">RECENT WORK</span>
        <h3>{githubStats.latest.message}</h3>
        <p>
          <strong>{githubStats.latest.hash}</strong>
          <span>{githubStats.latest.branch}</span>
          <span>{githubStats.latest.when}</span>
        </p>
        <small>{githubStats.latest.repo}</small>
      </article>

      <article className="about-panel about-panel--metric">
        <span className="about-panel-kicker">LAST 7D</span>
        <strong>{githubStats.sevenDayCommits}</strong>
        <p>commits</p>
      </article>

      <article className="about-panel about-panel--reading">
        <span className="about-panel-label">
          <BsBook aria-hidden="true" />
          Currently reading
        </span>
        <h3>Iliad - Homer</h3>
        <p>Penguin Classics - Fagles</p>
      </article>

      <article className="about-panel about-panel--graph">
        <div className="about-panel-topline">
          <span className="about-panel-label">
            <BsGithub aria-hidden="true" />
            GitHub activity
          </span>
          <strong>{githubStats.totalContributions}</strong>
        </div>

        <div
          aria-label="GitHub contribution activity graph"
          className="commit-graph"
          role="img"
        >
          {graphCells}
        </div>

        <p>{githubStats.source}</p>
      </article>

      <article className="about-panel about-panel--tech-stack">
        <span className="about-panel-label">
          <BsStack aria-hidden="true" />
          Tech stack
        </span>

        <div className="tech-stack-icons" aria-label="Technologies">
          <span aria-label="Python" title="Python">
            <SiPython aria-hidden="true" />
          </span>
          <span aria-label="Java" title="Java">
            <FaJava aria-hidden="true" />
          </span>
          <span aria-label="C / C++" title="C / C++">
            <SiCplusplus aria-hidden="true" />
          </span>
          <span aria-label="TypeScript" title="TypeScript">
            <SiTypescript aria-hidden="true" />
          </span>
          <span aria-label="PyTorch" title="PyTorch">
            <SiPytorch aria-hidden="true" />
          </span>
          <span aria-label="AWS" title="AWS">
            <SiAmazonaws aria-hidden="true" />
          </span>
        </div>

        <div className="tech-stack-copy">
          <h3>Tech stacks I&apos;m familiar with</h3>
          <p>
            Python, Java, C / C++, TypeScript, PyTorch and AWS across research,
            product experiments and systems-focused work.
          </p>
        </div>
      </article>

      <article className="about-panel about-panel--country">
        <span className="about-panel-label">
          <BsGlobe2 aria-hidden="true" />
          Last visited country
        </span>
        <h3>Indonesia</h3>
        <p>Jakarta - most recent travel pin</p>
      </article>

      <article className="about-panel about-panel--travel">
        <span className="about-panel-label">
          <BsAirplane aria-hidden="true" />
          Travel list
        </span>
        <h3>Japan, Türkiye, Morocco</h3>
        <p>Next three places I&apos;d like to explore.</p>
      </article>

      <article className="about-panel about-panel--quote">
        <span className="about-panel-label">
          <BsQuote aria-hidden="true" />
          Favourite quote
        </span>
        <h3>Make failure boring.</h3>
        <p>A useful little rule for software, systems and life.</p>
      </article>

      <article className="about-panel about-panel--queue">
        <span className="about-panel-label">
          <BsBookHalf aria-hidden="true" />
          Book queue
        </span>
        <h3>Same As Ever - Morgan Housel</h3>
        <p>Next after Iliad.</p>
      </article>

      <article className="about-panel about-panel--game">
        <span className="about-panel-label">
          <BsJoystick aria-hidden="true" />
          Favourite game
        </span>
        <h3>Catan: Starfarers</h3>
        <p>Trade, explore and over-negotiate slightly.</p>
      </article>

      <article className="about-panel about-panel--lego">
        <span className="about-panel-label">
          <BsBricks aria-hidden="true" />
          Current Lego set
        </span>
        <h3>LEGO Icons Concorde</h3>
        <p>Engineering nostalgia in tiny white bricks.</p>
      </article>

      <article className="about-panel about-panel--life">
        <span className="about-panel-label">
          <BsCodeSlash aria-hidden="true" />
          If not coding
        </span>
        <h3>Reading, travelling, training or trying new food.</h3>
        <p>Usually with a notes app open somewhere nearby.</p>
      </article>

      <article className="about-panel about-panel--learning">
        <span className="about-panel-label">
          <BsLightbulb aria-hidden="true" />
          One thing I&apos;m learning
        </span>
        <h3>Kubernetes internals</h3>
        <p>Systems get more interesting when the abstractions leak.</p>
      </article>

      <article className="about-panel about-panel--photo-roll">
        <span className="about-panel-label">
          <BsCamera aria-hidden="true" />
          Photo roll
        </span>
        <div className="photo-roll-strip" aria-hidden="true">
          <span>Jakarta</span>
          <span>Bristol</span>
          <span>London</span>
          <span>Next</span>
        </div>
        <p>Tiny memory pins from places, walks and weekends.</p>
      </article>
    </div>
  );
}

function PixelFlower({
  className = "",
  variant = "coral",
}: {
  className?: string;
  variant?: "coral" | "yellow" | "small";
}) {
  return (
    <span
      className={`pixel-flower pixel-flower--${variant} ${className}`}
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

export default function About() {
  const { ref } = useSectionInView("About", 0.6);

  return (
    <section ref={ref} className="about section-shell" id="about">
      <div className="section-index">01 / ABOUT</div>

      <div className="about-heading reveal">
        <p className="eyebrow">A LITTLE CONTEXT ABOUT ME</p>

        <h2>
          Maths,
          <br />
          code,
          <br />
          <em>reliable</em>
          <br />
          systems.
        </h2>
      </div>

      <div className="about-copy reveal reveal-delay">
        <p className="about-lead">
          I&apos;m a Mathematics and Computer Science graduate from the University
          of Bristol, now heading into Site Reliability Engineering at JPMorgan
          Chase.
        </p>

        <p>
          My work spans neural SDE research, trading bots, HPC code
          optimisation, product design and quantitative finance, including an
          invited IMA TMT talk on cointegration-based trading strategies. I
          previously founded Nexus, an internship application platform for
          students, and I like building tools where complex ideas become clear,
          useful systems. Away from software, I&apos;m into word puzzles,
          reading, travelling, training, trying new food, Lego and board games.
        </p>
      </div>

      <AboutDashboard />

      <PixelFlower className="about-flower" variant="coral" />
    </section>
  );
}
