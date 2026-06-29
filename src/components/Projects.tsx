import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Projects.css";

// Edit project details here — descriptions, tags and links are placeholders.
const PROJECTS = [
    {
        name: "Oxilia",
        tagline: "Add a short description of the Oxilia project.",
        tags: ["Web", "Design"],
        link: "#"
    },
    {
        name: "AiCore",
        tagline: "Add a short description of the AiCore project.",
        tags: ["AI", "Platform"],
        link: "#"
    },
    {
        name: "Kwento Kard",
        tagline: "Add a short description of the Kwento Kard project.",
        tags: ["Mobile", "Product"],
        link: "#"
    },
    {
        name: "WebMocap",
        tagline: "Add a short description of the WebMocap project.",
        tags: ["Web", "Motion"],
        link: "#"
    },
    {
        name: "Systemize Solutions",
        tagline: "Add a short description of the Systemize Solutions project.",
        tags: ["Automation", "Software"],
        link: "#"
    },
    {
        name: "GGT",
        tagline: "Add a short description of the GGT project.",
        tags: ["Branding", "Web"],
        link: "#"
    }
];

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
                        <a
                            key={project.name}
                            href={project.link}
                            className="project-card"
                            target={project.link.startsWith("http") ? "_blank" : undefined}
                            rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
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
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
