import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const socialImage = absoluteUrl(siteConfig.socialImage) ?? siteConfig.socialImage;
const pagePath = "/web-developer-in-nigeria";
const pageUrl = absoluteUrl(pagePath) ?? pagePath;
const personId = siteUrl ? `${siteUrl}/#person` : "#person";
const serviceId = siteUrl ? `${siteUrl}${pagePath}#service` : "#service";
const webpageId = siteUrl ? `${siteUrl}${pagePath}#webpage` : "#webpage";

const serviceCards = [
  {
    title: "Custom business websites",
    desc: "Fast, responsive websites built to convert visitors into inquiries, leads, and customers.",
  },
  {
    title: "Full-stack web applications",
    desc: "Dashboards, portals, and internal tools with clean architecture and dependable APIs.",
  },
  {
    title: "E-commerce development",
    desc: "Storefronts and checkout flows designed for trust, clarity, and future growth.",
  },
  {
    title: "Technical SEO delivery",
    desc: "Metadata, structured data, sitemap coverage, crawl handling, and performance-aware implementation.",
  },
];

const processSteps = [
  {
    title: "Plan the right build",
    desc: "We define the business goal, user flow, core pages, and technical scope before development starts.",
  },
  {
    title: "Build with modern tools",
    desc: "I use React, Next.js, TypeScript, and Node.js to ship stable, maintainable products.",
  },
  {
    title: "Launch for growth",
    desc: "The finished build is tuned for speed, accessibility, SEO readiness, and long-term iteration.",
  },
];

const faqItems = [
  {
    question: "What can you build as a web developer in Nigeria?",
    answer:
      "I build marketing websites, web applications, dashboards, admin panels, e-commerce experiences, and API-driven products.",
  },
  {
    question: "Do you work with startups and established businesses?",
    answer:
      "Yes. I work with founders launching new products, small businesses improving their online presence, and teams that need a dependable full-stack developer.",
  },
  {
    question: "Do you build with SEO in mind?",
    answer:
      "Yes. My builds include strong metadata, structured data, crawl support, performance awareness, semantic content, and clean internal linking.",
  },
  {
    question: "Can we work remotely across Nigeria?",
    answer:
      "Yes. I can collaborate remotely with teams and business owners across Nigeria and support the project from planning through launch.",
  },
];

export const metadata: Metadata = {
  title: "Web Developer in Nigeria",
  description:
    "Hire a Nigeria-based web developer for custom websites, full-stack web apps, dashboards, e-commerce builds, and technical SEO-ready delivery.",
  keywords: [
    ...siteConfig.keywords,
    "hire web developer in nigeria",
    "best web developer in nigeria",
    "website developer nigeria",
    "full stack web developer nigeria",
  ],
  alternates: siteUrl
    ? {
        canonical: pagePath,
      }
    : undefined,
  openGraph: {
    title: "Web Developer in Nigeria | ClintDoesDev",
    description:
      "Custom websites, dashboards, e-commerce platforms, and full-stack web apps for businesses and founders in Nigeria.",
    url: pageUrl,
    images: [
      {
        url: socialImage,
        width: 1080,
        height: 1080,
        alt: "Clinton, web developer in Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Developer in Nigeria | ClintDoesDev",
    description:
      "Custom websites, dashboards, e-commerce platforms, and full-stack web apps for businesses and founders in Nigeria.",
    images: [socialImage],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.developerName,
      alternateName: siteConfig.siteName,
      jobTitle: "Full-stack Web Developer",
      description: siteConfig.defaultDescription,
      image: socialImage,
      url: siteUrl,
      homeLocation: {
        "@type": "Country",
        name: siteConfig.countryName,
      },
      knowsAbout: [...siteConfig.coreStack],
    },
    {
      "@type": "Service",
      "@id": serviceId,
      name: "Web Developer in Nigeria",
      description:
        "Custom websites, dashboards, e-commerce platforms, and full-stack web apps for businesses and founders in Nigeria.",
      provider: {
        "@id": personId,
      },
      serviceType: [...siteConfig.serviceTypes],
      areaServed: {
        "@type": "Country",
        name: siteConfig.countryName,
      },
      url: pageUrl,
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      name: "Web Developer in Nigeria",
      url: pageUrl,
      inLanguage: siteConfig.language,
      description:
        "Landing page for businesses looking to hire a web developer in Nigeria for custom websites and web applications.",
      about: {
        "@id": personId,
      },
      mainEntity: {
        "@id": serviceId,
      },
    },
  ],
};

export default function WebDeveloperInNigeriaPage() {
  return (
    <section className="anchor">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="sectionHead">
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--serif2)",
            fontSize: "clamp(34px, 4.2vw, 60px)",
            lineHeight: 1.02,
          }}
        >
          <span className="toneA">Web Developer</span>
          <br />
          <span className="toneB">in Nigeria.</span>
        </h1>
        <p>
          Custom websites and full-stack web applications for founders, startups,
          and businesses that want polished delivery, dependable architecture, and
          SEO-aware implementation.
        </p>
      </div>

      <div className="panel">
        <p
          style={{
            margin: 0,
            color: "rgba(244,241,200,.70)",
            fontSize: 17,
            lineHeight: 1.6,
          }}
        >
          If you&apos;re searching for a web developer in Nigeria, I build modern
          digital products that are fast, scalable, and crafted to support real
          business goals. That includes marketing websites, dashboards, customer
          portals, e-commerce experiences, and API-backed applications.
        </p>

        <div className="ctaRow" style={{ justifyContent: "flex-start", marginTop: 18 }}>
          <Link className="btn btnPrimary animated-button" href="/#contact">
            <span className="text">Start your project</span>
            <span className="circle" aria-hidden />
          </Link>
          <Link className="btn animated-button" href="/projects">
            <span className="text">View case studies</span>
            <span className="circle" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="sectionHead" style={{ marginTop: 34 }}>
        <h2>
          <span className="toneA">What I build,</span>
          <br />
          <span className="toneB">for teams in Nigeria.</span>
        </h2>
        <p>Practical products designed to support launch, sales, operations, and growth.</p>
      </div>

      <div className="skillsGrid">
        {serviceCards.map((card) => (
          <div className="skill" key={card.title}>
            <div className="skillTop">
              <span className="pill">service</span>
            </div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="sectionHead" style={{ marginTop: 34 }}>
        <h2>
          <span className="toneA">How I work,</span>
          <br />
          <span className="toneB">from brief to launch.</span>
        </h2>
        <p>A straightforward process built around clarity, communication, and solid execution.</p>
      </div>

      <div className="skillsGrid">
        {processSteps.map((step, index) => (
          <div className="skill" key={step.title}>
            <div className="skillTop">
              <span className="skillGlyph" aria-hidden>
                0{index + 1}
              </span>
              <span className="pill">process</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="divider" style={{ marginTop: 24 }}>
        <strong>Core stack</strong>
        <span>React | Next.js | TypeScript | Node.js | Databases | Technical SEO</span>
      </div>

      <div className="sectionHead" style={{ marginTop: 34 }}>
        <h2>
          <span className="toneA">Common questions,</span>
          <br />
          <span className="toneB">clear answers.</span>
        </h2>
        <p>
          These are the things businesses usually want to know before hiring a web
          developer in Nigeria.
        </p>
      </div>

      <div className="skillsGrid">
        {faqItems.map((item) => (
          <div className="skill" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <p
          style={{
            margin: 0,
            color: "rgba(244,241,200,.70)",
            fontSize: 17,
            lineHeight: 1.6,
          }}
        >
          Need a serious delivery partner for your next website or web app? Use the
          contact section on the homepage to start the conversation, or review the
          project portfolio to see how I think through product quality and execution.
        </p>
      </div>
    </section>
  );
}
