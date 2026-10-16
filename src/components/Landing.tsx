import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { MdArrowOutward, MdFileDownload } from "react-icons/md";
import { heroStats, profile } from "../data/portfolioData";
import { useLoading } from "../context/loadingContext";
import { scrollToSection } from "./Navbar";
import "./styles/Landing.css";

const CountUp = ({ to, run, delay }: { to: number; run: boolean; delay: number }) => {
  const [value, setValue] = useState(0);
  const frame = useRef<number>();

  useEffect(() => {
    if (!run) return;
    const duration = 1400;
    let start = 0;
    const timer = setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now;
        const p = Math.min(1, (now - start) / duration);
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [run, to, delay]);

  return <>{value}</>;
};

const Landing = ({ children }: PropsWithChildren) => {
  const { isLoading } = useLoading();

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <div className="landing-now">
              <i />
              <span>{profile.currentRole}</span>
            </div>
            <h2>Hello! I'm</h2>
            <h1>
              {profile.firstName.toUpperCase()}
              <br />
              <span>{profile.lastName.toUpperCase()}</span>
            </h1>
            <p className="landing-role">{profile.title}</p>
            <p className="landing-summary">{profile.heroSummary}</p>
            <div className="landing-stats">
              {heroStats.map((stat, i) => (
                <div className="landing-stat" key={stat.label}>
                  <strong>
                    <CountUp to={stat.value} run={!isLoading} delay={600 + i * 120} />
                    {stat.suffix}
                  </strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="landing-cta">
              <a
                href="#work"
                className="cta-primary"
                data-cursor="disable"
                onClick={(e) => {
                  if (scrollToSection("#work")) e.preventDefault();
                }}
              >
                View my work <MdArrowOutward />
              </a>
              <a href={profile.resume} download className="cta-ghost" data-cursor="disable">
                Download CV <MdFileDownload />
              </a>
            </div>
          </div>
          <div className="landing-info">
            <h3>Building</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Scalable</div>
              <div className="landing-h2-2">Intelligent</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Systems</div>
              <div className="landing-h2-info-1">Products</div>
            </h2>
            <div className="landing-badges">
              {["Java", "Spring Boot", "Python", "React", "Next.js", "TypeScript", "Kafka", "Kubernetes", "AI / LLM"].map(
                (b) => (
                  <span key={b}>{b}</span>
                )
              )}
            </div>
          </div>
          <div className="landing-scroll" aria-hidden="true">
            <span>Scroll</span>
            <i />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
