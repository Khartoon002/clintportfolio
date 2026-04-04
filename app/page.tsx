"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Projects from "@/components/projects";
import { siteConfig } from "@/lib/site-config";

type ContactChannel = "email" | "whatsapp";

const CONTACT_EMAIL = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "").trim();
const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(
  /\D/g,
  ""
);
const PUBLIC_SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();
const WEBSITE_URL = PUBLIC_SITE_URL
  ? PUBLIC_SITE_URL.startsWith("http://") || PUBLIC_SITE_URL.startsWith("https://")
    ? PUBLIC_SITE_URL
    : `https://${PUBLIC_SITE_URL}`
  : undefined;
const SOCIAL_IMAGE = WEBSITE_URL
  ? new URL(siteConfig.socialImage, `${WEBSITE_URL}/`).toString()
  : siteConfig.socialImage;

const DEFAULT_CONTACT_MESSAGE =
  "Hi Clinton, I'd like to discuss a new project with you.";

const stats = [
  { number: "3+", label: "Years building" },
  { number: "15+", label: "Projects shipped" },
  { number: "4", label: "Countries served" },
  { number: "48h", label: "Avg response time" },
];

const skills = [
  {
    glyph: "RE",
    title: "React",
    pill: "core",
    desc: "Component architecture, hooks, state management, and performance optimization.",
  },
  {
    glyph: "NX",
    title: "Next.js",
    pill: "core",
    desc: "SSR, SSG, App Router patterns, route design, and polished delivery.",
  },
  {
    glyph: "TS",
    title: "TypeScript",
    pill: "core",
    desc: "Safer refactors, clearer contracts, and reliable developer experience.",
  },
  {
    glyph: "ND",
    title: "Node.js",
    pill: "backend",
    desc: "APIs, background tasks, middleware logic, and scalable server workflows.",
  },
  {
    glyph: "DB",
    title: "Databases",
    pill: "backend",
    desc: "Schema design, ORM-driven workflows, indexing, and query optimization.",
  },
  {
    glyph: "W3",
    title: "Web3 & Blockchain",
    pill: "specialist",
    desc: "Smart contracts, NFT platforms, wallet integration, and decentralised app architecture.",
  },
  {
    glyph: "UI",
    title: "UI Systems",
    pill: "design",
    desc: "Responsive layouts, animations, accessibility, and premium visual polish.",
  },
  {
    glyph: "PY",
    title: "Paystack & Payments",
    pill: "specialist",
    desc: "African payment flows, subscription billing, webhook handling, and multi-country support.",
  },
];

const personId = WEBSITE_URL ? `${WEBSITE_URL}/#person` : "#person";
const serviceId = WEBSITE_URL ? `${WEBSITE_URL}/#service` : "#service";
const websiteId = WEBSITE_URL ? `${WEBSITE_URL}/#website` : "#website";
const webpageId = WEBSITE_URL ? `${WEBSITE_URL}/#webpage` : "#webpage";

const contactPoints = [
  CONTACT_EMAIL.includes("@")
    ? {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT_EMAIL,
        availableLanguage: ["English"],
      }
    : null,
  WHATSAPP_NUMBER.length >= 10
    ? {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+${WHATSAPP_NUMBER}`,
        url: `https://wa.me/${WHATSAPP_NUMBER}`,
        availableLanguage: ["English"],
      }
    : null,
].filter(Boolean);

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.developerName,
      alternateName: siteConfig.siteName,
      jobTitle: siteConfig.jobTitle,
      description: siteConfig.defaultDescription,
      image: SOCIAL_IMAGE,
      url: WEBSITE_URL,
      homeLocation: {
        "@type": "Country",
        name: siteConfig.countryName,
      },
      knowsAbout: [...siteConfig.coreStack],
      contactPoint: contactPoints.length ? contactPoints : undefined,
    },
    {
      "@type": "Service",
      "@id": serviceId,
      name: "Web Development Services in Nigeria",
      description:
        "Custom websites, dashboards, APIs, and full-stack web applications for founders, startups, and businesses in Nigeria.",
      serviceType: [...siteConfig.serviceTypes],
      areaServed: {
        "@type": "Country",
        name: siteConfig.countryName,
      },
      provider: {
        "@id": personId,
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteConfig.siteName,
      description: siteConfig.defaultDescription,
      inLanguage: siteConfig.language,
      url: WEBSITE_URL,
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      name: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      inLanguage: siteConfig.language,
      url: WEBSITE_URL,
      about: {
        "@id": personId,
      },
      isPartOf: {
        "@id": websiteId,
      },
      primaryImageOfPage: SOCIAL_IMAGE,
    },
  ],
};

export default function HomePage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactChannel, setContactChannel] = useState<ContactChannel>("email");
  const [contactMessage, setContactMessage] = useState("");
  const [contactNotice, setContactNotice] = useState("");

  const emailConfigured = CONTACT_EMAIL.includes("@");
  const whatsappConfigured = WHATSAPP_NUMBER.length >= 10;

  const openContactModal = (channel: ContactChannel = contactChannel) => {
    setContactChannel(channel);
    setContactNotice("");
    setContactModalOpen(true);
  };

  const closeContactModal = () => {
    setContactNotice("");
    setContactModalOpen(false);
  };

  const copyMessage = async () => {
    const msg = contactMessage.trim() || DEFAULT_CONTACT_MESSAGE;

    try {
      await navigator.clipboard.writeText(msg);
      setContactNotice("Your message has been copied and is ready to send.");
    } catch {
      setContactNotice(
        "Copying failed on this device. You can still select the text manually."
      );
    }
  };

  const handleSend = async () => {
    const msg = contactMessage.trim() || DEFAULT_CONTACT_MESSAGE;

    if (contactChannel === "email" && emailConfigured) {
      const subject = "Project inquiry from portfolio";
      const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(msg)}`;
      window.location.href = mailto;
      setContactModalOpen(false);
      return;
    }

    if (contactChannel === "whatsapp" && whatsappConfigured) {
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      setContactModalOpen(false);
      return;
    }

    await copyMessage();
    setContactNotice(
      "This contact channel is not configured yet, so the message was copied instead."
    );
  };

  const contactDestination =
    contactChannel === "email"
      ? emailConfigured
        ? `Email: ${CONTACT_EMAIL}`
        : "Email contact is being updated. You can still copy your message below."
      : whatsappConfigured
        ? `WhatsApp: +${WHATSAPP_NUMBER}`
        : "WhatsApp contact is being updated. You can still copy your message below.";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />

      <section id="home" className="hero anchor">
        <div className="heroInner">
          <div className="chipRow">
            <span className="chip">Full-stack + Web3</span>
            <span className="chip">Africa-focused</span>
            <span className="chip">Product-minded</span>
            <span className="chip">Fast delivery</span>
          </div>

          <h1 className="heroTitle" aria-label="I build products that perform.">
            <span className="heroTitleLine line1" data-text="I build products">
              <span className="fill">I build products</span>
              <span className="shine" aria-hidden />
            </span>
            <br />
            <span className="heroTitleLine line2" data-text="that perform.">
              <span className="fill">that perform.</span>
              <span className="shine" aria-hidden />
            </span>
          </h1>

          <p className="sub">
            I&apos;m <span style={{ color: "var(--yellow)", fontWeight: 700 }}>Clinton</span>
            {" "}- I design and build digital products end to end. Full-stack
            development, Web3 integration, clean APIs. Based in Nigeria, shipping
            for clients across Africa and beyond.
          </p>

          <div className="heroPortrait">
            <Image
              src="/assets/profilepic.jpeg"
              alt="Clinton, a web developer in Nigeria"
              width={1080}
              height={1080}
              priority
              sizes="(max-width: 768px) 78vw, 360px"
            />
            <div className="portraitBadge">
              <span className="portraitDot" />
              Clinton | Developer
            </div>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid rgba(255,255,255,.06)",
              margin: "4px auto",
              width: "min(340px,74vw)",
            }}
          />

          <div className="heroBadges">
            <span className="badge">Web3 & NFT platforms</span>
            <span className="badge">SEO-friendly pages</span>
            <span className="badge">Core Web Vitals focus</span>
            <span className="badge">Paystack integration</span>
          </div>

          <div className="ctaRow">
            <a className="btn btnPrimary animated-button" href="#projects">
              <span className="text">See projects</span>
              <span className="circle" aria-hidden />
            </a>

            <button
              type="button"
              className="btn animated-button"
              onClick={() => openContactModal("email")}
            >
              <span className="text">Hire me</span>
              <span className="circle" aria-hidden />
            </button>
          </div>

          <div
            className="divider"
            style={{ marginTop: 24, flexDirection: "column", gap: 6, textAlign: "center" }}
          >
            <strong>Track record</strong>
            <span style={{ fontSize: 14 }}>
              3+ years | 15+ projects shipped | clients across Africa and the diaspora
            </span>
          </div>
        </div>
      </section>

      <div className="marqueeWrap" aria-hidden>
        <div className="marqueeTrack">
          {[
            "React","Next.js","TypeScript","Node.js","Web3","Blockchain",
            "PostgreSQL","MongoDB","Solidity","Ethers.js","Paystack","Tailwind",
            "Docker","Vercel","REST APIs","NFT Platforms","SaaS","Full-stack",
            "React","Next.js","TypeScript","Node.js","Web3","Blockchain",
            "PostgreSQL","MongoDB","Solidity","Ethers.js","Paystack","Tailwind",
            "Docker","Vercel","REST APIs","NFT Platforms","SaaS","Full-stack"
          ].map((item, i) => (
            <span key={i} className="marqueeItem">{item}</span>
          ))}
        </div>
      </div>

      <section id="stats" className="anchor statsSection">
        <div className="statsGrid">
          {stats.map((stat) => (
            <div className="statCard" key={stat.label}>
              <span className="statNum">{stat.number}</span>
              <span className="statLabel">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="anchor">
        <div className="sectionHead">
          <span className="sectionNum" aria-hidden>01</span>
          <h2>
            <span className="toneA">Product builder.</span>
            <br />
            <span className="toneB">Problem solver.</span>
          </h2>
          <p>
            I started building for the web to create things that didn&apos;t exist
            yet in Nigeria. Today I work with founders, startups, and businesses
            to ship complete digital products - from database architecture to
            polished frontends. I also build Web3 platforms: NFT marketplaces,
            crypto dashboards, and wallet-integrated apps.
          </p>
        </div>

        <div className="panel">
          <p
            style={{
              margin: 0,
              color: "rgba(244,241,200,.70)",
              fontSize: 18,
              lineHeight: 1.6,
            }}
          >
            My approach: understand the problem first, architect the right
            solution, then build and ship with precision. Every project I take on
            gets full-stack attention - backend, API, database, UI - delivered as
            one coherent product.
          </p>
        </div>

        <div className="panel tiktokSection" style={{ marginTop: 14 }}>
          <div className="tiktokPanel">
            <div className="tiktokIcon" aria-hidden />
            <div className="tiktokText">
              <strong>@arrtdecoded on TikTok</strong>
              <span>
                Short-form history and creative content. Building on both screens - the code editor and the camera.
              </span>
            </div>
            <a
              className="btn btnSm animated-button"
              href="https://tiktok.com/@arrtdecoded"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: "auto", flexShrink: 0 }}
            >
              <span className="text">Follow</span>
              <span className="circle" aria-hidden />
            </a>
          </div>
        </div>

        <div className="divider" style={{ marginTop: 16 }}>
          <strong>My promise</strong>
          <span>Clean code | Fast queries | Smooth UX | On-time delivery</span>
        </div>
      </section>

      <section id="skills" className="anchor">
        <div className="sectionHead">
          <span className="sectionNum" aria-hidden>02</span>
          <h2>
            <span className="toneA">What I use</span>
            <br />
            <span className="toneB">to get it done.</span>
          </h2>
          <p>
            Modern tools, production-grade thinking, SEO-aware delivery, and clean
            implementation.
          </p>
        </div>

        <div className="skillsGrid">
          {skills.map((skill) => (
            <div className="skill" key={skill.title}>
              <div className="skillTop">
                <span className="skillGlyph" aria-hidden>
                  {skill.glyph}
                </span>
                <span className={`pill ${skill.pill}`}>{skill.pill}</span>
              </div>
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
            </div>
          ))}
        </div>

        <div className="divider" style={{ marginTop: 18 }}>
          <strong>Also familiar with</strong>
          <span>Solidity | Ethers.js | Docker | Tailwind | Vercel | Railway | MongoDB | PostgreSQL</span>
        </div>
      </section>

      <Projects />

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Link className="btn animated-button" href="/projects">
          <span className="text">See all projects</span>
          <span className="circle" aria-hidden />
        </Link>
      </div>

      <footer id="contact" className="anchor">
        <div className="end">
          <span className="sectionNum" aria-hidden>04</span>
          <h2>
            <span className="toneA">Have an idea?</span>
            <br />
            <span className="toneB">Let&apos;s ship it.</span>
          </h2>

          <p
            style={{
              margin: "10px auto 0",
              maxWidth: "70ch",
              color: "rgba(244,241,200,.55)",
              fontSize: 17,
              lineHeight: 1.55,
            }}
          >
            Whether it&apos;s a Web3 platform, a SaaS dashboard, a client site, or a
            full product from scratch - I handle the entire build. Based in
            Nigeria, available worldwide.
          </p>

          <div className="availBadge">
            <span className="availDot" />
            Currently available for new projects
          </div>

          <div className="ctaRow" style={{ marginTop: 18 }}>
            <button
              type="button"
              className="btn btnPrimary animated-button"
              onClick={() => openContactModal("email")}
            >
              <span className="text">Start a project</span>
              <span className="circle" aria-hidden />
            </button>
            <button
              type="button"
              className="btn animated-button"
              onClick={() => openContactModal("whatsapp")}
            >
              <span className="text">Message on WhatsApp</span>
              <span className="circle" aria-hidden />
            </button>
          </div>

          <div className="socialRow" style={{ marginTop: 28 }}>
            <a className="social" href="https://github.com/clintondcl" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a className="social" href="https://linkedin.com/in/clinton-developer" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a className="social" href="https://tiktok.com/@arrtdecoded" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
              </svg>
            </a>
          </div>

          <div className="copyright">
            &copy; {new Date().getFullYear()} Clinton | Full-stack &amp; Web3 Developer | Nigeria
          </div>
        </div>
      </footer>

      {contactModalOpen ? (
        <div className="contactModalOverlay" onClick={closeContactModal}>
          <div
            className="contactModal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="contactModalHeader">
              <h3>Drop me a message</h3>
              <button
                type="button"
                className="contactModalClose"
                onClick={closeContactModal}
                aria-label="Close"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
              </button>
            </div>

            <div className="contactChannelToggle">
              <button
                type="button"
                className={
                  "contactChannelBtn" +
                  (contactChannel === "email" ? " active" : "")
                }
                onClick={() => {
                  setContactChannel("email");
                  setContactNotice("");
                }}
              >
                Email
              </button>
              <button
                type="button"
                className={
                  "contactChannelBtn" +
                  (contactChannel === "whatsapp" ? " active" : "")
                }
                onClick={() => {
                  setContactChannel("whatsapp");
                  setContactNotice("");
                }}
              >
                WhatsApp
              </button>
            </div>

            <p className="contactHelper">{contactDestination}</p>

            <div className="contactModalBody">
              <label>
                <span>Message</span>
                <textarea
                  rows={4}
                  placeholder={
                    contactChannel === "email"
                      ? "Hi Clinton, I'd like to work with you on..."
                      : "Hi Clinton, I saw your portfolio and I'd like to talk about..."
                  }
                  value={contactMessage}
                  onChange={(event) => setContactMessage(event.target.value)}
                />
              </label>
            </div>

            {contactNotice ? (
              <p className="contactNotice" role="status">
                {contactNotice}
              </p>
            ) : null}

            <div className="contactModalActions">
              <button
                type="button"
                className="btn btnSm btnPrimary animated-button"
                onClick={handleSend}
              >
                <span className="text">
                  {contactChannel === "email"
                    ? "Send via email"
                    : "Send via WhatsApp"}
                </span>
                <span className="circle" aria-hidden />
              </button>
              <button
                type="button"
                className="btn btnSm"
                onClick={copyMessage}
              >
                <span className="text">Copy message</span>
                <span className="circle" aria-hidden />
              </button>
              <button
                type="button"
                className="btn btnSm"
                onClick={closeContactModal}
              >
                <span className="text">Cancel</span>
                <span className="circle" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
