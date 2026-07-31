"use client";

import { useEffect, useMemo, useState } from "react";
import { BsBook, BsGithub, BsGlobe2 } from "react-icons/bs";
import { useSectionInView } from "@/lib/hooks";

type GitHubEvent = {
  type: string;
  created_at: string;
  repo?: {
    name: string;
  };
  payload?: {
    ref?: string;
    commits?: Array<{
      message: string;
      sha: string;
    }>;
  };
};

type GitHubStats = {
  graph: number[];
  latest: {
    branch: string;
    hash: string;
    message: string;
    repo: string;
    when: string;
  };
  sevenDayCommits: number;
};

const FALLBACK_GRAPH = Array.from({ length: 252 }, (_, index) => {
  const wave = (index * 7 + Math.floor(index / 6) * 3) % 11;
  if (wave < 3) return 0;
  if (wave < 6) return 1;
  if (wave < 8) return 2;
  if (wave < 10) return 3;
  return 4;
});

const FALLBACK_GITHUB_STATS: GitHubStats = {
  graph: FALLBACK_GRAPH,
  latest: {
    branch: "main",
    hash: "live",
    message: "Syncing public GitHub activity",
    repo: "Moiz-16",
    when: "loading",
  },
  sevenDayCommits: 0,
};

function timeAgo(date: Date) {
  const seconds = Math.max(1, Math.floor((Date.now() - date.getTime()) / 1000));
  const units = [
    ["y", 31536000],
    ["mo", 2592000],
    ["d", 86400],
    ["h", 3600],
    ["m", 60],
  ] as const;

  for (const [label, size] of units) {
    const value = Math.floor(seconds / size);
    if (value >= 1) return `${value}${label} ago`;
  }

  return "just now";
}

function buildGitHubStats(events: GitHubEvent[]): GitHubStats {
  const dayCount = FALLBACK_GRAPH.length;
  const now = new Date();
  const dayStart = new Date(now);
  dayStart.setHours(0, 0, 0, 0);
  const counts = Array.from({ length: dayCount }, () => 0);
  const pushEvents = events.filter(
    (event) => event.type === "PushEvent" && event.payload?.commits?.length,
  );

  for (const event of pushEvents) {
    const createdAt = new Date(event.created_at);
    const diffDays = Math.floor(
      (dayStart.getTime() - createdAt.getTime()) / 86400000,
    );

    if (diffDays >= 0 && diffDays < dayCount) {
      counts[dayCount - 1 - diffDays] += event.payload?.commits?.length ?? 0;
    }
  }

  const latestEvent = pushEvents[0];
  const latestCommit = latestEvent?.payload?.commits?.at(-1);
  const sevenDaysAgo = Date.now() - 7 * 86400000;
  const sevenDayCommits = pushEvents.reduce((total, event) => {
    const createdAt = new Date(event.created_at).getTime();
    if (createdAt < sevenDaysAgo) return total;

    return total + (event.payload?.commits?.length ?? 0);
  }, 0);

  return {
    graph: counts.map((count, index) =>
      count > 0 ? Math.min(4, count) : FALLBACK_GRAPH[index] > 2 ? 1 : 0,
    ),
    latest: latestCommit
      ? {
          branch: latestEvent.payload?.ref?.replace("refs/heads/", "") ?? "main",
          hash: latestCommit.sha.slice(0, 7),
          message: latestCommit.message.split("\n")[0],
          repo: latestEvent.repo?.name.split("/").at(-1) ?? "GitHub",
          when: timeAgo(new Date(latestEvent.created_at)),
        }
      : FALLBACK_GITHUB_STATS.latest,
    sevenDayCommits,
  };
}

function AboutDashboard() {
  const [githubStats, setGithubStats] = useState<GitHubStats>(
    FALLBACK_GITHUB_STATS,
  );

  useEffect(() => {
    let isMounted = true;

    async function loadGitHubActivity() {
      try {
        const response = await fetch(
          "https://api.github.com/users/Moiz-16/events/public?per_page=100",
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
          },
        );

        if (!response.ok) return;

        const events = (await response.json()) as GitHubEvent[];
        if (isMounted) setGithubStats(buildGitHubStats(events));
      } catch {
        // The fallback keeps the card useful when GitHub is rate-limited.
      }
    }

    loadGitHubActivity();

    return () => {
      isMounted = false;
    };
  }, []);

  const graphCells = useMemo(
    () =>
      githubStats.graph.map((level, index) => (
        <span
          aria-hidden="true"
          className={`commit-cell commit-cell--${level}`}
          key={`${level}-${index}`}
        />
      )),
    [githubStats.graph],
  );

  return (
    <div className="about-dashboard reveal reveal-dashboard">
      <article className="about-panel about-panel--graph">
        <div className="about-panel-topline">
          <span className="about-panel-label">
            <BsGithub aria-hidden="true" />
            GitHub activity
          </span>
          <strong>{githubStats.graph.reduce((total, day) => total + day, 0)}</strong>
        </div>

        <div
          aria-label="GitHub commit activity graph"
          className="commit-graph"
          role="img"
        >
          {graphCells}
        </div>

        <p>Public commit activity over the latest visible window.</p>
      </article>

      <article className="about-panel about-panel--latest">
        <span className="about-panel-kicker">LATEST COMMIT</span>
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

      <article className="about-panel about-panel--country">
        <span className="about-panel-label">
          <BsGlobe2 aria-hidden="true" />
          Last visited country
        </span>
        <h3>Indonesia</h3>
        <p>Jakarta - most recent travel pin</p>
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
        <p className="eyebrow">A LITTLE CONTEXT</p>

        <h2>
          Engineer by craft,
          <br />
          <em>mathematician</em> by
          <br />
          training.
        </h2>
      </div>

      <div className="about-copy reveal reveal-delay">
        <p className="about-lead">
          I&apos;m a Mathematics and Computer Science graduate from the
          University of Bristol who likes turning complex systems into useful,
          intuitive products.
        </p>

        <p>
          My work moves between software engineering, quantitative finance,
          applied AI and product design. Whether I&apos;m training a neural SDE,
          speeding up a document pipeline or shaping a new app, I care about
          elegant systems, clear thinking and the details people actually feel.
        </p>

        <div className="skills" aria-label="Core skills">
          <span>PYTHON</span>
          <span>JAVA</span>
          <span>C / C++</span>
          <span>TYPESCRIPT</span>
          <span>PYTORCH</span>
          <span>AWS</span>
        </div>
      </div>

      <div className="about-stat reveal">
        <strong>4-8x</strong>
        <span>RESEARCH PIPELINE SPEED-UP</span>
      </div>

      <AboutDashboard />

      <div className="orbit-badge" aria-hidden="true">
        <span>+</span>
        <div className="orbit-badge-ring">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>

      <PixelFlower className="about-flower" variant="coral" />
    </section>
  );
}
