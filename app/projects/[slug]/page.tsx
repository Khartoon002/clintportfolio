import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projectsData";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import ProjectDetailClient from "./ProjectDetailClient";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteUrl = getSiteUrl();
const socialImage = absoluteUrl(siteConfig.socialImage) ?? siteConfig.socialImage;

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

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const fallbackTitle = slugToTitle(slug);

  if (!project) {
    return {
      title: fallbackTitle,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const projectUrl = siteUrl ? `${siteUrl}/projects/${project.slug}` : undefined;
  const projectImage = absoluteUrl(project.imageUrl) ?? project.imageUrl;
  const description = `${project.desc} Case study by a full-stack web developer using ${project.stack.join(
    ", "
  )}.`;

  return {
    title: `${project.title} Case Study`,
    description,
    keywords: [
      ...siteConfig.keywords,
      `${project.title} case study`,
      ...project.stack,
    ],
    alternates: projectUrl
      ? {
          canonical: `/projects/${project.slug}`,
        }
      : undefined,
    openGraph: {
      title: `${project.title} Case Study | ${siteConfig.siteName}`,
      description,
      url: projectUrl,
      images: [
        {
          url: projectImage,
          alt: `${project.title} case study preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} Case Study | ${siteConfig.siteName}`,
      description,
      images: [projectImage || socialImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectUrl = absoluteUrl(`/projects/${project.slug}`) ?? `/projects/${project.slug}`;
  const projectImage = absoluteUrl(project.imageUrl) ?? project.imageUrl;
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/") ?? "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: absoluteUrl("/projects") ?? "/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };
  const caseStudyStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.title} Case Study`,
    description: project.summary,
    image: projectImage,
    url: projectUrl,
    creator: {
      "@type": "Person",
      name: siteConfig.developerName,
    },
    keywords: project.stack,
    inLanguage: siteConfig.language,
  };

  return (
    <section className="anchor">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbStructuredData, caseStudyStructuredData]),
        }}
      />

      <div className="sectionHead">
        <h2>{project.title}</h2>
        <p>{project.desc}</p>
      </div>

      <ProjectDetailClient project={project} />
    </section>
  );
}
