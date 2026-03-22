import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projectsData";

export default function ProjectsPage() {
  return (
    <section id="projects" className="anchor">
      <div className="sectionHead">
        <h2>
          <span className="toneA">All work,</span>
          <br />
          <span className="toneB">real builds.</span>
        </h2>
        <p>
          A curated selection of production-style projects with premium UI and
          solid architecture.
        </p>
      </div>

      <div className="projGrid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
