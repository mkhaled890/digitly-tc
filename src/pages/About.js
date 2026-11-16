import React from "react";
import "../styles/About.css";
import { Link } from "react-router-dom";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SecurityIcon from "@mui/icons-material/Security";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import workshopImg from "../assets/service-assembly.jpg";

function About() {
  // Key studio metrics rendered dynamically via .map()
  const stats = [
    { id: 1, value: "100%", label: "Compatibility Verified" },
    { id: 2, value: "24h", label: "Thermal & Load Stress Test" },
    { id: 3, value: "0", label: "Bottleneck Tolerance" },
  ];

  // Core engineering pillars
  const pillars = [
    {
      id: 1,
      icon: <PsychologyIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: "Data-Driven AI Consulting",
      description:
        "Instead of upselling overpriced components, Digitly TC pairs real benchmark telemetry with AI compatibility rules to maximize performance per dollar.",
    },
    {
      id: 2,
      icon: (
        <PrecisionManufacturingIcon
          style={{ fontSize: 32, color: "#2563eb" }}
        />
      ),
      title: "Precision Workstation Craft",
      description:
        "Every custom build undergoes clean rear-chamber cable routing, custom fan-curve calibration, and verified EXPO/XMP memory tuning.",
    },
    {
      id: 3,
      icon: <SecurityIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: "Transparent Diagnostics",
      description:
        "Whether fixing thermal throttling or upgrading an existing rig, you get clear before-and-after benchmark numbers and honest part recommendations.",
    },
  ];

  return (
    <div className="aboutPage">
      {/* Block 1: Brand Story & Mission Header */}
      <section className="aboutHeader">
        <span className="sectionTag">OUR ENGINEERING STORY</span>
        <h1>
          Precision Hardware Meets{" "}
          <span className="blueHighlight">Intelligent Design</span>
        </h1>
        <p>
          Founded to bridge the gap between raw PC hardware engineering and
          accessible AI guidance, Digitly TC helps gamers, 3D creators, and
          developers build reliable, high-airflow machines without guesswork.
        </p>
      </section>

      {/* Block 2: Engineering Metrics Strip */}
      <section className="statsStrip">
        {stats.map((stat) => (
          <div className="statCard" key={stat.id}>
            <span className="statValue">{stat.value}</span>
            <span className="statLabel">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Block 3: Core Engineering Pillars */}
      <section className="pillarsSection">
        <div className="aboutBannerWrapper">
          <img
            src={workshopImg}
            alt="Digitly TC PC assembly and diagnostics workbench"
            className="aboutBannerImg"
          />
        </div>
        <h2>How Digitly TC Builds Differently</h2>
        <div className="pillarsGrid">
          {pillars.map((pillar) => (
            <div className="pillarCard" key={pillar.id}>
              <div className="pillarIcon">{pillar.icon}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="aboutCtaBox">
          <h3>Ready to plan your next rig?</h3>
          <p>
            Test your budget in our AI Build Advisor or reach out to our
            technicians directly.
          </p>
          <div className="aboutCtaButtons">
            <Link to="/ai-advisor" className="btnPrimary">
              <AutoAwesomeIcon style={{ fontSize: 18 }} />
              Try AI Build Advisor
            </Link>
            <Link to="/contact" className="btnSecondary">
              Contact Digitly TC
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
