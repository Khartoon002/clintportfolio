"use client";

import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projectsData";

export default function Projects() {
  return (
    <section id="projects" className="anchor">
      <div className="sectionHead">
        <span className="sectionNum" aria-hidden>
          03
        </span>
        <h2>
          <span className="toneA">Featured work,</span>
          <br />
          <span className="toneB">real solutions.</span>
        </h2>
        <p>
          Selected web application builds by a Nigeria-based full-stack web
          developer.
        </p>
      </div>

      <div className="projGrid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="ctaRow" style={{ marginTop: 24 }}>
        <Link className="btn btnPrimary animated-button" href="/projects">
          <span className="text">See more projects</span>
          <span className="circle" aria-hidden />
        </Link>

        <Link className="btn animated-button" href="/web-developer-in-nigeria">
          <span className="text">See services in Nigeria</span>
          <span className="circle" aria-hidden />
        </Link>
      </div>

      <div className="divider" style={{ marginTop: 18 }}>
        <strong>Need a full-stack solution?</strong>
        <span>
          Share your requirements and I&apos;ll architect the right build for
          your business.
        </span>
      </div>
    </section>
  );
}
