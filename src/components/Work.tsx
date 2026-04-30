import { useMemo, useState } from "react";
import { projects } from "../data/portfolioData";
import "./styles/Work.css";

const liveProjects = projects.filter((project) => project.live);
const resumeProjects = projects.filter((project) => !project.live);

const Work = () => {
  const [activeTitle, setActiveTitle] = useState(liveProjects[0]?.title ?? "");

  const activeProject = useMemo(
    () => liveProjects.find((project) => project.title === activeTitle) ?? liveProjects[0],
    [activeTitle]
  );

  if (!activeProject) return null;

  return (
    <section className="work-section section-container" id="work">
      <div className="work-heading">
        <p>Personal Projects</p>
        <h2>
          Live products you can <span>open</span>, inspect,
          <br /> and understand quickly.
        </h2>
      </div>

      <div className="project-theater">
        <div className="theater-copy">
          <span>Live Product Theater</span>
          <h3>{activeProject.title}</h3>
          <p>{activeProject.summary}</p>
          <div className="theater-tags">
            {activeProject.stack.slice(0, 8).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="theater-actions">
            {activeProject.live && (
              <a href={activeProject.live} target="_blank" data-cursor="disable">
                Open Live
              </a>
            )}
            {activeProject.github && (
              <a href={activeProject.github} target="_blank" data-cursor="disable">
                GitHub
              </a>
            )}
          </div>
        </div>

        <div className="theater-stage">
          <div className="browser-bar">
            <div className="browser-dots">
              <span />
              <span />
              <span />
            </div>
            <div className="browser-url">
              {activeProject.live?.replace("https://", "").replace("/", "")}
            </div>
          </div>
          <div className="browser-screen">
            <img src={activeProject.image} alt={`${activeProject.title} preview`} />
            <iframe
              src={activeProject.live}
              title={`${activeProject.title} live preview`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
          <div className="project-switcher">
            {liveProjects.map((project) => (
              <button
                type="button"
                className={project.title === activeProject.title ? "active" : ""}
                onClick={() => setActiveTitle(project.title)}
                key={project.title}
              >
                {project.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="project-card-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-body">
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <ul>
                {project.points.slice(0, 3).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="project-tags">
                {project.stack.slice(0, 7).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="project-actions">
                {project.live && (
                  <a href={project.live} target="_blank" data-cursor="disable">
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" data-cursor="disable">
                    GitHub
                  </a>
                )}
                {project.privateProject && <strong>Enterprise Private</strong>}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="enterprise-strip">
        {resumeProjects.map((project) => (
          <div key={project.title}>
            <strong>{project.title}</strong>
            <span>{project.category}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;
