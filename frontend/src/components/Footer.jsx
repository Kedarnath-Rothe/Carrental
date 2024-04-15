import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {

    const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <p>&copy; {currentYear} Your Website. All rights reserved.</p>
          </div>
          <div className="social-icons">
            <a href="https://www.facebook.com/" target="blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com/" target="blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://github.com/Kedarnath-Rothe" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/kedarnath-rothe-a39316258/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
