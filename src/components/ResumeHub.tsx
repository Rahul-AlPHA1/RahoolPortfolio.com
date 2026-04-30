import { certifications, education, profile, skillGroups } from "../data/portfolioData";
import "./styles/ResumeHub.css";

const ResumeHub = () => {
  return (
    <section className="resume-hub section-container" id="resume">
      <div className="resume-hub-head">
        <p>Resume System</p>
        <h2>
          Complete profile data, <span>structured</span>
          <br /> for technical hiring.
        </h2>
        <a href={profile.resume} download data-cursor="disable">
          Download Full Resume
        </a>
      </div>

      <div className="resume-hub-grid">
        <article className="resume-hub-card resume-education">
          <span className="resume-kicker">Education</span>
          <h3>{education.degree}</h3>
          <p>{education.university}</p>
          <strong>{education.period}</strong>
          <div className="course-list">
            {education.courses.map((course) => (
              <span key={course}>{course}</span>
            ))}
          </div>
        </article>

        <article className="resume-hub-card resume-availability">
          <span className="resume-kicker">Availability</span>
          <h3>Ready for onsite and remote opportunities.</h3>
          <p>{profile.availability}</p>
          <div className="availability-list">
            <span>{profile.location}</span>
            <span>Open to relocation</span>
            <span>Notice negotiable</span>
            <span>Fintech & banking roles</span>
          </div>
        </article>

        <article className="resume-hub-card resume-skill-matrix">
          <span className="resume-kicker">Technical Skills</span>
          <div className="skill-matrix">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h4>{group.title}</h4>
                <div>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="resume-hub-card resume-certs">
          <span className="resume-kicker">Certifications & Training</span>
          <div className="cert-grid">
            {certifications.map((cert) => (
              <div className="cert-tile" key={cert.title}>
                <img src={cert.image} alt={cert.title} />
                <div>
                  <h4>{cert.title}</h4>
                  <p>{cert.issuer}</p>
                  <span>{cert.period}</span>
                  {cert.topics && <small>{cert.topics}</small>}
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default ResumeHub;
