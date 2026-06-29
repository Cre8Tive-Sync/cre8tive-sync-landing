import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { PROJECTS } from "../data/projects";
import "./Projects.css";

const Projects: React.FC = () => {
    const headerRef = useScrollReveal<HTMLDivElement>();
    const gridRef = useScrollReveal<HTMLDivElement>(0.1);

    return (
        <section id="projects" className="projects">
            <div className="projects__container">
                <div ref={headerRef} className="projects__header scroll-reveal">
                    <h2 className="projects__title">Featured Projects</h2>
                    <p className="projects__subtitle">
                        Explore our portfolio of cutting-edge solutions built with precision and innovation
                    </p>
                </div>

                <div ref={gridRef} className="projects__grid scroll-reveal-stagger">
                    {PROJECTS.map((project, index) => (
                        <Link
                            key={project.slug}
                            to={`/portfolio/${project.slug}`}
                            className="project-card"
                            style={{ ["--accent" as string]: project.accent }}
                        >
                            <div className="project-card__arrow" aria-hidden="true">
                                <ArrowUpRight />
                            </div>
                            <div className="project-card__number">
                                {String(index + 1).padStart(2, "0")}
                            </div>
                            <h3 className="project-card__name">{project.name}</h3>
                            <p className="project-card__tagline">{project.tagline}</p>
                            <div className="project-card__tags">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="project-card__tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="projects__cta">
                    <Link to="/portfolio" className="projects__cta-btn">
                        View Full Portfolio <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Projects;
