import rawProjects from "@/data/projects.json";

export type ProjectMeta = {
  slug: string;
  title: string;
  desc: string;
  summary: string;
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  stack: string[];
  highlights: string[];
  duration: string;
  role: string;
  year: string;
};

function toText(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => toText(item))
    .filter(Boolean);
}

function normalizeProject(value: unknown, index: number): ProjectMeta | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const project = value as Record<string, unknown>;
  const title = toText(project.title, `Project ${index + 1}`);
  const slug = toText(project.slug) || slugify(title) || `project-${index + 1}`;
  const highlights = toStringArray(project.highlights);
  const stack = toStringArray(project.stack);
  const desc =
    toText(project.desc) ||
    toText(project.summary) ||
    "Project details coming soon.";
  const summary =
    toText(project.summary) ||
    desc ||
    "Project details coming soon.";
  const role = toText(project.role, "Web project");
  const year = toText(project.year, "Recent");
  const duration = toText(project.duration, "In progress");
  const imageUrl = toText(project.imageUrl, "/assets/project1.jpg");
  const liveUrl = toText(project.liveUrl);
  const repoUrl = toText(project.repoUrl);

  if (!title || !slug) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Skipping project with missing title/slug in data/projects.json", value);
    }

    return null;
  }

  return {
    slug,
    title,
    desc,
    summary,
    imageUrl,
    ...(liveUrl ? { liveUrl } : {}),
    ...(repoUrl ? { repoUrl } : {}),
    stack,
    highlights,
    duration,
    role,
    year,
  };
}

export const projects: ProjectMeta[] = rawProjects
  .map((project, index) => normalizeProject(project, index))
  .filter((project): project is ProjectMeta => Boolean(project));

export const projectStats = {
  total: projects.length,
  totalLabel: projects.length === 0 ? "0" : `${projects.length}+`,
};

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projects.find((project) => project.slug === slug);
}
