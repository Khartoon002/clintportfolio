"use client";

import Image from "next/image";
import { useState } from "react";
import Projects from "@/components/projects";

type ContactChannel = "email" | "whatsapp";

const CONTACT_EMAIL = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "").trim();
const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(
  /\D/g,
  ""
);

const DEFAULT_CONTACT_MESSAGE =
  "Hi Clinton, I'd like to discuss a new project with you.";

const skills = [
  {
    glyph: "RE",
    title: "React",
    desc: "Component architecture, hooks, state management, and performance optimization.",
  },
  {
    glyph: "NX",
    title: "Next.js",
    desc: "SSR, SSG, App Router patterns, route design, and polished delivery.",
  },
  {
    glyph: "TS",
    title: "TypeScript",
    desc: "Safer refactors, clearer contracts, and reliable developer experience.",
  },
  {
    glyph: "ND",
    title: "Node.js",
    desc: "APIs, background tasks, middleware logic, and scalable server workflows.",
  },
  {
    glyph: "DB",
    title: "Databases",
    desc: "Schema design, ORM-driven workflows, indexing, and query optimization.",
  },
  {
    glyph: "UI",
    title: "UI Systems",
    desc: "Responsive layouts, animations, accessibility, and premium visual polish.",
  },
];

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
      setContactNotice("Copying failed on this device. You can still select the text manually.");
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
      <section id="home" className="hero anchor">
        <div className="heroInner">
          <div className="chipRow">
            <span className="chip">Full Stack</span>
            <span className="chip">React and Next.js</span>
            <span className="chip">Node.js APIs</span>
            <span className="chip">Premium UI and UX</span>
          </div>

          <h1
            className="heroTitle"
            aria-label="Full-stack craft, premium execution."
          >
            <span
              className="heroTitleLine line1"
              data-text="Full-stack craft,"
            >
              <span className="fill">Full-stack craft,</span>
              <span className="shine" aria-hidden />
            </span>
            <br />
            <span
              className="heroTitleLine line2"
              data-text="Premium execution."
            >
              <span className="fill">Premium execution.</span>
              <span className="shine" aria-hidden />
            </span>
          </h1>

          <p className="sub">
            I&apos;m{" "}
            <span style={{ color: "var(--yellow)", fontWeight: 700 }}>
              Clinton
            </span>{" "}
            - a full-stack developer who builds production-ready web applications
            with clean architecture, scalable backends, and interfaces that feel
            expensive. From database to deployment, I deliver end-to-end solutions
            that perform under pressure.
          </p>

          <div className="heroPortrait">
            <Image
              src="/assets/profilepic.jpeg"
              alt="Clinton's portrait"
              width={1080}
              height={1080}
              priority
              sizes="(max-width: 768px) 78vw, 360px"
            />
          </div>

          <div className="heroBadges">
            <span className="badge">Type-safe APIs</span>
            <span className="badge">Optimized queries</span>
            <span className="badge">Scalable architecture</span>
            <span className="badge">Premium frontends</span>
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

          <div className="divider" style={{ marginTop: 22 }}>
            <strong>What sets me apart</strong>
            <span>
              Backend logic • Frontend polish • Database optimization •
              Production-ready code
            </span>
          </div>
        </div>
      </section>

      <section id="about" className="anchor">
        <div className="sectionHead">
          <h2>
            <span className="toneA">Full-stack developer,</span>
            <br />
            <span className="toneB">clear solutions.</span>
          </h2>
          <p>
            I build complete web applications from RESTful APIs and database
            schemas to responsive frontends with premium interactions. Backend to
            UI, I handle the whole product flow.
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
            My approach is simple: architect the data layer, build dependable APIs,
            craft polished interfaces, and ship with confidence. The goal is
            maintainable software that scales with the business behind it.
          </p>
        </div>

        <div className="divider" style={{ marginTop: 16 }}>
          <strong>My commitment</strong>
          <span>
            Clean code • Fast queries • Smooth UX • Scalable infrastructure
          </span>
        </div>
      </section>

      <section id="skills" className="anchor">
        <div className="sectionHead">
          <h2>
            <span className="toneA">The stack,</span>
            <br />
            <span className="toneB">I ship with.</span>
          </h2>
          <p>Modern tools, production-grade thinking, and clean implementation.</p>
        </div>

        <div className="skillsGrid">
          {skills.map((skill) => (
            <div className="skill" key={skill.title}>
              <div className="skillTop">
                <span className="skillGlyph" aria-hidden>
                  {skill.glyph}
                </span>
                <span className="pill">core</span>
              </div>
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
            </div>
          ))}
        </div>

        <div className="divider" style={{ marginTop: 18 }}>
          <strong>Additional capabilities</strong>
          <span>
            PostgreSQL • MongoDB • Tailwind • Docker • Vercel and Railway
            deployment
          </span>
        </div>
      </section>

      <Projects />

      <footer id="contact" className="anchor">
        <div className="end">
          <h2>
            <span className="toneA">Let&apos;s build your next</span>
            <br />
            <span className="toneB">web application.</span>
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
            Whether you need a custom SaaS platform, an e-commerce solution, or a
            data-driven dashboard, I handle everything from database design and API
            development to polished frontends and production deployment.
          </p>

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

          <div className="copyright">
            &copy; {new Date().getFullYear()} Clinton. Full-stack developer.
            Premium craft.
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
              <h3>Let&apos;s Work</h3>
              <button
                type="button"
                className="contactModalClose"
                onClick={closeContactModal}
                aria-label="Close"
              >
                x
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
