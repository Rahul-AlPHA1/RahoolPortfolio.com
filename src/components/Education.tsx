import { MdCalendarMonth, MdLocationOn, MdSchool } from "react-icons/md";
import { education } from "../data/portfolioData";
import "./styles/Education.css";

const Education = () => {
  const { project } = education;

  return (
    <section className="education-section section-container" id="education">
      <div className="sec-head reveal">
        <p className="sec-kicker">Education</p>
        <h2 className="sec-title">
          Where the <span>foundation</span> was built.
        </h2>
      </div>

      <div className="edu-layout">
        <article className="edu-degree glass spot reveal">
          <div className="edu-badge">
            <MdSchool />
          </div>
          <span className="edu-kicker">Degree</span>
          <h3>{education.degree}</h3>
          <p className="edu-school">{education.university}</p>
          <div className="edu-meta">
            <span>
              <MdCalendarMonth /> {education.period}
            </span>
            <span>
              <MdLocationOn /> {education.city}
            </span>
          </div>

          <div className="edu-courses">
            <h4>Core coursework</h4>
            <div className="chip-row">
              {education.courses.map((course) => (
                <span key={course}>{course}</span>
              ))}
            </div>
          </div>
        </article>

        <article className="edu-fyp glass spot reveal" data-delay={120}>
          <span className="edu-kicker">{project.label}</span>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>

          <div className="edu-metrics">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>

          <ul>
            {project.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <div className="chip-row">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Education;
