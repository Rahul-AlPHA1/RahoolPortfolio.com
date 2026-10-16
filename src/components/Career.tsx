import { experience } from "../data/portfolioData";
import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {experience.map((job) => {
            const [mainRole, roleDetail] = job.role.split(" – ");
            const current = job.period.includes("Present");
            return (
              <div className="career-info-box" key={`${job.role}-${job.company}`}>
                <div className="career-info-in">
                  <div className="career-role">
                    {current && <em className="career-live">Current role</em>}
                    <h4>{mainRole}</h4>
                    {roleDetail && <p className="career-role-detail">{roleDetail}</p>}
                    <h5>{job.company}</h5>
                    <span>
                      {job.period} · {job.location}
                    </span>
                    {job.project && <small>{job.project}</small>}
                  </div>
                  <h3>{job.year}</h3>
                </div>
                <div className="career-copy">
                  <ul>
                    {job.points.slice(0, 4).map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="career-stack">
                    {job.stack.slice(0, 12).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Career;
