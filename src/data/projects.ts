// =============================================================================
// PROJECT DATA — single source of truth for the portfolio.
//
// The landing "Featured Projects" section, the /portfolio index, and each
// /portfolio/:slug detail page all read from this list. To add or edit a
// project, change it here only — everything else updates automatically.
//
// Copy is written as believable placeholder content; swap in the real details,
// links, and (optionally) image URLs as they become available.
// =============================================================================

export type ProjectCategory =
  | "Web"
  | "Mobile"
  | "AI"
  | "Automation"
  | "Branding";

export interface ProjectStat {
  /** Big number, e.g. "3x" or "98%". */
  value: string;
  /** Short label under the number. */
  label: string;
}

export interface Project {
  /** URL segment — /portfolio/<slug>. Keep kebab-case and unique. */
  slug: string;
  name: string;
  /** One-line hook shown on cards. */
  tagline: string;
  /** 1–2 sentence summary for the detail hero. */
  summary: string;
  category: ProjectCategory;
  tags: string[];
  year: string;
  /** What Cre8tive Sync did on the engagement. */
  role: string;
  /** Client / who it was built for. */
  client: string;
  /** Rough engagement length. */
  timeline: string;
  /** Accent colour used for gradients & highlights on the detail page. */
  accent: string;
  /** Outbound link to the live product (use "#" if none yet). */
  link: string;
  /** Narrative: the problem. */
  challenge: string;
  /** Narrative: how we solved it. */
  solution: string;
  /** Headline outcomes. */
  results: ProjectStat[];
  /** Bullet list of notable features / deliverables. */
  highlights: string[];
  /** Tech used. */
  techStack: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "oxilia",
    name: "Oxilia",
    tagline: "A unified care platform connecting patients with the right help, faster.",
    summary:
      "Oxilia is a healthcare coordination platform that turns fragmented patient intake into a single, guided flow — matching people to services and surfacing the information clinicians actually need.",
    category: "Web",
    tags: ["Web", "Design", "Healthcare"],
    year: "2025",
    role: "Product Design & Full-Stack Engineering",
    client: "Oxilia Health",
    timeline: "14 weeks",
    accent: "#4f9dff",
    link: "#",
    challenge:
      "Patients dropped off during a 30-field intake form, and care teams pieced together records from email, spreadsheets, and phone calls. Nothing talked to anything else.",
    solution:
      "We rebuilt intake as an adaptive, multi-step flow that only asks what's relevant, then routed each submission into a real-time dashboard with smart triage. A shared record became the backbone everyone worked from.",
    results: [
      { value: "62%", label: "Higher intake completion" },
      { value: "3x", label: "Faster triage" },
      { value: "−40%", label: "Admin time per case" },
    ],
    highlights: [
      "Adaptive multi-step intake with conditional logic",
      "Real-time triage dashboard for care teams",
      "Role-based access for clinicians and admins",
      "Accessible, WCAG-conscious component library",
    ],
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind"],
  },
  {
    slug: "aicore",
    name: "AiCore",
    tagline: "An AI platform that turns a company's documents into answers, not searches.",
    summary:
      "AiCore is a retrieval-augmented assistant layer that sits on top of an organisation's knowledge base, delivering cited, trustworthy answers instead of a wall of search results.",
    category: "AI",
    tags: ["AI", "Platform", "RAG"],
    year: "2025",
    role: "AI Engineering & Platform Architecture",
    client: "Internal R&D",
    timeline: "20 weeks",
    accent: "#a06bff",
    link: "#",
    challenge:
      "Teams were losing hours hunting through scattered docs, and off-the-shelf chatbots hallucinated confidently with no way to verify a claim.",
    solution:
      "We built a grounded retrieval pipeline — chunking, embeddings, and a reranking layer — wired to a streaming assistant that always cites its sources, so every answer is traceable back to a document.",
    results: [
      { value: "92%", label: "Answer accuracy" },
      { value: "5x", label: "Faster knowledge lookup" },
      { value: "100%", label: "Cited responses" },
    ],
    highlights: [
      "Retrieval-augmented generation with source citations",
      "Streaming responses with confidence signals",
      "Pluggable connectors for existing document stores",
      "Usage analytics and feedback loop for tuning",
    ],
    techStack: ["Python", "TypeScript", "Vector DB", "React", "LLM APIs"],
  },
  {
    slug: "kwento-kard",
    name: "Kwento Kard",
    tagline: "Interactive story cards that make early literacy feel like play.",
    summary:
      "Kwento Kard is a mobile product pairing physical story cards with an app, turning reading practice into a guided, gamified experience for young learners and their parents.",
    category: "Mobile",
    tags: ["Mobile", "Product", "EdTech"],
    year: "2024",
    role: "Mobile Product Design & Development",
    client: "Kwento Kard",
    timeline: "12 weeks",
    accent: "#ff8a5b",
    link: "#",
    challenge:
      "Parents wanted screen time to be meaningful, and educators needed a way to keep kids engaged with reading beyond the classroom.",
    solution:
      "We designed a card-scanning experience that unlocks animated, narrated stories with comprehension prompts and progress tracking — bridging the tactile and the digital.",
    results: [
      { value: "4.8★", label: "Average app rating" },
      { value: "2.5x", label: "Reading session length" },
      { value: "85%", label: "Weekly retention" },
    ],
    highlights: [
      "Card scanning to unlock interactive stories",
      "Narrated, animated reading experiences",
      "Comprehension prompts and progress tracking",
      "Parent dashboard with milestones",
    ],
    techStack: ["React Native", "TypeScript", "Firebase", "Expo"],
  },
  {
    slug: "webmocap",
    name: "WebMocap",
    tagline: "Markerless motion capture that runs in the browser — no suit required.",
    summary:
      "WebMocap brings real-time body and motion tracking to the web using just a webcam, making capture accessible for creators, animators, and interactive experiences.",
    category: "Web",
    tags: ["Web", "Motion", "Computer Vision"],
    year: "2025",
    role: "Computer Vision & Web Engineering",
    client: "Internal R&D",
    timeline: "16 weeks",
    accent: "#3fd6c2",
    link: "#",
    challenge:
      "Traditional motion capture needs expensive hardware, dedicated studios, and a steep learning curve — out of reach for most independent creators.",
    solution:
      "We built a browser-native pipeline that estimates pose from a single camera in real time, streams clean skeletal data, and exports to standard animation formats.",
    results: [
      { value: "60fps", label: "Real-time tracking" },
      { value: "0", label: "Hardware required" },
      { value: "33", label: "Tracked keypoints" },
    ],
    highlights: [
      "Markerless pose estimation from a single webcam",
      "Real-time skeletal data streaming",
      "Export to common animation formats",
      "Runs entirely client-side for privacy",
    ],
    techStack: ["TypeScript", "WebGL", "TensorFlow.js", "Three.js"],
  },
  {
    slug: "systemize-solutions",
    name: "Systemize Solutions",
    tagline: "Custom automation that quietly removes the busywork from operations.",
    summary:
      "Systemize Solutions is a tailored automation suite that connects the tools a business already uses, eliminating repetitive manual work and human error across operations.",
    category: "Automation",
    tags: ["Automation", "Software", "Operations"],
    year: "2024",
    role: "Automation Engineering & Integration",
    client: "Systemize Solutions",
    timeline: "10 weeks",
    accent: "#ffd166",
    link: "#",
    challenge:
      "Staff spent entire afternoons copying data between systems, reconciling reports, and chasing approvals — slow, costly, and error-prone.",
    solution:
      "We mapped the highest-friction workflows and replaced them with event-driven automations, complete with audit logs and a control panel for non-technical staff.",
    results: [
      { value: "120h", label: "Saved per month" },
      { value: "−90%", label: "Manual data entry" },
      { value: "99.9%", label: "Process reliability" },
    ],
    highlights: [
      "Event-driven workflow automation",
      "Two-way integrations across existing tools",
      "Audit logging and error alerting",
      "No-code control panel for operators",
    ],
    techStack: ["Node.js", "TypeScript", "Webhooks", "REST APIs", "PostgreSQL"],
  },
  {
    slug: "ggt",
    name: "GGT",
    tagline: "A bold brand identity and web presence built to scale with ambition.",
    summary:
      "GGT is a complete branding and web engagement — from identity system to a fast, modern marketing site — giving an emerging company a presence that matches its ambition.",
    category: "Branding",
    tags: ["Branding", "Web", "Identity"],
    year: "2024",
    role: "Brand Identity & Web Development",
    client: "GGT",
    timeline: "8 weeks",
    accent: "#ff6b9d",
    link: "#",
    challenge:
      "GGT had a strong offering but an inconsistent, dated visual presence that undersold the business and confused prospective clients.",
    solution:
      "We crafted a cohesive identity system — logo, palette, typography, and voice — and shipped a performant marketing site that tells the story clearly and converts.",
    results: [
      { value: "2.4x", label: "Site conversion" },
      { value: "<1s", label: "Load time" },
      { value: "100", label: "Lighthouse score" },
    ],
    highlights: [
      "Complete visual identity system",
      "Reusable brand and component guidelines",
      "High-performance marketing site",
      "Conversion-focused content structure",
    ],
    techStack: ["React", "Vite", "Tailwind", "Figma"],
  },
];

/** Look up a single project by its slug. */
export function getProject(slug: string | undefined): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Get the next project in the list (wraps around) for detail-page navigation. */
export function getNextProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

/** Distinct categories present in the data, for the portfolio filter. */
export const PROJECT_CATEGORIES: ProjectCategory[] = Array.from(
  new Set(PROJECTS.map((p) => p.category))
);
