import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();
const socialImage = absoluteUrl(siteConfig.socialImage) ?? siteConfig.socialImage;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/assets/clintdoesdev.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.siteName,
  referrer: "origin-when-cross-origin",
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.developerName }],
  creator: siteConfig.developerName,
  publisher: siteConfig.siteName,
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: siteUrl
    ? {
        canonical: "/",
        languages: {
          en: "/",
        },
      }
    : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteUrl,
    siteName: siteConfig.siteName,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [
      {
        url: socialImage,
        width: 1080,
        height: 1080,
        alt: "Clinton, full-stack web developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteConfig.language}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <div className="scrollBar" id="scrollBar" />
        <div className="cursorGlow" id="cursorGlow" aria-hidden />
        <div className="bgStage">
          <div className="bgGlass" />
        </div>
        <div className="bgRipples" id="bgRipples" aria-hidden />
        <div className="bg-loader" aria-hidden>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="box" />
          ))}
        </div>
        <div className="grain" />

        <div className="navWrap">
          <nav className="nav" aria-label="Floating navigation">
            <Link href="/" className="navBrand" aria-label="Clinton - home">
              C
            </Link>

            <Link href="/" className="navBtn" aria-label="Home">
              <span className="tip">Home</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5z" />
              </svg>
            </Link>

            <Link href="/#about" className="navBtn" aria-label="About">
              <span className="tip">About</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5z" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            </Link>

            <Link href="/#skills" className="navBtn" aria-label="Skills">
              <span className="tip">Skills</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 7h10v10H7z" />
                <path d="M4 4h4M16 4h4M4 20h4M16 20h4" />
              </svg>
            </Link>

            <Link href="/#projects" className="navBtn" aria-label="Projects">
              <span className="tip">Projects</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 7h18v14H3z" />
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </Link>

            <Link href="/#contact" className="navBtn" aria-label="Contact">
              <span className="tip">Contact</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16v16H4z" />
                <path d="M4 8h16" />
                <path d="M8 4v4" />
              </svg>
            </Link>
          </nav>
        </div>

        <div className="frame">
          <main>{children}</main>
        </div>

        <Script id="hero-load" strategy="afterInteractive">
          {`document.body.classList.add("loaded")`}
        </Script>
        <Script id="scroll-progress-bar" strategy="afterInteractive">
          {`const bar = document.getElementById('scrollBar');
if (bar) {
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}`}
        </Script>
        <Script id="reveal-observer" strategy="afterInteractive">
          {`const targets = document.querySelectorAll(
  '.sectionHead, .skill, .proj, .panel, .statCard, .divider, .tiktokSection, .statsGrid'
);
targets.forEach((el, i) => {
  el.classList.add('reveal');
  const delay = i % 4;
  if (delay > 0) el.classList.add('reveal-delay-' + delay);
});
const io = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
  { threshold: 0.12 }
);
targets.forEach(el => io.observe(el));`}
        </Script>
        <Script id="cursor-glow" strategy="afterInteractive">
          {`const glow = document.getElementById('cursorGlow');
if (glow && window.matchMedia('(pointer: fine)').matches) {
  let rx = window.innerWidth / 2, ry = window.innerHeight / 2;
  let cx = rx, cy = ry;
  window.addEventListener('mousemove', e => { rx = e.clientX; ry = e.clientY; }, { passive: true });
  const tick = () => {
    cx += (rx - cx) * 0.07;
    cy += (ry - cy) * 0.07;
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    requestAnimationFrame(tick);
  };
  tick();
}`}
        </Script>
        <Script id="nav-scroll" strategy="afterInteractive">
          {`const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}`}
        </Script>
        <Script id="skill-tilt" strategy="afterInteractive">
          {`document.querySelectorAll('.skill').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = \`perspective(600px) rotateY(\${x * 8}deg) rotateX(\${-y * 8}deg) translateY(-2px)\`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});`}
        </Script>
        <Script id="nav-active" strategy="afterInteractive">
          {`const sections = document.querySelectorAll('section[id], footer[id]');
const navBtns = document.querySelectorAll('.navBtn');
const io2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navBtns.forEach(btn => {
        const href = btn.getAttribute('href') || '';
        btn.classList.toggle('active', href.endsWith('#' + entry.target.id));
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => io2.observe(s));`}
        </Script>
      </body>
    </html>
  );
}

