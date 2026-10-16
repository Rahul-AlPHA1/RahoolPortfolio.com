import { MdArrowOutward, MdFileDownload } from "react-icons/md";
import { coreStrengths, hiring, profile } from "../data/portfolioData";
import "./styles/Strengths.css";

const impact = [
  { value: "Hours → mins", label: "Daily financial close after automating reconciliation" },
  { value: "10+", label: "Distributed microservices designed & delivered" },
  { value: "4+", label: "Trade Finance modules under SBP regulation" },
  { value: "Nationwide", label: "Teller capabilities live across bank branches" },
];

const Strengths = () => {
  return (
    <section className="strengths-section section-container" id="strengths">
      <div className="sec-head reveal">
        <p className="sec-kicker">Why Work With Me</p>
        <h2 className="sec-title">
          What I bring to <span>every team.</span>
        </h2>
      </div>

      <div className="strengths-grid">
        {coreStrengths.map((item, i) => (
          <article className="strength-card glass spot reveal" key={item.title} data-delay={i * 80}>
            <span className="strength-num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}

        <article className="strength-card impact-card glass spot reveal" data-delay={400}>
          <span className="strength-num">06</span>
          <h3>Production Impact</h3>
          <ul className="impact-list">
            {impact.map((item) => (
              <li key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="availability-banner reveal">
        <div className="availability-copy">
          <span className="availability-pill">
            <i /> Open to opportunities
          </span>
          <h3>
            Ready to join — <span>anywhere.</span>
          </h3>
          <p>
            {hiring.employment} · {hiring.workMode} · Notice period {hiring.noticePeriod} ({hiring.noticeNote.split(" — ")[0]}).
            Based in {profile.location}; {profile.availability.charAt(0).toLowerCase() + profile.availability.slice(1)}
          </p>
        </div>
        <div className="availability-actions">
          <a href={`mailto:${profile.email}`} className="btn-solid" data-cursor="disable">
            Start a conversation <MdArrowOutward />
          </a>
          <a href={profile.resume} download className="btn-line" data-cursor="disable">
            Download CV <MdFileDownload />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Strengths;
