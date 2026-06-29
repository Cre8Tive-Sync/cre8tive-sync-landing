import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import BlackholeBackground from "./BlackholeBackground";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { PROJECTS, PROJECT_CATEGORIES } from "../data/projects";
import "./Portfolio.css";

type Filter = "All" | (typeof PROJECT_CATEGORIES)[number];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const headerRef = useScrollReveal<HTMLDivElement>();

  const filters: Filter[] = ["All", ...PROJECT_CATEGORIES];

  const visible = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <>
      <BlackholeBackground started />
      <Header instant />

      <main className="portfolio-page">
        <div className="portfolio-page__container">
          <div ref={headerRef} className="portfolio-page__header scroll-reveal">
            <p className="portfolio-page__eyebrow">Our Work</p>
            <h1 className="portfolio-page__title">Portfolio</h1>
            <p className="portfolio-page__subtitle">
              A selection of products, platforms, and brands we've engineered —
              built with precision, intent, and long-term performance in mind.
            </p>
          </div>

          <div className="portfolio-filter" role="tablist" aria-label="Filter projects by category">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={`portfolio-filter__btn${filter === f ? " portfolio-filter__btn--active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* key forces a fresh stagger animation each time the filter changes */}
          <div key={filter} className="portfolio-grid">
            {visible.map((project, index) => (
              <Link
                key={project.slug}
                to={`/portfolio/${project.slug}`}
                className="portfolio-card"
                style={{
                  // staggered entrance, plus accent for the glow on hover
                  animationDelay: `${index * 0.08}s`,
                  ["--accent" as string]: project.accent,
                }}
              >
                <div className="portfolio-card__media" aria-hidden="true">
                  <span className="portfolio-card__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="portfolio-card__category">{project.category}</span>
                </div>

                <div className="portfolio-card__body">
                  <div className="portfolio-card__top">
                    <h2 className="portfolio-card__name">{project.name}</h2>
                    <ArrowUpRight className="portfolio-card__arrow" />
                  </div>
                  <p className="portfolio-card__tagline">{project.tagline}</p>
                  <div className="portfolio-card__tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="portfolio-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="portfolio-page__cta">
            <p>Have a project in mind?</p>
            <Link to="/#contact" className="portfolio-page__cta-btn">Start a Project</Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Portfolio;
