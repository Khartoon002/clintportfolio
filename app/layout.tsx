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
          "en-NG": "/",
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
        alt: "Clinton, web developer in Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [socialImage],
  },
  other: {
    "geo.region": "NG",
    "geo.placename": siteConfig.countryName,
    "target-country": siteConfig.countryName,
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
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

            <Link href="/projects" className="navBtn" aria-label="Projects">
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
      </body>
    </html>
  );
}
