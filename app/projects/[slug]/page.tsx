import Link from "next/link";
import { getProjectBySlug, projects } from "@/lib/projectsData";
import ProjectDetailClient from "./ProjectDetailClient";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function slugToTitle(slug: string): string {
  const words = slug
    .split("-")
    .map((word) => word.trim())
    .filter(Boolean);

  if (!words.length) {
    return "Project";
  }

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);
  const fallbackTitle = slugToTitle(slug);

  if (!project) {
    return (
      <section className="anchor">
        <div className="sectionHead">
          <h2>{fallbackTitle}</h2>
          <p>This project is not configured yet.</p>
        </div>

        <div className="panel">
          <p style={{ margin: 0, color: "rgba(244,241,200,.70)" }}>
            The details for <strong>{fallbackTitle}</strong> are not available yet.
            Check back later or return to the main projects page.
          </p>
        </div>

        <div className="divider" style={{ marginTop: 18 }}>
          <strong>More projects</strong>
          <span>
            <Link href="/projects">Back to all builds -&gt;</Link>
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="anchor">
      <div className="sectionHead">
        <h2>{project.title}</h2>
        <p>{project.desc}</p>
      </div>

      <ProjectDetailClient project={project} />
    </section>
  );
}
