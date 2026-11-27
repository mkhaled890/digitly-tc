import React, { useState } from "react";
import "../styles/Services.css"; // Connects Services.css so every style update appears live
import { Link } from "react-router-dom";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import TuneIcon from "@mui/icons-material/Tune";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import MemoryIcon from "@mui/icons-material/Memory";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import StorageIcon from "@mui/icons-material/Storage";
import BoltIcon from "@mui/icons-material/Bolt";

import serviceAssemblyImg from "../assets/service-assembly.jpg";
import newsCoolerImg from "../assets/news-cooler.jpg";
import newsRamImg from "../assets/news-ram.jpg";
import partCpuImg from "../assets/part-cpu.jpg";
import newsGpuImg from "../assets/news-gpu.jpg";
import partMoboImg from "../assets/part-mobo.jpg";

import { pcComponents } from "../data/pcComponents";

function Services() {
  // Tracks which category tab is currently active ("All", "Services", or "Components")
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Available filter tabs
  const categories = ["All", "Services", "Components"];

  const serviceItems = [
    {
      id: "srv-1",
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
      id: "srv-2",
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
      id: "srv-3",
      category: "Services",
      image: newsRamImg,
      icon: <TuneIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: "BIOS & Memory XMP Tuning",
      specs: "RAM profile tuning • Fan curves • Undervolting",
      price: "$35",
      description:
        "Unlock rated DDR5 speeds and quiet acoustic fan profiles safely.",
    },
  ];

  // Dynamically map all 96 parts from src/data/pcComponents.js into catalog cards
  const componentItems = [
    ...pcComponents.cpus.map((cpu) => ({
      id: cpu.id,
      category: "Components",
      image: partCpuImg,
      icon: <MemoryIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: cpu.name,
      specs: `Socket ${cpu.socket} • ${cpu.wattage}W TDP • Desktop CPU`,
      price: `$${cpu.price}`,
      description: `Verified ${cpu.socket} processor engineered for high-efficiency gaming and workstation builds.`,
    })),
    ...pcComponents.gpus.map((gpu) => ({
      id: gpu.id,
      category: "Components",
      image: newsGpuImg,
      icon: <VideogameAssetIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: gpu.name,
      specs: `${gpu.wattage}W Board Power • PCIe Graphics Card`,
      price: `$${gpu.price}`,
      description:
        "High-performance discrete GPU verified for modern 1080p, 1440p, and 4K rendering workloads.",
    })),
    ...pcComponents.motherboards.map((mb) => ({
      id: mb.id,
      category: "Components",
      image: partMoboImg,
      icon: <DeveloperBoardIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: mb.name,
      specs: `Socket ${mb.socket} • ${mb.ramType} Support • Motherboard`,
      price: `$${mb.price}`,
      description: `Reliable ${mb.socket} motherboard with ${mb.ramType} memory architecture and high-speed M.2 expansion.`,
    })),
    ...pcComponents.ram.map((ram) => ({
      id: ram.id,
      category: "Components",
      image: newsRamImg,
      icon: <TuneIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: ram.name,
      specs: `${ram.ramType} Dual-Channel Kit • High-Speed Memory`,
      price: `$${ram.price}`,
      description: `Tested ${ram.ramType} desktop memory kit tuned for low latency and system stability.`,
    })),
    ...pcComponents.storage.map((ssd) => ({
      id: ssd.id,
      category: "Components",
      image: partMoboImg,
      icon: <StorageIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: ssd.name,
      specs: "M.2 NVMe Solid State Drive • High-Speed Storage",
      price: `$${ssd.price}`,
      description:
        "Ultra-fast NVMe storage for rapid OS boot times, game loading, and heavy project transfers.",
    })),
    ...pcComponents.psus.map((psu) => ({
      id: psu.id,
      category: "Components",
      image: newsCoolerImg,
      icon: <BoltIcon style={{ fontSize: 32, color: "#2563eb" }} />,
      title: psu.name,
      specs: `${psu.maxWattage}W Max Output • ATX Power Supply`,
      price: `$${psu.price}`,
      description: `High-efficiency ${psu.maxWattage}W power supply unit for clean, stable system power delivery.`,
    })),
  ];

  const catalogItems = [...serviceItems, ...componentItems];

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
