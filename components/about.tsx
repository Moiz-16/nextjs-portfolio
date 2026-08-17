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

const monthFormatter = new Intl.DateTimeFormat("en-GB", { month: "short" });

const weekdayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

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

const dashboardContent = {
  reading: {
    title: "Iliad - Homer",
    detail: "Penguin Classics - Fagles",
  },
  country: {
    title: "Indonesia",
    detail: "Jakarta - most recent travel pin",
  },
  travel: {
    title: "Japan, Türkiye, Morocco",
    detail: "Next three places I'd like to explore.",
  },
  quote: {
    title: "Make failure boring.",
    detail: "A useful little rule for software, systems and life.",
  },
  queue: {
    title: "Same As Ever - Morgan Housel",
    detail: "Next after Iliad.",
  },
  game: {
    title: "Catan: Starfarers",
    detail: "Trade, explore and over-negotiate slightly.",
  },
  lego: {
    title: "LEGO Icons Concorde",
    detail: "Engineering nostalgia in tiny white bricks.",
  },
  life: {
    title: "Reading, travelling, training or trying new food.",
    detail: "Usually with a notes app open somewhere nearby.",
  },
  learning: {
    title: "Kubernetes internals",
    detail: "Systems get more interesting when the abstractions leak.",
  },
  photoRoll: {
    places: ["Jakarta", "Bristol", "London", "Next"],
    detail: "Tiny memory pins from places, walks and weekends.",
  },
};

const techStack = [
  { label: "Python", Icon: SiPython },
  { label: "Java", Icon: FaJava },
  { label: "C / C++", Icon: SiCplusplus },
  { label: "TypeScript", Icon: SiTypescript },
  { label: "PyTorch", Icon: SiPytorch },
  { label: "AWS", Icon: SiAmazonaws },
] satisfies Array<{ label: string; Icon: IconType }>;

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
  const monthLabels: string[] = [];
  let previousMonth = -1;
  const cursor = new Date(startDate);

  while (cursor <= endDate) {
    const week: Array<GitHubActivityDay | null> = [];
    let monthLabel = "";

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const dateKey = formatGraphDate(cursor);
      const day = daysByDate.get(dateKey) ?? null;

      if (day && cursor.getMonth() !== previousMonth) {
        monthLabel = monthFormatter.format(cursor);
        previousMonth = cursor.getMonth();
      }

      week.push(day);
      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push(week);
    monthLabels.push(monthLabel);
  }

  return { monthLabels, weeks };
}

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
        <span className="about-panel-kicker">RECENT WORK</span>
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
            GitHub activity
          </span>
          <strong>{githubStats.totalContributions}</strong>
        </div>

        <div className="commit-calendar" style={graphStyle}>
          <div className="commit-months" aria-hidden="true">
            <span />
            {contributionCalendar.monthLabels.map((label, index) => (
              <span key={`${label}-${index}`}>{label}</span>
            ))}
          </div>

          <div className="commit-body">
            <div className="commit-weekdays" aria-hidden="true">
              {weekdayLabels.map((label, index) => (
                <span key={`${label}-${index}`}>{label}</span>
              ))}
            </div>

            <div
              aria-label="GitHub contribution activity graph"
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

          <div className="commit-legend" aria-hidden="true">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <i className={`commit-cell--${level}`} key={level} />
            ))}
            <span>More</span>
          </div>
        </div>

        <p>
          {graphRangeLabel} - {githubStats.source}
        </p>
      </article>

      <article className="about-panel about-panel--metric">
        <span className="about-panel-kicker">LAST 7D</span>
        <strong>{githubStats.sevenDayCommits}</strong>
        <p>commits</p>
      </article>

      <article className="about-panel about-panel--tech-stack">
        <span className="about-panel-label">
          <BsStack aria-hidden="true" />
          Tech stack
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
          <h3>Tech stacks I&apos;m familiar with</h3>
          <p>
            Python, Java, C / C++, TypeScript, PyTorch and AWS across research,
            product experiments and systems-focused work.
          </p>
        </div>
      </article>

      <article className="about-panel about-panel--learning">
        <span className="about-panel-label">
          <BsLightbulb aria-hidden="true" />
          One thing I&apos;m learning
        </span>
        <h3>{dashboardContent.learning.title}</h3>
        <p>{dashboardContent.learning.detail}</p>
      </article>

      <article className="about-panel about-panel--reading">
        <span className="about-panel-label">
          <BsBook aria-hidden="true" />
          Currently reading
        </span>
        <h3>{dashboardContent.reading.title}</h3>
        <p>{dashboardContent.reading.detail}</p>
      </article>

      <article className="about-panel about-panel--queue">
        <span className="about-panel-label">
          <BsBookHalf aria-hidden="true" />
          Book queue
        </span>
        <h3>{dashboardContent.queue.title}</h3>
        <p>{dashboardContent.queue.detail}</p>
      </article>

      <article className="about-panel about-panel--country">
        <span className="about-panel-label">
          <BsGlobe2 aria-hidden="true" />
          Last visited country
        </span>
        <h3>{dashboardContent.country.title}</h3>
        <p>{dashboardContent.country.detail}</p>
      </article>

      <article className="about-panel about-panel--travel">
        <span className="about-panel-label">
          <BsAirplane aria-hidden="true" />
          Travel list
        </span>
        <h3>{dashboardContent.travel.title}</h3>
        <p>{dashboardContent.travel.detail}</p>
      </article>

      <article className="about-panel about-panel--photo-roll">
        <span className="about-panel-label">
          <BsCamera aria-hidden="true" />
          Photo roll
        </span>
        <div className="photo-roll-strip" aria-hidden="true">
          {dashboardContent.photoRoll.places.map((place) => (
            <span key={place}>{place}</span>
          ))}
        </div>
        <p>{dashboardContent.photoRoll.detail}</p>
      </article>

      <article className="about-panel about-panel--quote">
        <span className="about-panel-label">
          <BsQuote aria-hidden="true" />
          Favourite quote
        </span>
        <h3>{dashboardContent.quote.title}</h3>
        <p>{dashboardContent.quote.detail}</p>
      </article>

      <article className="about-panel about-panel--game">
        <span className="about-panel-label">
          <BsJoystick aria-hidden="true" />
          Favourite game
        </span>
        <h3>{dashboardContent.game.title}</h3>
        <p>{dashboardContent.game.detail}</p>
      </article>

      <article className="about-panel about-panel--lego">
        <span className="about-panel-label">
          <BsBricks aria-hidden="true" />
          Current Lego set
        </span>
        <h3>{dashboardContent.lego.title}</h3>
        <p>{dashboardContent.lego.detail}</p>
      </article>

      <article className="about-panel about-panel--life">
        <span className="about-panel-label">
          <BsCodeSlash aria-hidden="true" />
          If not coding
        </span>
        <h3>{dashboardContent.life.title}</h3>
        <p>{dashboardContent.life.detail}</p>
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
          I&apos;m a Bristol Maths and Computer Science graduate who likes
          building at the edge of software, data and finance.
        </p>

        <p>
          I&apos;ve worked on Nexus, financial NLP research, trading bots,
          neural SDEs, HPC optimisation and a handful of data science projects,
          but the thing I enjoy most is the process underneath: figuring out how
          something works, where it breaks, and how to make it better. I&apos;m
          now heading into Site Reliability Engineering at JPMorgan Chase. Away
          from the technical side, I&apos;m into word puzzles, reading,
          travelling, training, trying new food, Lego and board games.
        </p>
      </div>

      <AboutDashboard />

      <PixelFlower className="about-flower" variant="coral" />
    </section>
  );
}
