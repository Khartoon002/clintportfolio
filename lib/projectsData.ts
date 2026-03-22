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
    slug: "saas-dashboard",
    title: "SaaS Dashboard",
    desc: "A product-style analytics workspace with reporting, billing views, and team-aware navigation.",
    summary:
      "This dashboard focuses on clarity and speed, giving operators a single place to review growth metrics, inspect accounts, and move between high-value actions without friction.",
    imageUrl: "/assets/project1.jpg",
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL"],
    highlights: [
      "Role-based screens for founders, operators, and support teams",
      "Responsive layout tuned for desktop review and mobile check-ins",
      "Reusable modules ready for future billing, customer, and insights areas",
    ],
    duration: "3 weeks",
    role: "Full-stack build",
    year: "2026",
  },
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    desc: "A polished storefront experience with curated merchandising, checkout flows, and admin-ready structure.",
    summary:
      "This build is designed around trust and conversion, pairing a premium shopping surface with clean product storytelling, inventory-minded architecture, and room for payment integrations.",
    imageUrl: "/assets/project2.jpg",
    stack: ["Next.js", "React", "Node.js", "MongoDB", "Stripe"],
    highlights: [
      "Conversion-focused product presentation and browsing flow",
      "Admin-ready foundations for catalog, orders, and inventory updates",
      "Flexible structure for future payments, promos, and customer accounts",
    ],
    duration: "2 weeks",
    role: "Commerce system",
    year: "2026",
  },
];

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return projects.find((project) => project.slug === slug);
}
