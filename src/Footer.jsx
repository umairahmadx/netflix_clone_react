import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#press">Press</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><a href="#account">Account</a></li>
            <li><a href="#help">Help Center</a></li>
            <li><a href="#gift">Gift Cards</a></li>
            <li><a href="#media">Media Center</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#cookies">Cookie Settings</a></li>
            <li><a href="#notice">Notice</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <ul>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#facebook">Facebook</a></li>
            <li><a href="#instagram">Instagram</a></li>
            <li><a href="#youtube">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Netflix React. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
