import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projectsData";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const socialImage = absoluteUrl(siteConfig.socialImage) ?? siteConfig.socialImage;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web development case studies and portfolio projects by a Nigeria-based full-stack developer building dashboards, storefronts, and production-ready web apps.",
  keywords: [
    ...siteConfig.keywords,
    "web developer portfolio Nigeria",
    "web development case studies Nigeria",
    "Next.js portfolio projects",
  ],
  alternates: siteUrl
    ? {
        canonical: "/projects",
      }
    : undefined,
  openGraph: {
    title: `Projects | ${siteConfig.siteName}`,
    description:
      "Browse web application case studies and portfolio builds by a web developer in Nigeria.",
    url: siteUrl ? `${siteUrl}/projects` : undefined,
    images: [
      {
        url: socialImage,
        width: 1080,
        height: 1080,
        alt: "Clinton portfolio projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${siteConfig.siteName}`,
    description:
      "Browse web application case studies and portfolio builds by a web developer in Nigeria.",
    images: [socialImage],
  },
};

const itemListStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Web development projects by ClintDoesDev",
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: project.title,
    description: project.desc,
    url: absoluteUrl(`/projects/${project.slug}`) ?? `/projects/${project.slug}`,
  })),
};

export default function ProjectsPage() {
  return (
    <section id="projects" className="anchor">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListStructuredData) }}
      />

      <div className="sectionHead">
        <h2>
          <span className="toneA">All work,</span>
          <br />
          <span className="toneB">real builds.</span>
        </h2>
        <p>
          A curated selection of production-style projects from a web developer in
          Nigeria focused on product quality, performance, and polished delivery.
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
