import { NextResponse } from "next/server";

type ActivityDay = {
  count: number;
  level: number;
};

type GitHubEvent = {
  created_at: string;
  repo?: {
    name: string;
  };
  type: string;
  payload?: {
    distinct_size?: number;
    head?: string;
    ref?: string;
    size?: number;
  };
};

type GitHubCommit = {
  commit?: {
    committer?: {
      date?: string;
    };
    message?: string;
  };
  sha?: string;
};

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "Moiz-16";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
const DAY_MS = 86400000;
const GRAPH_DAYS = 30;

export const dynamic = "force-dynamic";

function emptyGraph() {
  return Array.from({ length: GRAPH_DAYS }, () => ({
    count: 0,
    level: 0,
  }));
}

function contributionLevel(count: number) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 7) return 3;
  return 4;
}

function timeAgo(input?: string) {
  if (!input) return "unknown";

  const date = new Date(input);
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

function githubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "moizsaleem.dev",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchPublicEvents() {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`,
    {
      headers: githubHeaders(),
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) return [];

  return (await response.json()) as GitHubEvent[];
}

function eventCommitCount(event: GitHubEvent) {
  return event.payload?.distinct_size ?? event.payload?.size ?? 1;
}

function graphFromPublicEvents(events: GitHubEvent[]) {
  const graph = emptyGraph();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const event of events) {
    if (event.type !== "PushEvent") continue;

    const eventDate = new Date(event.created_at);
    eventDate.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - eventDate.getTime()) / DAY_MS);

    if (diffDays < 0 || diffDays >= graph.length) continue;

    const index = graph.length - 1 - diffDays;
    graph[index].count += eventCommitCount(event);
  }

  return graph.map((day) => ({
    ...day,
    level: contributionLevel(day.count),
  }));
}

async function latestCommitFromEvents(events: GitHubEvent[]) {
  const latestPush = events.find(
    (event) => event.type === "PushEvent" && event.payload?.head && event.repo,
  );

  if (!latestPush?.payload?.head || !latestPush.repo?.name) {
    return {
      branch: "main",
      hash: "none",
      message: "No public pushes found recently",
      repo: GITHUB_USERNAME,
      when: "public events",
    };
  }

  const branch = latestPush.payload.ref?.replace("refs/heads/", "") ?? "main";
  const hash = latestPush.payload.head.slice(0, 7);
  const repo = latestPush.repo.name.split("/").at(-1) ?? latestPush.repo.name;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${latestPush.repo.name}/commits/${latestPush.payload.head}`,
      {
        headers: githubHeaders(),
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      return {
        branch,
        hash,
        message: `Pushed to ${repo}`,
        repo,
        when: timeAgo(latestPush.created_at),
      };
    }

    const commit = (await response.json()) as GitHubCommit;

    return {
      branch,
      hash: commit.sha?.slice(0, 7) ?? hash,
      message: commit.commit?.message?.split("\n")[0] ?? `Pushed to ${repo}`,
      repo,
      when: timeAgo(commit.commit?.committer?.date ?? latestPush.created_at),
    };
  } catch {
    return {
      branch,
      hash,
      message: `Pushed to ${repo}`,
      repo,
      when: timeAgo(latestPush.created_at),
    };
  }
}

function sevenDayCommitsFromEvents(events: GitHubEvent[]) {
  const sevenDaysAgo = Date.now() - 7 * DAY_MS;

  return events.reduce((total, event) => {
    if (event.type !== "PushEvent") return total;
    if (new Date(event.created_at).getTime() < sevenDaysAgo) return total;

    return total + eventCommitCount(event);
  }, 0);
}

async function contributionGraphFromGitHub() {
  if (!GITHUB_TOKEN) return null;

  const to = new Date();
  const from = new Date(to.getTime() - (GRAPH_DAYS - 1) * DAY_MS);
  const weekFrom = new Date(to.getTime() - 7 * DAY_MS);

  const query = `
    query PortfolioContributions(
      $login: String!
      $from: DateTime!
      $to: DateTime!
      $weekFrom: DateTime!
    ) {
      user(login: $login) {
        year: contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
              }
            }
          }
        }
        week: contributionsCollection(from: $weekFrom, to: $to) {
          totalCommitContributions
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      body: JSON.stringify({
        query,
        variables: {
          from: from.toISOString(),
          login: GITHUB_USERNAME,
          to: to.toISOString(),
          weekFrom: weekFrom.toISOString(),
        },
      }),
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "moizsaleem.dev",
      },
      method: "POST",
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    const payload = await response.json();
    const user = payload?.data?.user;
    const calendar = user?.year?.contributionCalendar;
    const days =
      calendar?.weeks?.flatMap(
        (week: { contributionDays?: Array<{ contributionCount: number }> }) =>
          week.contributionDays ?? [],
      ) ?? [];

    if (!days.length) return null;

    return {
      graph: days.map((day: { contributionCount: number }) => ({
        count: day.contributionCount,
        level: contributionLevel(day.contributionCount),
      })) as ActivityDay[],
      sevenDayCommits:
        typeof user?.week?.totalCommitContributions === "number"
          ? user.week.totalCommitContributions
          : undefined,
      totalContributions:
        typeof calendar?.totalContributions === "number"
          ? calendar.totalContributions
          : days.reduce(
              (total: number, day: { contributionCount: number }) =>
                total + day.contributionCount,
              0,
            ),
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const [events, contributionGraph] = await Promise.all([
    fetchPublicEvents(),
    contributionGraphFromGitHub(),
  ]);
  const publicGraph = graphFromPublicEvents(events);
  const latest = await latestCommitFromEvents(events);
  const publicSevenDayCommits = sevenDayCommitsFromEvents(events);

  return NextResponse.json(
    {
      graph: contributionGraph?.graph ?? publicGraph,
      latest,
      sevenDayCommits:
        contributionGraph?.sevenDayCommits ?? publicSevenDayCommits,
      source: contributionGraph
        ? "GitHub contribution graph"
        : "Public GitHub events",
      totalContributions:
        contributionGraph?.totalContributions ??
        publicGraph.reduce((total, day) => total + day.count, 0),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    },
  );
}
