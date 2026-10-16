import { useState } from "react";
import { MdArrowOutward, MdLock, MdPlayArrow } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import { projects } from "../data/portfolioData";
import "./styles/Work.css";

const liveProjects = projects.filter((project) => project.live);
const privateProjects = projects.filter((project) => project.privateProject);

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [liveFrame, setLiveFrame] = useState<string | null>(null);

  const activeProject = liveProjects[activeIndex];
  if (!activeProject) return null;

  const select = (index: number) => {
    setActiveIndex(index);
    setLiveFrame(null);
  };

  return (
    <section className="work-section section-container" id="work">
      <div className="sec-head reveal">
        <p className="sec-kicker">Selected Work</p>
        <h2 className="sec-title">
          Live products — <span>shipped</span>,
          <br /> running & open to inspect.
        </h2>
      </div>

      <div className="project-theater reveal">
        <div className="theater-copy" key={activeProject.title}>
          <div className="theater-index">
            <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
            <span>/ {String(liveProjects.length).padStart(2, "0")}</span>
          </div>
          <span className="theater-category">{activeProject.category}</span>
          <h3>{activeProject.title}</h3>
          <p>{activeProject.summary}</p>
          <ul className="theater-points">
            {activeProject.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="theater-tags">
            {activeProject.stack.slice(0, 8).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="theater-actions">
            {activeProject.live && (
              <a href={activeProject.live} target="_blank" rel="noreferrer" data-cursor="disable" className="btn-solid">
                Open live <MdArrowOutward />
              </a>
            )}
            {activeProject.github && (
              <a href={activeProject.github} target="_blank" rel="noreferrer" data-cursor="disable" className="btn-line">
                <FaGithub /> Source
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
              <MdLock />
              {activeProject.live?.replace("https://", "").replace(/\/$/, "")}
            </div>
          </div>
          <div className="browser-screen">
            <img
              src={activeProject.image}
              alt={`${activeProject.title} preview`}
              key={activeProject.image}
              loading="lazy"
            />
            {liveFrame === activeProject.live ? (
              <iframe
                src={activeProject.live}
                title={`${activeProject.title} live preview`}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            ) : (
              <button
                type="button"
                className="browser-launch"
                data-cursor="disable"
                onClick={() => setLiveFrame(activeProject.live ?? null)}
              >
                <i>
                  <MdPlayArrow />
                </i>
                Interact with the live app
              </button>
            )}
          </div>
          <div className="project-switcher">
            {liveProjects.map((project, index) => (
              <button
                type="button"
                className={index === activeIndex ? "active" : ""}
                onClick={() => select(index)}
                key={project.title}
                data-cursor="disable"
              >
                <small>{String(index + 1).padStart(2, "0")}</small>
                {project.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="project-card-grid">
        {liveProjects.map((project, index) => (
          <article
            className="project-card spot reveal"
            key={project.title}
            data-delay={index * 110}
          >
            <div className="project-thumb">
              <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
              <span className="project-live-dot">Live</span>
            </div>
            <div className="project-body">
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="project-tags">
                {project.stack.slice(0, 6).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="project-actions">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" data-cursor="disable">
                    Live demo <MdArrowOutward />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" data-cursor="disable">
                    <FaGithub /> GitHub
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="enterprise-head reveal">
        <p className="sec-kicker">Enterprise & Client Work</p>
        <span>Production systems under NDA — architecture and impact, no source.</span>
      </div>
      <div className="enterprise-grid">
        {privateProjects.map((project) => (
          <article className="enterprise-card spot reveal" key={project.title}>
            <div className="enterprise-top">
              <span className="enterprise-lock">
                <MdLock /> Private
              </span>
              <small>{project.category}</small>
            </div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <ul>
              {project.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="project-tags">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Work;
