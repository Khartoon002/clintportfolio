import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/projectsData";

type ProjectCardProps = {
  project: ProjectMeta;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="proj">
      <Link
        href={`/projects/${project.slug}`}
        className="projMediaLink"
        aria-label={`Open ${project.title} case study`}
      >
        <div className="peekWrap">
          <Image
            className="projectImage"
            src={project.imageUrl}
            alt={`${project.title} web application case study preview`}
            fill
            sizes="(max-width: 980px) 100vw, 50vw"
          />
          <div className="projectOverlay" aria-hidden />
          <div className="projTag">{project.role}</div>
          <div className="projStatus">
            {project.liveUrl ? "Live demo" : "Case study"}
          </div>
        </div>
      </Link>

      <div className="projBody">
        <div className="projMeta">
          <span>{project.duration}</span>
          <span>{project.year}</span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.desc}</p>

        <div className="projectHighlights">
          {project.highlights.slice(0, 2).map((highlight) => (
            <span key={highlight} className="highlightChip">
              {highlight}
            </span>
          ))}
        </div>

        <div
          className="ctaRow"
          style={{ justifyContent: "flex-start", marginTop: 0 }}
        >
          <Link
            className="btn btnSm btnPrimary animated-button"
            href={`/projects/${project.slug}`}
            aria-label={`View ${project.title} case study`}
          >
            <span className="text">View {project.title}</span>
            <span className="circle" aria-hidden />
          </Link>

          {project.liveUrl ? (
            <a
              className="btn btnSm"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo for ${project.title}`}
            >
              <span className="text">Open live</span>
              <span className="circle" aria-hidden />
            </a>
          ) : (
            <span className="inlineHint">Live demo available on request.</span>
          )}
        </div>
      </div>
    </article>
  );
}
