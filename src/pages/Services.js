import React, { useState } from "react";
import "../styles/Services.css"; // Connects Services.css so every style update appears live
import { Link } from "react-router-dom";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import TuneIcon from "@mui/icons-material/Tune";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import MemoryIcon from "@mui/icons-material/Memory";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";

import serviceAssemblyImg from "../assets/service-assembly.jpg";
import newsCoolerImg from "../assets/news-cooler.jpg";
import newsRamImg from "../assets/news-ram.jpg";
import partCpuImg from "../assets/part-cpu.jpg";
import newsGpuImg from "../assets/news-gpu.jpg";
import partMoboImg from "../assets/part-mobo.jpg";

function Services() {
  // Tracks which category tab is currently active ("All", "Services", or "Components")
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Available filter tabs
  const categories = ["All", "Services", "Components"];

  const catalogItems = [
    {
      id: 1,
      category: "Services",
      image: serviceAssemblyImg,
      icon: <BuildCircleIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: "Custom Workstation Assembly",
      specs: "Full cable routing • Thermal paste • 24h Stress Test",
      price: "$75",
      description:
        "Complete custom rig build with clean airflow routing and OS driver setup.",
    },
    {
      id: 2,
      category: "Services",
      image: newsCoolerImg,
      icon: <TroubleshootIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: "Hardware Diagnostics & Thermal Cleanup",
      specs: "Deep dust extraction • Re-paste • Benchmark report",
      price: "$40",
      description:
        "Pinpoint bottlenecking parts, failing drives, or thermal throttling issues.",
    },
    {
      id: 3,
      category: "Services",
      image: newsRamImg,
      icon: <TuneIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: "BIOS & Memory XMP Tuning",
      specs: "RAM profile tuning • Fan curves • Undervolting",
      price: "$35",
      description:
        "Unlock rated DDR5 speeds and quiet acoustic fan profiles safely.",
    },
    {
      id: 4,
      category: "Components",
      image: partCpuImg,
      icon: <MemoryIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: "AMD Ryzen 7 7800X3D",
      specs: "8 Cores / 16 Threads • 96MB 3D V-Cache • AM5",
      price: "$389",
      description:
        "Top-tier gaming processor engineered for maximum frame-time stability.",
    },
    {
      id: 5,
      category: "Components",
      image: newsGpuImg,
      icon: <VideogameAssetIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: "NVIDIA GeForce RTX 4070 Super",
      specs: "12GB GDDR6X • DLSS 3.5 • Ray Tracing",
      price: "$599",
      description:
        "High-efficiency 1440p and 4K graphics card for gaming and 3D rendering.",
    },
    {
      id: 6,
      category: "Components",
      image: partMoboImg,
      icon: <DeveloperBoardIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: "MSI B650 Tomahawk Wi-Fi",
      specs: "ATX • DDR5 Support • PCIe 4.0 M.2 • Wi-Fi 6E",
      price: "$199",
      description:
        "Heavy-duty VRM thermal design with built-in high-speed wireless connectivity.",
    },
  ];

  // Dynamically filter items based on the active category tab
  const filteredItems =
    selectedCategory === "All"
      ? catalogItems
      : catalogItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="servicesPage">
      {/* Block 1: Page Header & Interactive Category Filter */}
      <section className="servicesHeader">
        <span className="sectionTag">HARDWARE & ENGINEERING</span>
        <h1>
          Services & <span className="blueHighlight">Component Catalog</span>
        </h1>
        <p>
          Explore custom workstation assembly packages and curated PC hardware
          components verified by Digitly TC engineers.
        </p>

        {/* Filter buttons rendered via .map() */}
        <div className="filterBar">
          {categories.map((category) => (
            <button
              key={category}
              // Applies 'activeFilter' class to whichever tab matches selectedCategory
              className={
                selectedCategory === category
                  ? "filterBtn activeFilter"
                  : "filterBtn"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      {/* Block 2: Filtered Cards Grid rendered via .map() */}
      <section className="catalogGrid">
        {filteredItems.map((item) => (
          <div className="catalogCard" key={item.id}>
            <img src={item.image} alt={item.title} className="catalogCardImg" />
            <div className="cardTopRow">
              <div className="cardIconBox">{item.icon}</div>
              <span className="categoryBadge">{item.category}</span>
            </div>

            <h3>{item.title}</h3>
            <p className="cardSpecs">{item.specs}</p>
            <p className="cardDesc">{item.description}</p>

            <div className="cardFooter">
              <span className="cardPrice">{item.price}</span>
              <Link
                to="/contact"
                state={{
                  category: item.category,
                  title: item.title,
                }}
                className="bookBtn"
              >
                Book / Inquire
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Services;
