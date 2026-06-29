import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import BlackholeBackground from "./BlackholeBackground";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { getProject, getNextProject } from "../data/projects";
import "./ProjectDetail.css";

const NotFound: React.FC = () => (
  <>
    <BlackholeBackground started />
    <Header instant />
    <main className="project-detail project-detail--missing">
      <div className="project-detail__container">
        <h1 className="project-detail__title">Project not found</h1>
        <p className="project-detail__lead">
          The project you're looking for doesn't exist or has moved.
        </p>
        <Link to="/portfolio" className="project-detail__back">
          <ArrowLeft size={18} /> Back to Portfolio
        </Link>
      </div>
    </main>
    <Footer />
  </>
);

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);

  const overviewRef = useScrollReveal<HTMLDivElement>(0.1);
  const storyRef = useScrollReveal<HTMLDivElement>(0.1);
  const resultsRef = useScrollReveal<HTMLDivElement>(0.1);
  const highlightsRef = useScrollReveal<HTMLDivElement>(0.1);

  if (!project) return <NotFound />;

  const next = getNextProject(project.slug);
  const accentStyle = { ["--accent" as string]: project.accent };

  return (
    <>
      <BlackholeBackground started />
      <Header instant />

      <main className="project-detail" style={accentStyle}>
        <div className="project-detail__container">
          <Link to="/portfolio" className="project-detail__back">
            <ArrowLeft size={18} /> Back to Portfolio
          </Link>

          {/* ---- Hero ---- */}
          <header className="project-detail__hero">
            <span className="project-detail__category">{project.category}</span>
            <h1 className="project-detail__title">{project.name}</h1>
            <p className="project-detail__lead">{project.summary}</p>

            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail__visit"
              >
                Visit Project <ArrowUpRight size={18} />
              </a>
            )}
          </header>

          {/* Accent banner standing in for a hero image */}
          <div className="project-detail__banner" aria-hidden="true">
            <span className="project-detail__banner-name">{project.name}</span>
          </div>

          {/* ---- Overview / meta ---- */}
          <section ref={overviewRef} className="project-detail__overview scroll-reveal">
            <dl className="project-meta">
              <div className="project-meta__item">
                <dt>Client</dt>
                <dd>{project.client}</dd>
              </div>
              <div className="project-meta__item">
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div className="project-meta__item">
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div className="project-meta__item">
                <dt>Timeline</dt>
                <dd>{project.timeline}</dd>
              </div>
            </dl>

            <div className="project-tech">
              <h3 className="project-tech__heading">Tech Stack</h3>
              <div className="project-tech__list">
                {project.techStack.map((t) => (
                  <span key={t} className="project-tech__tag">{t}</span>
                ))}
              </div>
            </div>
          </section>

          {/* ---- Challenge & Solution ---- */}
          <section ref={storyRef} className="project-detail__story scroll-reveal">
            <div className="project-story__col">
              <h2 className="project-story__heading">The Challenge</h2>
              <p className="project-story__body">{project.challenge}</p>
            </div>
            <div className="project-story__col">
              <h2 className="project-story__heading">Our Solution</h2>
              <p className="project-story__body">{project.solution}</p>
            </div>
          </section>

          {/* ---- Results ---- */}
          <section ref={resultsRef} className="project-detail__results scroll-reveal">
            <h2 className="project-section__heading">Results</h2>
            <div className="project-stats">
              {project.results.map((stat) => (
                <div key={stat.label} className="project-stat">
                  <span className="project-stat__value">{stat.value}</span>
                  <span className="project-stat__label">{stat.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ---- Highlights ---- */}
          <section ref={highlightsRef} className="project-detail__highlights scroll-reveal">
            <h2 className="project-section__heading">What We Built</h2>
            <ul className="project-highlights">
              {project.highlights.map((h) => (
                <li key={h} className="project-highlight">
                  <span className="project-highlight__icon"><Check size={16} /></span>
                  {h}
                </li>
              ))}
            </ul>
          </section>

          {/* ---- Next project ---- */}
          <Link
            to={`/portfolio/${next.slug}`}
            className="project-next"
            style={{ ["--accent" as string]: next.accent }}
          >
            <div>
              <span className="project-next__label">Next Project</span>
              <span className="project-next__name">{next.name}</span>
            </div>
            <ArrowRight className="project-next__arrow" />
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProjectDetail;
