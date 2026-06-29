// =============================================================================
// ABOUT DATA — single source of truth for the /about page.
//
// The About page (story, stats, team) reads from this file only. To edit the
// company narrative, headline numbers, or team roster, change it here.
//
// Copy is written as believable placeholder content; swap in the real details,
// photos, and links as they become available.
// =============================================================================

export interface Stat {
  /** Big number, e.g. "20+" or "2024". */
  value: string;
  /** Short label under the number. */
  label: string;
}

export interface TeamMember {
  name: string;
  role: string;
  /** 1–2 sentence bio shown on the card. */
  bio: string;
  /** Optional photo in /public. Falls back to initials when omitted. */
  image?: string;
}

/** Top-of-page mission statement. */
export const MISSION =
  "Bridging imagination, technology, and the future — one innovation at a time.";

/** Story paragraphs rendered in order in the narrative section. */
export const STORY: string[] = [
  "Cre8tive Sync was founded in 2024 by a small team of engineers and designers who believed that great software should feel as considered as it is capable. What began as late-night side projects quickly grew into a studio building custom software, autonomous AI, and immersive AR for clients who care about the details.",
  "We work at the intersection of engineering precision and creative intent. Every product we ship is built to perform years from now, not just on launch day — architected cleanly, designed deliberately, and tested against the real world.",
  "Today we partner with founders, teams, and institutions to turn ambitious ideas into platforms people actually want to use. We stay small on purpose, so the people who plan your project are the same people who build it.",
];

/** Mission / vision pair shown side by side. */
export const PURPOSE = {
  mission:
    "To engineer software, AI, and AR experiences with precision and intent — building digital products that endure and quietly raise the standard for what teams expect from technology.",
  vision:
    "A future where creativity and engineering move in sync, and where every organization — no matter its size — has access to technology built with genuine craft.",
};

/** Headline numbers. Adjust to reflect real figures. */
export const STATS: Stat[] = [
  { value: "2024", label: "Founded" },
  { value: "20+", label: "Projects Delivered" },
  { value: "15+", label: "Clients & Partners" },
  { value: "3", label: "Industry Awards" },
];

/** Team roster. Replace names, roles, bios, and add /public photos. */
export const TEAM: TeamMember[] = [
  {
    name: "Founder & CEO",
    role: "Strategy & Vision",
    bio: "Sets the direction of the studio and keeps every engagement anchored to outcomes that matter for clients.",
  },
  {
    name: "CTO",
    role: "Engineering & Architecture",
    bio: "Owns the technical backbone — from system design to code quality — so what we build stays fast and maintainable.",
  },
  {
    name: "Head of AI",
    role: "Autonomous Systems",
    bio: "Leads our machine learning and automation work, turning models and pipelines into reliable, production-ready features.",
  },
  {
    name: "Creative / AR Lead",
    role: "Design & Immersive",
    bio: "Shapes how our products look, feel, and move — including the immersive AR experiences we're known for.",
  },
];
