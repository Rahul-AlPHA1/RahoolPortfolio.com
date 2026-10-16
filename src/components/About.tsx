import { profile } from "../data/portfolioData";
import "./styles/About.css";

const facts = [
  { label: "Experience", value: `${profile.years} years · Full-Stack & AI` },
  { label: "Currently", value: "Systems Limited × Confiz — Chatterbox" },
  { label: "Previously", value: "TereSol — AL-Habib Bank CBS (4 yrs)" },
  { label: "Based in", value: `${profile.location} · ${profile.remote}` },
];

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">Profile Overview</h3>
        <div className="about-focus-title">
          Full-stack engineer, <span>AI-native</span> by default.
        </div>
        <div className="about-overview">
          {profile.overview.map((para) => (
            <p className="about-lead" key={para.slice(0, 24)}>
              {para}
            </p>
          ))}
        </div>
        <div className="about-ai">
          <span>AI toolkit</span>
          <div>
            {profile.aiToolkit.map((tool) => (
              <i key={tool}>{tool}</i>
            ))}
          </div>
        </div>
        <div className="about-profile-grid">
          {facts.map((f) => (
            <div key={f.label}>
              <span>{f.label}</span>
              <strong>{f.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
