import React, { useState } from "react";
import "../styles/AiAdvisor.css";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MemoryIcon from "@mui/icons-material/Memory";
import BoltIcon from "@mui/icons-material/Bolt";

function AiAdvisor() {
  // Interactive controls + natural language prompt state
  const [budget, setBudget] = useState(1500);
  const [workload, setWorkload] = useState("Gaming");
  const [cpuBrand, setCpuBrand] = useState("AMD");
  const [promptText, setPromptText] = useState("");

  // Stores the AI response object (either a full PC build blueprint or a hardware compatibility Q&A)
  const [aiResult, setAiResult] = useState(null);

  // Sample natural-language prompts users can click to autofill
  const samplePrompts = [
    "Build me an office build under $900",
    "Gaming build under $1200",
    "What motherboards support Intel 13th Gen?",
    "What is the best GPU for MSI B650 Tomahawk?",
  ];

  // Intelligent parser that reads natural-language prompts OR falls back to slider/pill selections
  const analyzeRequest = (rawPrompt) => {
    const query = rawPrompt.trim().toLowerCase();

    // 1. Hardware Compatibility Question: Intel 13th Gen Motherboards
    if (
      query.includes("13th gen") ||
      query.includes("13th") ||
      query.includes("lga 1700")
    ) {
      return {
        type: "qa",
        title: "Compatible Motherboards for Intel 13th Gen (LGA 1700)",
        badge: "SOCKET VERIFIED • LGA 1700",
        answer:
          "Intel 13th Gen Core processors (i5-13400F, i5-13600K, i7-13700K, i9-13900K) use the LGA 1700 socket and are compatible with Intel 600-series (with BIOS update) and 700-series chipsets.",
        recommendations: [
          {
            label: "Best Value (DDR5)",
            detail:
              "MSI PRO B760M-A Wi-Fi — Great VRM thermals for i5-13400F / 13600K ($149)",
          },
          {
            label: "Mid-Range ATX",
            detail:
              "ASUS TUF Gaming B760-Plus Wi-Fi — PCIe 5.0 x16 slot + 3x M.2 NVMe ($189)",
          },
          {
            label: "Overclocking Flagship",
            detail:
              "MSI MAG Z790 Tomahawk Wi-Fi — Heavy 16+1+1 power phases for i7/i9 K-series ($239)",
          },
          {
            label: "Compatibility Note",
            detail:
              "Verify whether the board is DDR4 or DDR5 before purchasing RAM—LGA 1700 boards only accept one type.",
          },
        ],
      };
    }

    // 2. Hardware Compatibility Question: Best GPU for a specific motherboard
    if (
      query.includes("best gpu") ||
      (query.includes("gpu") && query.includes("motherboard")) ||
      query.includes("b650")
    ) {
      return {
        type: "qa",
        title:
          "Best GPU Pairings for Modern PCIe 4.0/5.0 Motherboards (B650 / B760)",
        badge: "PCIE X16 BANDWIDTH CHECKED",
        answer:
          "Any modern ATX/mATX motherboard with a PCIe 4.0 x16 slot (like the MSI B650 Tomahawk or B760) supports every current graphics card without bandwidth loss. The optimal choice depends on resolution and PSU wattage:",
        recommendations: [
          {
            label: "1080p / Budget King",
            detail:
              "AMD Radeon RX 7700 XT (12GB) — High raster performance, needs 650W PSU ($399)",
          },
          {
            label: "1440p Sweet Spot",
            detail:
              "NVIDIA GeForce RTX 4070 Super (12GB) — Best efficiency + DLSS 3.5, needs 650W–750W PSU ($599)",
          },
          {
            label: "4K & AI Workloads",
            detail:
              "NVIDIA GeForce RTX 4080 Super (16GB) — Ideal for 4K ray tracing & local LLMs, needs 850W ATX 3.1 PSU ($999)",
          },
          {
            label: "Physical Check",
            detail:
              "Confirm your PC case GPU length clearance (typically 300mm–340mm) and PSU 12V-2x6 cable support.",
          },
        ],
      };
    }

    // 3. Full PC Build Generator (extracts budget & workload from text if typed, else uses UI controls)
    let activeBudget = budget;
    let activeWorkload = workload;
    let activeBrand = cpuBrand;

    // Detect dollar amount written inside prompt (e.g., "under 1200" or "$900")
    const budgetMatch = query.match(/\$?\b([6-9]\d{2}|[1-4]\d{3})\b/);
    if (budgetMatch) {
      activeBudget = Number(budgetMatch[1]);
      setBudget(Math.min(Math.max(activeBudget, 800), 3500));
    }

    // Detect workload keywords in prompt
    if (
      query.includes("office") ||
      query.includes("work") ||
      query.includes("study")
    ) {
      activeWorkload = "Coding & Dev";
      setWorkload("Coding & Dev");
    } else if (
      query.includes("gaming") ||
      query.includes("game") ||
      query.includes("fps")
    ) {
      activeWorkload = "Gaming";
      setWorkload("Gaming");
    } else if (
      query.includes("3d") ||
      query.includes("render") ||
      query.includes("video") ||
      query.includes("edit")
    ) {
      activeWorkload = "3D & Video";
      setWorkload("3D & Video");
    } else if (
      query.includes("ai") ||
      query.includes("ml") ||
      query.includes("llm")
    ) {
      activeWorkload = "AI & ML";
      setWorkload("AI & ML");
    }

    // Detect CPU brand if specified in text
    if (query.includes("intel")) {
      activeBrand = "Intel";
      setCpuBrand("Intel");
    } else if (query.includes("amd") || query.includes("ryzen")) {
      activeBrand = "AMD";
      setCpuBrand("AMD");
    }

    // Select tier based on activeBudget
    const isOffice = query.includes("office") || activeBudget <= 1050;
    const isMid = activeBudget > 1050 && activeBudget <= 1850;

    if (isOffice) {
      const cpu =
        activeBrand === "AMD"
          ? "AMD Ryzen 5 8600G (6-Core, Radeon 760M)"
          : "Intel Core i5-13400 (10-Core, UHD 730)";
      const mobo =
        activeBrand === "AMD"
          ? "MSI PRO B650M-A Wi-Fi (AM5, DDR5)"
          : "MSI PRO B760M-A Wi-Fi (LGA 1700, DDR5)";
      const gpu =
        activeWorkload === "Gaming"
          ? "AMD Radeon RX 6650 XT 8GB"
          : "Integrated Graphics (Upgradeable PCIe 4.0 x16)";
      const total = activeWorkload === "Gaming" ? 890 : 740;

      return {
        type: "build",
        title: `${activeWorkload === "Gaming" ? "Entry Gaming" : "Silent Office & Productivity"} Blueprint`,
        badge: `EST. TOTAL: $${total} • 450W–550W PSU`,
        notes:
          rawPrompt.trim() ||
          `Optimized ${activeBrand} configuration within your $${activeBudget} target.`,
        parts: [
          { role: "Processor (CPU)", name: cpu },
          { role: "Motherboard", name: mobo },
          { role: "Graphics (GPU)", name: gpu },
          {
            role: "Memory (RAM)",
            name: "32GB (2x16GB) DDR5-5600 CL36 Dual-Channel",
          },
          {
            role: "NVMe Storage",
            name: "1TB PCIe 4.0 NVMe M.2 SSD (5,000 MB/s)",
          },
          {
            role: "Power Supply",
            name: "Corsair CX650 650W 80+ Bronze Certified",
          },
        ],
      };
    }

    if (isMid) {
      const cpu =
        activeBrand === "AMD"
          ? "AMD Ryzen 7 7800X3D (8-Core 3D V-Cache)"
          : "Intel Core i5-14600K (14-Core / 20-Thread)";
      const mobo =
        activeBrand === "AMD"
          ? "MSI B650 Tomahawk Wi-Fi (AM5)"
          : "ASUS TUF Gaming B760-Plus Wi-Fi (LGA 1700)";
      const gpu =
        activeWorkload === "AI & ML" || activeWorkload === "3D & Video"
          ? "NVIDIA GeForce RTX 4070 Super 12GB (CUDA / Tensor)"
          : "NVIDIA GeForce RTX 4070 12GB GDDR6X";
      const total = Math.min(activeBudget, 1480);

      return {
        type: "build",
        title: `Performance ${activeWorkload} Rig (${activeBrand})`,
        badge: `EST. TOTAL: $${total} • 750W ATX 3.1`,
        notes:
          rawPrompt.trim() ||
          `Zero-bottleneck 1440p & creator setup calibrated under $${activeBudget}.`,
        parts: [
          { role: "Processor (CPU)", name: cpu },
          { role: "Motherboard", name: mobo },
          { role: "Graphics (GPU)", name: gpu },
          {
            role: "Memory (RAM)",
            name: "32GB (2x16GB) DDR5-6000 CL30 EXPO/XMP",
          },
          {
            role: "NVMe Storage",
            name: "2TB PCIe 4.0 NVMe Gen4 SSD (7,300 MB/s)",
          },
          {
            role: "Power Supply",
            name: "MSI MAG A750GL 750W 80+ Gold ATX 3.1",
          },
        ],
      };
    }

    // High-end Enthusiast Tier ($1900+)
    const cpu =
      activeBrand === "AMD"
        ? "AMD Ryzen 9 7950X3D (16-Core Flagship)"
        : "Intel Core i7-14700K (20-Core / 28-Thread)";
    const mobo =
      activeBrand === "AMD"
        ? "ASUS ROG Strix X670E-E Gaming Wi-Fi"
        : "MSI MAG Z790 Tomahawk Wi-Fi";
    const gpu = "NVIDIA GeForce RTX 4080 Super 16GB GDDR6X";
    const total = Math.min(activeBudget, 2490);

    return {
      type: "build",
      title: `Enthusiast ${activeWorkload} Workstation (${activeBrand})`,
      badge: `EST. TOTAL: $${total} • 850W GOLD ATX 3.1`,
      notes:
        rawPrompt.trim() ||
        `Maximum throughput build engineered for 4K rendering, AI inference, and high-FPS gaming.`,
      parts: [
        { role: "Processor (CPU)", name: cpu },
        { role: "Motherboard", name: mobo },
        { role: "Graphics (GPU)", name: gpu },
        {
          role: "Memory (RAM)",
          name: "64GB (2x32GB) DDR5-6000 CL30 Dual-Channel",
        },
        { role: "NVMe Storage", name: "2TB Samsung 990 PRO PCIe 4.0 NVMe SSD" },
        { role: "Power Supply", name: "Corsair RM850e 850W 80+ Gold ATX 3.1" },
      ],
    };
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    const result = analyzeRequest(promptText);
    setAiResult(result);
  };

  return (
    <div className="advisorPage">
      {/* Header Section */}
      <section className="advisorHeader">
        <span className="sectionTag">INTELLIGENT HARDWARE ENGINE</span>
        <h1>
          AI PC Build &{" "}
          <span className="blueHighlight">Compatibility Advisor</span>
        </h1>
        <p>
          Ask any hardware compatibility question or describe your dream build
          in plain English—or use the controls below to generate a verified
          parts list.
        </p>
      </section>

      <section className="advisorContainer">
        <form className="advisorForm" onSubmit={handleGenerate}>
          {/* Natural Language AI Prompt Box (Fixed non-resizable) */}
          <div className="formGroup">
            <label htmlFor="aiPrompt">
              Ask Digitly TC AI or Describe Your Build
            </label>
            <textarea
              id="aiPrompt"
              rows="3"
              className="promptInput"
              placeholder="e.g., Build me an office build under $900, gaming build under $1200, what is the best GPU for B650, or what motherboards take Intel 13th gen..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
            />

            {/* Clickable Sample Prompt Chips */}
            <div className="sampleChips">
              {samplePrompts.map((sample) => (
                <button
                  type="button"
                  key={sample}
                  className="chipBtn"
                  onClick={() => {
                    setPromptText(sample);
                    setAiResult(analyzeRequest(sample));
                  }}
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Slider */}
          <div className="formGroup">
            <div className="labelRow">
              <label htmlFor="budgetRange">Target Budget (USD)</label>
              <span className="budgetBadge">${budget}</span>
            </div>
            <input
              id="budgetRange"
              type="range"
              min="800"
              max="3500"
              step="100"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="budgetSlider"
            />
            <div className="rangeTicks">
              <span>$800 (Office / Entry)</span>
              <span>$2,000 (Pro)</span>
              <span>$3,500 (Enthusiast)</span>
            </div>
          </div>

          {/* Workload Pills */}
          <div className="formGroup">
            <label>Primary Workload</label>
            <div className="pillGrid">
              {["Gaming", "3D & Video", "AI & ML", "Coding & Dev"].map(
                (item) => (
                  <button
                    type="button"
                    key={item}
                    className={
                      workload === item ? "choiceBtn activeChoice" : "choiceBtn"
                    }
                    onClick={() => setWorkload(item)}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* CPU Platform Preference */}
          <div className="formGroup">
            <label>CPU Platform Preference</label>
            <div className="pillGrid twoCol">
              {["AMD", "Intel"].map((brand) => (
                <button
                  type="button"
                  key={brand}
                  className={
                    cpuBrand === brand ? "choiceBtn activeChoice" : "choiceBtn"
                  }
                  onClick={() => setCpuBrand(brand)}
                >
                  {brand} Architecture
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="generateBtn">
            <AutoAwesomeIcon style={{ fontSize: 20 }} />
            Ask AI / Generate Blueprint
          </button>
        </form>

        {/* Block 2: Dynamic AI Response Card (Renders either a Full Build List OR Compatibility Q&A) */}
        {aiResult && (
          <div className="aiResultCard">
            <div className="resultHeader">
              <div className="resultTitleGroup">
                <BoltIcon style={{ color: "#2563eb", fontSize: 28 }} />
                <h2>{aiResult.title}</h2>
              </div>
              <span className="resultBadge">{aiResult.badge}</span>
            </div>

            {aiResult.type === "build" ? (
              <>
                <p className="resultNotes">{aiResult.notes}</p>
                <div className="partsList">
                  {aiResult.parts.map((part, idx) => (
                    <div className="partRow" key={idx}>
                      <span className="partRole">
                        <MemoryIcon
                          style={{ fontSize: 16, color: "#2563eb" }}
                        />
                        {part.role}
                      </span>
                      <span className="partName">{part.name}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="resultNotes">{aiResult.answer}</p>
                <div className="partsList">
                  {aiResult.recommendations.map((rec, idx) => (
                    <div className="partRow" key={idx}>
                      <span className="partRole">
                        <CheckCircleIcon
                          style={{ fontSize: 16, color: "#2563eb" }}
                        />
                        {rec.label}
                      </span>
                      <span className="partName">{rec.detail}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default AiAdvisor;
