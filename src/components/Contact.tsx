import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { certifications, education, profile } from "../data/portfolioData";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <div className="contact-heading">
          <p>Get In Touch</p>
          <h3>Let's connect.</h3>
          <span>
            Available for new opportunities, production engineering work, and
            fintech/full-stack roles.
          </span>
        </div>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${profile.email}`} data-cursor="disable">
                {profile.email}
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+923089567074" data-cursor="disable">
                {profile.phone}
              </a>
            </p>
            <h4>Location</h4>
            <p>{profile.location}</p>
            <h4>Availability</h4>
            <p>{profile.availability}</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href={profile.github}
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Resume PDF <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box contact-resume-box">
            <h2>
              Built for <br /> <span>{profile.name}</span>
            </h2>
            <p>
              {education.degree} at {education.university}. Certified in Java & DSA,
              Problem Solving, and Advanced SQL.
            </p>
            <div className="contact-cert-list">
              {certifications.map((cert) => (
                <span key={cert.title}>{cert.title}</span>
              ))}
            </div>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
        <footer className="portfolio-footer">
          <div>
            <strong>RG</strong>
            <span>Rahool Gir</span>
          </div>
          <p>Senior Software Engineer . Karachi, Pakistan</p>
          <div className="footer-links">
            <a href={profile.github} target="_blank" data-cursor="disable">
              Github
            </a>
            <a href={profile.linkedin} target="_blank" data-cursor="disable">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} data-cursor="disable">
              Email
            </a>
            <a href={profile.resume} download data-cursor="disable">
              Resume
            </a>
          </div>
          <small>
            <MdCopyright /> 2026 Rahool Gir. Built with React, GSAP, Three.js,
            and production-minded detail.
          </small>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
