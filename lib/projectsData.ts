export type ProjectMeta = {
  slug: string;
  title: string;
  desc: string;
  summary: string;
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  stack: string[];
  highlights: string[];
  duration: string;
  role: string;
  year: string;
};

export const projects: ProjectMeta[] = [
  {
    slug: "xoi-nft-dashboard",
    title: "Xoi — NFT & Crypto Dashboard",
    desc: "A full Web3 platform with NFT trading UI, crypto portfolio tracking, a node-based drag-and-drop editor, and a real-time chat interface.",
    summary:
      "Xoi is a multi-surface Web3 product built across four interconnected templates — dashboard, landing page, chat UI, and a visual node editor. The design system uses Syne and DM Sans with a purple/cyan/gold accent palette for a premium crypto-native feel.",
    imageUrl: "/assets/project1.jpg",
    liveUrl: undefined,
    stack: ["Next.js", "React", "TypeScript", "Ethers.js", "Web3", "Tailwind"],
    highlights: [
      "Drag-and-drop visual node editor for on-chain logic flows",
      "Real-time chat UI with Web3 wallet-aware sessions",
      "NFT portfolio dashboard with live price tracking",
    ],
    duration: "4 weeks",
    role: "Full Web3 build",
    year: "2025",
  },
  {
    slug: "magnus-skill-mart",
    title: "Magnus Skill Mart",
    desc: "An NFT-inspired Web3 marketplace for skills and digital services, with wallet integration, mobile-responsive design, and a premium dark UI.",
    summary:
      "Magnus Skill Mart merges the aesthetics of NFT marketplaces with a practical skills trading platform. Built for magnus-skills-mart.com with full Web3 wallet connection, responsive layouts, and a bold visual identity.",
    imageUrl: "/assets/project2.jpg",
    liveUrl: "https://magnus-skills-mart.com",
    stack: ["HTML", "CSS", "JavaScript", "Web3.js", "Wallet Connect"],
    highlights: [
      "Web3 wallet connection and on-chain skill verification",
      "NFT-style skill card marketplace with filtering",
      "Full mobile responsiveness across all breakpoints",
    ],
    duration: "2 weeks",
    role: "Web3 frontend",
    year: "2025",
  },
  {
    slug: "glamour-platform",
    title: "Glamour — African Lifestyle Platform",
    desc: "A full rebrand and rebuild of Stream Africa into Glamour — a monetisation platform targeting African lifestyle creators with multi-country payment support.",
    summary:
      "Glamour is a creator monetisation platform for African lifestyle content. Rebuilt from scratch with a gold/dark-gold brand palette, Paystack and multi-country payment integration, and content-first layouts designed for the African market.",
    imageUrl: "/assets/project1.jpg",
    liveUrl: undefined,
    stack: ["Next.js", "React", "Paystack", "Node.js", "MongoDB"],
    highlights: [
      "Multi-country African payment integration via Paystack",
      "Creator monetisation flows with subscription and tip models",
      "Full rebrand from Stream Africa — new identity, palette, and copy",
    ],
    duration: "3 weeks",
    role: "Full-stack rebuild",
    year: "2025",
  },
  {
    slug: "chatmeo",
    title: "Chatmeo — Flow-Driven Chatbot Platform",
    desc: "A SaaS chatbot builder with a visual Logic Flow Studio, session-aware conversation tracking, and embeddable widget delivery.",
    summary:
      "Chatmeo lets businesses build and deploy chatbots using a node-based visual flow editor. Built with session state tracking to prevent message repetition bugs, and a clean operator dashboard for managing flows and analytics.",
    imageUrl: "/assets/project2.jpg",
    liveUrl: undefined,
    stack: ["React", "Node.js", "TypeScript", "PostgreSQL", "WebSockets"],
    highlights: [
      "Visual Logic Flow Studio with drag-and-drop node editor",
      "Session state tracking to prevent repeated welcome messages",
      "Embeddable widget system for third-party site deployment",
    ],
    duration: "5 weeks",
    role: "SaaS product build",
    year: "2025",
  },
];

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projects.find((project) => project.slug === slug);
}
