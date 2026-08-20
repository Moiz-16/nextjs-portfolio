"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
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
import { aboutDashboardData, aboutData, techStackData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

type GitHubActivityDay = {
  level: number;
  count: number;
  date: string;
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

const DAY_MS = 86400000;
const GRAPH_DAYS = 365;

function formatGraphDate(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}

function parseGraphDate(input: string) {
  const [year, month, day] = input.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function createFallbackGraph(length = GRAPH_DAYS): GitHubActivityDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length }, (_, index) => {
    const date = new Date(today.getTime() - (length - 1 - index) * DAY_MS);

    return {
      count: 0,
      date: formatGraphDate(date),
      level: 0,
    };
  });
}

const FALLBACK_GRAPH: GitHubActivityDay[] = createFallbackGraph();

const FALLBACK_GITHUB_STATS: GitHubStats = {
  graph: FALLBACK_GRAPH,
  latest: aboutDashboardData.githubFallback.latest,
  source: aboutDashboardData.githubFallback.source,
  totalContributions: 0,
  sevenDayCommits: 0,
};

const techStackIconMap = {
  Python: SiPython,
  Java: FaJava,
  "C / C++": SiCplusplus,
  TypeScript: SiTypescript,
  PyTorch: SiPytorch,
  AWS: SiAmazonaws,
} satisfies Record<(typeof techStackData)[number], IconType>;

const techStack = techStackData.map((label) => ({
  label,
  Icon: techStackIconMap[label],
}));

function buildContributionCalendar(graph: GitHubActivityDay[]) {
  const datedGraph = (graph.length ? graph : createFallbackGraph()).map(
    (day, index, days) => {
      if (day.date) return day;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const date = new Date(today.getTime() - (days.length - 1 - index) * DAY_MS);

      return {
        ...day,
        date: formatGraphDate(date),
      };
    },
  );

  const sortedDays = [...datedGraph].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  const firstDate = parseGraphDate(sortedDays[0].date);
  const lastDate = parseGraphDate(sortedDays.at(-1)?.date ?? sortedDays[0].date);
  const startDate = new Date(firstDate);
  const endDate = new Date(lastDate);

  startDate.setDate(firstDate.getDate() - firstDate.getDay());
  endDate.setDate(lastDate.getDate() + (6 - lastDate.getDay()));

  const daysByDate = new Map(sortedDays.map((day) => [day.date, day]));
  const weeks: Array<Array<GitHubActivityDay | null>> = [];
  const cursor = new Date(startDate);

  while (cursor <= endDate) {
    const week: Array<GitHubActivityDay | null> = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const dateKey = formatGraphDate(cursor);
      const day = daysByDate.get(dateKey) ?? null;

      week.push(day);
      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push(week);
  }

  return { weeks };
}

function AboutDashboard() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const panels = aboutDashboardData.panels;
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

  const contributionCalendar = useMemo(
    () => buildContributionCalendar(githubStats.graph),
    [githubStats.graph],
  );
  const graphRangeLabel =
    githubStats.graph.length >= 360
      ? "Last year"
      : `Last ${githubStats.graph.length} days`;
  const graphStyle = {
    "--graph-weeks": contributionCalendar.weeks.length,
  } as CSSProperties;

  return (
    <div className="about-dashboard reveal reveal-dashboard" ref={dashboardRef}>
      <article className="about-panel about-panel--latest">
        <span className="about-panel-kicker">{panels.latestWork.label}</span>
        <h3>{githubStats.latest.message}</h3>
        <p>
          <strong>{githubStats.latest.hash}</strong>
          <span>{githubStats.latest.branch}</span>
          <span>{githubStats.latest.when}</span>
        </p>
        <small>{githubStats.latest.repo}</small>
      </article>

      <article className="about-panel about-panel--graph">
        <div className="about-panel-topline">
          <span className="about-panel-label">
            <BsGithub aria-hidden="true" />
            {panels.githubActivity.label}
          </span>
          <strong>{githubStats.totalContributions}</strong>
        </div>

        <div className="commit-calendar" style={graphStyle}>
          <div
            aria-label={panels.githubActivity.ariaLabel}
            className="commit-graph"
            role="img"
          >
            {contributionCalendar.weeks.flatMap((week, weekIndex) =>
              week.map((day, dayIndex) =>
                day ? (
                  <span
                    aria-hidden="true"
                    className={`commit-cell commit-cell--${day.level}`}
                    key={day.date}
                    title={`${day.count} contributions on ${day.date}`}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="commit-cell commit-cell--empty"
                    key={`empty-${weekIndex}-${dayIndex}`}
                  />
                ),
              ),
            )}
          </div>
        </div>

        <p>
          {graphRangeLabel} - {githubStats.source}
        </p>
      </article>

      <article className="about-panel about-panel--metric">
        <span className="about-panel-kicker">{panels.sevenDayCommits.label}</span>
        <strong>{githubStats.sevenDayCommits}</strong>
        <p>{panels.sevenDayCommits.unit}</p>
      </article>

      <article className="about-panel about-panel--tech-stack">
        <span className="about-panel-label">
          <BsStack aria-hidden="true" />
          {panels.techStack.label}
        </span>

        <div className="tech-stack-icons" aria-label="Technologies">
          <div className="tech-stack-icons-track">
            {[...techStack, ...techStack].map(({ label, Icon }, index) => (
              <span
                aria-hidden={index >= techStack.length}
                aria-label={index < techStack.length ? label : undefined}
                key={`${label}-${index}`}
                title={label}
              >
                <Icon aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>

        <div className="tech-stack-copy">
          <h3>{panels.techStack.title}</h3>
          <p>{panels.techStack.detail}</p>
        </div>
      </article>

      <article className="about-panel about-panel--learning">
        <span className="about-panel-label">
          <BsLightbulb aria-hidden="true" />
          {panels.learning.label}
        </span>
        <h3>{panels.learning.title}</h3>
        <p>{panels.learning.detail}</p>
      </article>

      <article className="about-panel about-panel--reading">
        <span className="about-panel-label">
          <BsBook aria-hidden="true" />
          {panels.reading.label}
        </span>
        <h3>{panels.reading.title}</h3>
        <p>{panels.reading.detail}</p>
      </article>

      <article className="about-panel about-panel--queue">
        <span className="about-panel-label">
          <BsBookHalf aria-hidden="true" />
          {panels.queue.label}
        </span>
        <h3>{panels.queue.title}</h3>
        <p>{panels.queue.detail}</p>
      </article>

      <article className="about-panel about-panel--country">
        <span className="about-panel-label">
          <BsGlobe2 aria-hidden="true" />
          {panels.country.label}
        </span>
        <h3>{panels.country.title}</h3>
        <p>{panels.country.detail}</p>
      </article>

      <article className="about-panel about-panel--travel">
        <span className="about-panel-label">
          <BsAirplane aria-hidden="true" />
          {panels.travel.label}
        </span>
        <h3>{panels.travel.title}</h3>
        <p>{panels.travel.detail}</p>
      </article>

      <article className="about-panel about-panel--photo-roll">
        <span className="about-panel-label">
          <BsCamera aria-hidden="true" />
          {panels.photoRoll.label}
        </span>
        <div className="photo-roll-strip" aria-hidden="true">
          {panels.photoRoll.places.map((place) => (
            <span key={place}>{place}</span>
          ))}
        </div>
        <p>{panels.photoRoll.detail}</p>
      </article>

      <article className="about-panel about-panel--quote">
        <span className="about-panel-label">
          <BsQuote aria-hidden="true" />
          {panels.quote.label}
        </span>
        <h3>{panels.quote.title}</h3>
        <p>{panels.quote.detail}</p>
      </article>

      <article className="about-panel about-panel--game">
        <span className="about-panel-label">
          <BsJoystick aria-hidden="true" />
          {panels.game.label}
        </span>
        <h3>{panels.game.title}</h3>
        <p>{panels.game.detail}</p>
      </article>

      <article className="about-panel about-panel--lego">
        <span className="about-panel-label">
          <BsBricks aria-hidden="true" />
          {panels.lego.label}
        </span>
        <h3>{panels.lego.title}</h3>
        <p>{panels.lego.detail}</p>
      </article>

      <article className="about-panel about-panel--life">
        <span className="about-panel-label">
          <BsCodeSlash aria-hidden="true" />
          {panels.life.label}
        </span>
        <h3>{panels.life.title}</h3>
        <p>{panels.life.detail}</p>
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
      <div className="section-index">{aboutData.sectionIndex}</div>

      <div className="about-heading reveal">
        <h2>
          {aboutData.heading.lineOne} {aboutData.heading.lineTwo}{" "}
          <em>{aboutData.heading.emphasis}</em>
        </h2>
      </div>

      <div className="about-copy reveal reveal-delay">
        <p className="about-lead">{aboutData.lead}</p>

        <p>{aboutData.body}</p>
      </div>

      <AboutDashboard />

      <PixelFlower className="about-flower" variant="coral" />
    </section>
  );
}
