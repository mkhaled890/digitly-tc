
import "../styles/Home.css";
// Link lets our call-to-action buttons route directly to AI Advisor and Services
import { Link } from "react-router-dom";
import React, { useState } from "react";
// Material UI icons for button accents
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BuildIcon from "@mui/icons-material/Build";
import SpeedIcon from "@mui/icons-material/Speed";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ArticleIcon from "@mui/icons-material/Article";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import heroRigImg from "../assets/hero-rig.jpg";
import newsSsdImg from "../assets/news-ssd.jpg";
import newsCoolerImg from "../assets/news-cooler.jpg";
import newsPsuImg from "../assets/news-psu.jpg";
import newsRamImg from "../assets/news-ram.jpg";
import newsGpuImg from "../assets/news-gpu.jpg";
import newsAirflowImg from "../assets/news-airflow.jpg";


function Home() {
  const techNotes = [
    {
      id: 1,
      tag: "TECH NEWS",
      date: "Nov 2026",
      image: newsSsdImg,
      title: "Next-Gen PCIe 5.0 NVMe Drives Hit Mainstream Pricing",
      summary:
        "Gen5 SSD read speeds surpassing 14,000 MB/s are now accessible for workstation builds—paired with updated motherboard heatsink standards.",
    },
    {
      id: 2,
      tag: "HARDWARE FAIL",
      date: "Diagnostic Case #19",
      image: newsCoolerImg,
      title: "Plastic Peel Left on AIO Copper Cold Plate",
      summary:
        "A client's i9 hit 100°C at idle because the clear protective film wasn't removed before mounting the cooler. Always inspect the base plate twice.",
    },
    {
      id: 3,
      tag: "PRO ADVICE",
      date: "Power Safety",
      image: newsPsuImg,
      title: "Never Mix Modular PSU Cables Across Brands",
      summary:
        "Pinouts on the PSU side are not standardized—reusing cables from an old power supply can instantly short-circuit motherboards and SSDs.",
    },
    {
      id: 4,
      tag: "HARDWARE FAIL",
      date: "Diagnostic Case #27",
      image: newsRamImg,
      title: "4 Sticks of High-Speed DDR5 Failing to Boot at EXPO",
      summary:
        "Populating all four RAM slots forces the memory controller to drop clock speeds. Use a matched 2-stick dual-channel kit for maximum stability.",
    },
    {
      id: 5,
      tag: "TECH NEWS",
      date: "Nov 2026",
      image: newsGpuImg,
      title: "ATX 3.1 & Native 12V-2x6 Connectors Become Standard",
      summary:
        "Revised shorter sense pins prevent partial GPU cable seating and eliminate connector melting under sustained 450W+ rendering loads.",
    },
    {
      id: 6,
      tag: "PRO ADVICE",
      date: "Airflow Rule",
      image: newsAirflowImg,
      title: "Maintain Positive Case Pressure to Block Dust",
      summary:
        "Configure slightly more intake CFM than exhaust CFM through filtered front fans so dust doesn't get pulled through unfiltered rear gaps.",
    },
  ];

  const features = [
    {
      id: 1,
      icon: <AutoAwesomeIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: "AI Build Recommendation",
      description:
        "Input your budget and workload to get an optimized CPU, GPU, and RAM pairing in seconds.",
    },
    {
      id: 2,
      icon: <VerifiedUserIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: "Zero-Bottleneck Verification",
      description:
        "Automated socket, wattage, and thermal clearance checks before you purchase a single part.",
    },
    {
      id: 3,
      icon: <SpeedIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: "Custom Assembly & Tuning",
      description:
        "Precision cable management, BIOS optimization, and stress-testing by Digitly TC technicians.",
    },
  ];

  // Tracks which FAQ item is currently expanded (null = all collapsed)
  const [openFaqId, setOpenFaqId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "Do you assemble PCs if I already bought my own parts?",
      answer:
        "Yes. Bring your components to our Sin El Fil workshop—we inspect every part, assemble the system with clean rear-chamber cable routing, update the BIOS, enable XMP/EXPO, and run a 24-hour thermal stress test.",
    },
    {
      id: 2,
      question:
        "How long does a custom workstation build and stress test take?",
      answer:
        "Once all components are on hand, standard custom assembly, OS/driver configuration, and our 24-hour stability and thermal benchmark validation take 24 to 48 hours.",
    },
    {
      id: 3,
      question: "How does the AI Build Advisor guarantee zero bottlenecks?",
      answer:
        "Our recommendation rules cross-check CPU socket generations, DDR4/DDR5 motherboard compatibility, GPU PCIe bandwidth, and PSU wattage headroom against your target workload and budget.",
    },
  ];

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="home">
      {/* Block 1: Hero Banner Section */}
      <section className="heroSection">
        <span className="heroTag">NEXT-GEN PC HARDWARE & AI</span>
        <h1>
          Build Your Dream Rig With{" "}
          <span className="blueHighlight">AI Precision</span>
        </h1>
        <p>
          Digitly TC combines custom workstation assembly, real-time component
          diagnostics, and an intelligent AI Build Advisor to guarantee zero
          bottlenecks and 100% compatibility.
        </p>

        {/* Primary & Secondary Call-To-Action Buttons */}
        <div className="heroButtons">
          <Link to="/ai-advisor" className="btnPrimary">
            <AutoAwesomeIcon style={{ fontSize: 20 }} />
            Launch AI Build Advisor
          </Link>
          <Link to="/services" className="btnSecondary">
            <BuildIcon style={{ fontSize: 18 }} />
            Explore Hardware Services
          </Link>
        </div>
        {/* Hero Showcase Image */}
        <div className="heroImageWrapper">
          <img
            src={heroRigImg}
            alt="Custom dark workstation PC built by Digitly TC"
            className="heroBannerImg"
          />
        </div>
      </section>

      {/* Block 2: Tech Goods News, Engineering Notes & Build Stories */}
      <section className="techNewsSection">
        <div className="techNewsHeader">
          <ArticleIcon style={{ fontSize: 26, color: "#2563eb" }} />
          <h2>Tech Insights & Hardware Feed</h2>
        </div>

        <div className="techNewsGrid">
          {techNotes.map((note) => (
            <article className="techNewsCard" key={note.id}>
              <img src={note.image} alt={note.title} className="newsCardImg" />
              <div>
                <div className="newsMetaRow">
                  <span className="newsTag">{note.tag}</span>
                  <span className="newsDate">{note.date}</span>
                </div>
                <h3>{note.title}</h3>
                <p>{note.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* Block 3: Core Capabilities Grid rendered with .map() */}
      <section className="featuresSection">
        <h2>Why Choose Digitly TC</h2>
        <div className="featuresGrid">
          {features.map((item) => (
            <div className="featureCard" key={item.id}>
              <div className="featureIcon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Block 4: Interactive FAQ Accordion */}
      <section className="faqSection">
        <h2>Frequently Asked Questions</h2>
        <div className="faqList">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                className={isOpen ? "faqItem openFaq" : "faqItem"}
                key={faq.id}
              >
                <button
                  type="button"
                  className="faqQuestion"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span>{faq.question}</span>
                  <ExpandMoreIcon
                    className={isOpen ? "faqArrow rotated" : "faqArrow"}
                  />
                </button>
                {isOpen && <p className="faqAnswer">{faq.answer}</p>}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;
