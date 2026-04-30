import { skillGroups } from "../data/portfolioData";

const featuredSkills = [
  { label: "Java", level: "Expert", value: 92 },
  { label: "Spring Boot", level: "Expert", value: 90 },
  { label: "Quarkus", level: "Advanced", value: 85 },
  { label: "Microservices / REST API", level: "Expert", value: 90 },
  { label: "Vue.js / XState", level: "Advanced", value: 82 },
  { label: "React / TypeScript", level: "Proficient", value: 74 },
];

const TechStack = () => {
  return (
    <section className="techstack section-container" id="techstack">
      <div className="techstack-head">
        <p>Technical Stack</p>
        <h2>
          Practical tools for <span>banking</span>, APIs,
          <br /> dashboards, and AI products.
        </h2>
      </div>

      <div className="techstack-layout">
        <div className="tech-bars">
          {featuredSkills.map((skill) => (
            <div className="tech-bar" key={skill.label}>
              <div>
                <strong>{skill.label}</strong>
                <span>{skill.level}</span>
              </div>
              <div className="tech-track">
                <i style={{ width: `${skill.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="tech-cloud-grid">
          {skillGroups.map((group) => (
            <article className="tech-cloud-card" key={group.title}>
              <h3>{group.title}</h3>
              <div>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
