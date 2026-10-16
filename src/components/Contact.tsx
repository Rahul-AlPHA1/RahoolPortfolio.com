import { useState } from "react";
import { MdArrowOutward, MdCheck, MdContentCopy, MdCopyright, MdVerified } from "react-icons/md";
import { certifications, profile } from "../data/portfolioData";
import { scrollToSection } from "./Navbar";
import Logo from "./Logo";
import "./styles/Contact.css";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(profile.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <div className="contact-heading reveal">
          <p className="sec-kicker">Get In Touch</p>
          <h3>
            Let's build
            <br />
            <span>something great.</span>
          </h3>
          <p className="contact-sub">
            Open to senior full-stack, Java/Spring Boot and AI-product roles — full-time or contract,
            remote, onsite or relocation. Notice period ~1 month, negotiable for urgent roles.
          </p>
          <div className="contact-email">
            <a href={`mailto:${profile.email}`} data-cursor="disable">
              {profile.email}
              <MdArrowOutward />
            </a>
            <button type="button" onClick={copyEmail} data-cursor="disable" aria-label="Copy email">
              {copied ? <MdCheck /> : <MdContentCopy />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="contact-flex">
          <div className="contact-box glass reveal">
            <h4>Direct</h4>
            <a href={profile.phoneHref} data-cursor="disable" className="contact-line">
              <small>Phone</small>
              {profile.phone}
            </a>
            <div className="contact-line">
              <small>Location</small>
              {profile.location} · {profile.remote}
            </div>
            <div className="contact-line">
              <small>Open to</small>
              {profile.openTo}
            </div>
            <div className="contact-line">
              <small>Hours</small>
              {profile.availability}
            </div>
          </div>
          <div className="contact-box glass reveal" data-delay={90}>
            <h4>Elsewhere</h4>
            <a href={profile.github} target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
              GitHub <MdArrowOutward />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
              LinkedIn <MdArrowOutward />
            </a>
            <a href={profile.resume} target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
              Resume PDF <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box glass reveal" data-delay={180}>
            <h4>Credentials</h4>
            <ul className="contact-cert-list">
              {certifications.map((cert) => (
                <li key={cert.title}>
                  <MdVerified />
                  <span>
                    {cert.title}
                    <small>{cert.issuer}</small>
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#certifications"
              className="contact-cert-link"
              data-cursor="disable"
              onClick={(e) => {
                if (scrollToSection("#certifications")) e.preventDefault();
              }}
            >
              View all certificates <MdArrowOutward />
            </a>
          </div>
        </div>

        <footer className="portfolio-footer">
          <Logo
            className="footer-brand"
            subtitle={profile.title}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#landingDiv");
            }}
          />
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noreferrer" data-cursor="disable">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="disable">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} data-cursor="disable">
              Email
            </a>
            <a href={profile.resume} download data-cursor="disable">
              Resume
            </a>
          </div>
          <small className="footer-copy">
            <MdCopyright /> 2026 {profile.name} · Designed & engineered with React, Three.js & GSAP
          </small>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
