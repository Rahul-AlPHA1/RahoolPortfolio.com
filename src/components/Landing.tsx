import { MouseEvent, PropsWithChildren } from "react";
import { heroStats, profile } from "../data/portfolioData";
import { scrollToSection } from "./Navbar";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const handleViewWork = (event: MouseEvent<HTMLAnchorElement>) => {
    if (scrollToSection("#work")) {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>{profile.title}</h2>
            <h1>
              {profile.firstName}
              <br />
              <span>{profile.lastName}</span>
            </h1>
            <p className="landing-summary">{profile.summary}</p>
            <div className="landing-actions">
              <a href="#work" onClick={handleViewWork} data-cursor="disable">
                View Work
              </a>
              <a
                href={profile.resume}
                data-cursor="disable"
                download="Rahool_Gir_Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Download Resume
              </a>
            </div>
            <div className="landing-stats">
              {heroStats.map((stat) => (
                <div className="landing-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="landing-info">
            <h3>Building</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Banking</div>
              <div className="landing-h2-2">AI Tools</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Microservices</div>
              <div className="landing-h2-info-1">Full-Stack</div>
            </h2>
            <div className="landing-badges">
              <span>Java</span>
              <span>Spring Boot</span>
              <span>Quarkus</span>
              <span>Vue.js</span>
              <span>React</span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
