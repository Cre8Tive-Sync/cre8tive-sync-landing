import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Values from "./Values";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { MISSION, STORY, PURPOSE, STATS, TEAM } from "../data/about";
import "./About.css";

/** Derive initials for the avatar fallback when a member has no photo. */
const initialsOf = (name: string): string =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const About: React.FC = () => {
  const [revealed, setRevealed] = useState(false);

  const storyRef = useScrollReveal<HTMLDivElement>();
  const purposeRef = useScrollReveal<HTMLDivElement>(0.1);
  const statsRef = useScrollReveal<HTMLDivElement>(0.1);
  const teamHeaderRef = useScrollReveal<HTMLDivElement>();
  const teamGridRef = useScrollReveal<HTMLDivElement>(0.1);
  const ctaRef = useScrollReveal<HTMLDivElement>(0.1);

  // Animate the hero in on mount (no loading screen on this route).
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="about-page">
      <Header instant />

      <main>
        {/* ===================== HERO ===================== */}
        <section className="about-hero">
          <div className={`about-hero__inner${revealed ? " about-hero__inner--revealed" : ""}`}>
            <p className="about-hero__eyebrow">About Cre8tive Sync</p>
            <h1 className="about-hero__title">We engineer what others imagine</h1>
            <p className="about-hero__subtitle">{MISSION}</p>
          </div>
        </section>

        {/* ===================== STORY ===================== */}
        <section className="about-story">
          <div ref={storyRef} className="about-story__inner scroll-reveal">
            <div className="about-story__heading">
              <span className="about-section__label">Our Story</span>
              <h2>From late-night builds to a studio with intent.</h2>
            </div>
            <div className="about-story__body">
              {STORY.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== MISSION / VISION ===================== */}
        <section className="about-purpose">
          <div ref={purposeRef} className="about-purpose__grid scroll-reveal-stagger">
            <article className="purpose-card">
              <h3>Mission</h3>
              <p>{PURPOSE.mission}</p>
            </article>
            <article className="purpose-card">
              <h3>Vision</h3>
              <p>{PURPOSE.vision}</p>
            </article>
          </div>
        </section>

        {/* ===================== STATS ===================== */}
        <section className="about-stats">
          <div ref={statsRef} className="about-stats__grid scroll-reveal-stagger">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-card">
                <span className="stat-card__value">{stat.value}</span>
                <span className="stat-card__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== VALUES (reused) ===================== */}
        <Values />

        {/* ===================== TEAM ===================== */}
        <section className="about-team">
          <div ref={teamHeaderRef} className="about-team__header scroll-reveal">
            <span className="about-section__label">The Team</span>
            <h2>Small by design, senior by default.</h2>
            <p>
              The people who plan your project are the same people who build it.
              No hand-offs, no diluted vision.
            </p>
          </div>

          <div ref={teamGridRef} className="about-team__grid scroll-reveal-stagger">
            {TEAM.map((member) => (
              <article key={member.name} className="team-card">
                <div className="team-card__avatar" aria-hidden="true">
                  {member.image ? (
                    <img src={member.image} alt={member.name} />
                  ) : (
                    <span>{initialsOf(member.name)}</span>
                  )}
                </div>
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
                <p className="team-card__bio">{member.bio}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ===================== CTA ===================== */}
        <section className="about-cta">
          <div ref={ctaRef} className="about-cta__inner scroll-reveal">
            <h2>Let's build something worth keeping.</h2>
            <p>
              Tell us where you're headed and we'll show you how we can get there
              together.
            </p>
            <div className="about-cta__actions">
              <Link to="/project-planning" className="about-btn about-btn--primary">
                Start a Project
              </Link>
              <Link to="/#projects" className="about-btn about-btn--secondary">
                See Our Work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
