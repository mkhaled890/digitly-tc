import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import appIcon from "../assets/app_icon.png";

import "../styles/NavBar.css";

function NavBar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavBar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="navbar">
      {/* Left side: Brand logo + hidden mobile drawer links */}
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <Link to="/" className="brandLogo">
          <img
            src={appIcon}
            alt="Digitly TC Logo"
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              objectFit: "cover",
            }}
          />
          <span>
            DIGITLY <strong style={{ color: "#2563eb" }}>TC</strong>
          </span>
        </Link>

        {/* Links shown only when mobile menu is toggled open */}
        <div className="hiddenLinks">
          <NavLink to="/" end onClick={toggleNavBar}>
            Home
          </NavLink>
          <NavLink to="/services" onClick={toggleNavBar}>
            Services
          </NavLink>
          <NavLink to="/custom-builder" onClick={toggleNavBar}>
            PC Builder
          </NavLink>
          <NavLink
            to="/ai-advisor"
            className="aiNavBadge"
            onClick={toggleNavBar}
          >
            AI Advisor
          </NavLink>
          <NavLink to="/about" onClick={toggleNavBar}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={toggleNavBar}>
            Contact
          </NavLink>
        </div>
      </div>

      {/* Right side: Desktop navigation links + mobile menu button */}
      <div className="rightSide">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/services">Services</NavLink>

        <NavLink to="/custom-builder">PC Builder</NavLink>
        <NavLink to="/ai-advisor" className="aiNavBadge">
          AI Advisor
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <button onClick={toggleNavBar} aria-label="Toggle Menu">
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
