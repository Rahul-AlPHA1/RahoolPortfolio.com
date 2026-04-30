import { education, profile, skillGroups } from "../data/portfolioData";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <div className="about-focus-title">Profile snapshot</div>
        <div className="about-profile-grid">
          <div>
            <span>Location</span>
            <strong>{profile.location}</strong>
          </div>
          <div>
            <span>Availability</span>
            <strong>Onsite, Remote, Relocation</strong>
          </div>
          <div>
            <span>Education</span>
            <strong>{education.degree}</strong>
          </div>
          <div>
            <span>Domain</span>
            <strong>Core Banking & Fintech</strong>
          </div>
        </div>
        <div className="about-skill-strip">
          {skillGroups.slice(0, 4).map((group) => (
            <div className="about-skill-group" key={group.title}>
              <h4>{group.title}</h4>
              <div>
                {group.items.slice(0, 7).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
