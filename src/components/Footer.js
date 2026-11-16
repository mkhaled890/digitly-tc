import React from "react";
import "../styles/Footer.css";
import { Link, NavLink } from "react-router-dom";

import MemoryIcon from "@mui/icons-material/Memory";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  return (
    <footer className="footer">
      <div className="footerTop">
        {/* Brand column */}
        <div className="footerBrand">
          <Link to="/" className="footerLogo">
            <MemoryIcon style={{ fontSize: 30, color: "#2563eb" }} />
            <span>
              DIGITLY <strong style={{ color: "#2563eb" }}>TC</strong>
            </span>
          </Link>
          <p>
            Custom PC hardware builds, compatibility diagnostics, and AI-powered
            build advice.
          </p>
        </div>

        {/* Quick navigation column */}
        <div className="footerLinks">
          <h4>Quick Links</h4>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/custom-builder">PC Builder</NavLink>
          <NavLink to="/ai-advisor">AI Advisor</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* Social & community column */}
        <div className="footerSocial">
          <h4>Connect</h4>
          <div className="socialMedia">
            <InstagramIcon />
            <LinkedInIcon />
            <GitHubIcon />
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="footerBottom">
        <p>&copy; 2026 Digitly TC. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
