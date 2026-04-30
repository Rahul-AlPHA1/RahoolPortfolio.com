import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";
import { profile } from "../data/portfolioData";
import { MdEmail } from "react-icons/md";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href={profile.github} target="_blank">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href={profile.linkedin} target="_blank">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href={`mailto:${profile.email}`}>
            <MdEmail />
          </a>
        </span>
        <span>
          <a href={profile.resume} download>
            <TbNotes />
          </a>
        </span>
      </div>
      <a className="resume-button" href={profile.resume} download>
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
