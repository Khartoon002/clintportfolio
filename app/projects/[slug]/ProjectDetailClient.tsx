import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/projectsData";

type Props = {
  project: ProjectMeta;
};

export default function ProjectDetailClient({ project }: Props) {
  const hasPublicLinks = Boolean(project.liveUrl || project.repoUrl);

  return (
    <div
      style={{
        width: "min(980px, calc(100% - 40px))",
        margin: "0 auto",
      }}
    >
      <article className="proj projectDetailCard" style={{ marginBottom: 18 }}>
        <div className="peekWrap">
          <Image
            className="projectImage"
            src={project.imageUrl}
            alt={`${project.title} preview`}
            fill
            priority
            sizes="(max-width: 980px) 100vw, 980px"
          />
          <div className="projectOverlay" aria-hidden />
          <div className="projTag">{project.role}</div>
          <div className="projStatus">{project.year}</div>
        </div>

        <div className="projBody">
          <div className="projMeta">
            <span>{project.duration}</span>
            <span>{project.stack.length} core tools</span>
          </div>

          <h3>Project overview</h3>
          <p>{project.summary}</p>

          <div className="projectHighlights">
            {project.highlights.map((highlight) => (
              <span key={highlight} className="highlightChip">
                {highlight}
              </span>
            ))}
          </div>

          {hasPublicLinks ? (
            <div
              className="ctaRow"
              style={{
                justifyContent: "flex-start",
                marginTop: 6,
                flexWrap: "wrap",
              }}
            >
              {project.liveUrl ? (
                <a
                  className="btn btnSm btnPrimary animated-button"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text">View live site</span>
                  <span className="circle" aria-hidden />
                </a>
              ) : null}

              {project.repoUrl ? (
                <a
                  className="btn btnSm"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text">View GitHub repo</span>
                  <span className="circle" aria-hidden />
                </a>
              ) : null}
            </div>
          ) : (
            <p className="projectPanelNote">
              Live demo and repository links can be added here whenever the public
              versions are ready.
            </p>
          )}
        </div>
      </article>

      <div className="panel">
        <div className="detailGrid">
          <div>
            <strong className="detailSectionTitle">Tech Stack</strong>
            <div className="projectHighlights" style={{ marginTop: 6 }}>
              {project.stack.map((tech) => (
                <span key={tech} className="pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <strong className="detailSectionTitle">Delivery</strong>
            <p className="detailSectionCopy">
              Built in {project.duration} as a {project.role.toLowerCase()} with a
              focus on stable structure, polished presentation, and room for future
              features.
            </p>
          </div>

          <div>
            <strong className="detailSectionTitle">About this build</strong>
            <p className="detailSectionCopy">{project.summary}</p>
          </div>

          <div>
            <strong className="detailSectionTitle">Key highlights</strong>
            <ul className="detailList">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <p className="projectPanelNote" style={{ marginTop: 14 }}>
              Need a public demo or repo button here? Add `liveUrl` and `repoUrl`
              in `data/projects.json`.
            </p>
          </div>
        </div>
      </div>

      <div className="divider" style={{ marginTop: 18 }}>
        <strong>More projects</strong>
        <span>
          <Link href="/projects">Back to all builds -&gt;</Link>
        </span>
      </div>
    </div>
  );
}
