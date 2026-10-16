import { featuredSkills, skillGroups } from "../data/portfolioData";

const TechStack = () => {
  return (
    <section className="techstack section-container" id="skills">
      <div className="sec-head reveal">
        <p className="sec-kicker">Technical Stack</p>
        <h2 className="sec-title">
          The toolkit I use <span>to ship.</span>
        </h2>
      </div>

      <div className="techstack-layout">
        <div className="tech-bars reveal">
          <h3>Core proficiency</h3>
          {featuredSkills.map((skill, i) => (
            <div className="tech-bar" key={skill.label}>
              <div>
                <strong>{skill.label}</strong>
                <span>{skill.level}</span>
              </div>
              <div className="tech-track">
                <i style={{ width: `${skill.value}%`, transitionDelay: `${300 + i * 110}ms` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="tech-cloud-grid">
          {skillGroups.map((group, i) => (
            <article className="tech-cloud-card spot reveal" key={group.title} data-delay={i * 60}>
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
