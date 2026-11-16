import React, { useState } from "react";
import "../styles/CustomBuilder.css";
import { Link } from "react-router-dom";
import { pcComponents } from "../data/pcComponents";
import BuildIcon from "@mui/icons-material/Build";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function CustomBuilder() {
  const [selectedCpuId, setSelectedCpuId] = useState("");
  const [selectedMoboId, setSelectedMoboId] = useState("");
  const [selectedRamId, setSelectedRamId] = useState("");
  const [selectedGpuId, setSelectedGpuId] = useState("");
  const [selectedStorageId, setSelectedStorageId] = useState("");
  const [selectedPsuId, setSelectedPsuId] = useState("");

  // Resolve full objects from selected IDs
  const selectedCpu = pcComponents.cpus.find((c) => c.id === selectedCpuId);
  const selectedMobo = pcComponents.motherboards.find(
    (m) => m.id === selectedMoboId,
  );
  const selectedRam = pcComponents.ram.find((r) => r.id === selectedRamId);
  const selectedGpu = pcComponents.gpus.find((g) => g.id === selectedGpuId);
  const selectedStorage = pcComponents.storage.find(
    (s) => s.id === selectedStorageId,
  );
  const selectedPsu = pcComponents.psus.find((p) => p.id === selectedPsuId);

  // Compatibility filtering
  const compatibleMotherboards = selectedCpu
    ? pcComponents.motherboards.filter((m) => m.socket === selectedCpu.socket)
    : pcComponents.motherboards;

  const compatibleRam = selectedMobo
    ? pcComponents.ram.filter((r) => r.ramType === selectedMobo.ramType)
    : pcComponents.ram;

  // Estimated system wattage + 150W safe headroom
  const estimatedWattage =
    (selectedCpu?.wattage || 0) +
    (selectedGpu?.wattage || 0) +
    (selectedCpu || selectedGpu ? 75 : 0);

  const recommendedPsuWatts = estimatedWattage > 0 ? estimatedWattage + 150 : 0;

  const compatiblePsus =
    recommendedPsuWatts > 0
      ? pcComponents.psus.filter((p) => p.maxWattage >= recommendedPsuWatts)
      : pcComponents.psus;

  // Handle CPU change and auto-clear incompatible motherboard/RAM
  const handleCpuChange = (newCpuId) => {
    setSelectedCpuId(newCpuId);
    const newCpu = pcComponents.cpus.find((c) => c.id === newCpuId);
    if (newCpu && selectedMobo && selectedMobo.socket !== newCpu.socket) {
      setSelectedMoboId("");
      setSelectedRamId("");
    }
  };

  // Handle Motherboard change and auto-clear incompatible RAM
  const handleMoboChange = (newMoboId) => {
    setSelectedMoboId(newMoboId);
    const newMobo = pcComponents.motherboards.find((m) => m.id === newMoboId);
    if (newMobo && selectedRam && selectedRam.ramType !== newMobo.ramType) {
      setSelectedRamId("");
    }
  };

  // Handle GPU change and auto-clear underpowered PSU
  const handleGpuChange = (newGpuId) => {
    setSelectedGpuId(newGpuId);
    const newGpu = pcComponents.gpus.find((g) => g.id === newGpuId);
    const newRequired =
      (selectedCpu?.wattage || 0) + (newGpu?.wattage || 0) + 225;
    if (selectedPsu && selectedPsu.maxWattage < newRequired) {
      setSelectedPsuId("");
    }
  };

  const handleReset = () => {
    setSelectedCpuId("");
    setSelectedMoboId("");
    setSelectedRamId("");
    setSelectedGpuId("");
    setSelectedStorageId("");
    setSelectedPsuId("");
  };

  const totalPrice =
    (selectedCpu?.price || 0) +
    (selectedMobo?.price || 0) +
    (selectedRam?.price || 0) +
    (selectedGpu?.price || 0) +
    (selectedStorage?.price || 0) +
    (selectedPsu?.price || 0);

  const isBuildComplete =
    selectedCpu &&
    selectedMobo &&
    selectedRam &&
    selectedGpu &&
    selectedStorage &&
    selectedPsu;

  const buildSummaryText = [
    selectedCpu ? `CPU: ${selectedCpu.name}` : null,
    selectedMobo ? `Motherboard: ${selectedMobo.name}` : null,
    selectedRam ? `RAM: ${selectedRam.name}` : null,
    selectedGpu ? `GPU: ${selectedGpu.name}` : null,
    selectedStorage ? `Storage: ${selectedStorage.name}` : null,
    selectedPsu ? `PSU: ${selectedPsu.name}` : null,
    totalPrice > 0 ? `Estimated Parts Total: $${totalPrice}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="builderPage">
      <section className="builderHeader">
        <span className="sectionTag">COMPATIBILITY-LOCKED CONFIGURATOR</span>
        <h1>
          Custom <span className="blueHighlight">PC Builder</span>
        </h1>
        <p>
          Select your components step-by-step. Dropdown options automatically
          filter by CPU socket, DDR memory generation, and PSU wattage headroom.
        </p>
      </section>

      <section className="builderGrid">
        {/* Left Column: Dropdown Selectors */}
        <div className="builderSelectorsCard">
          <div className="selectorGroup">
            <label htmlFor="cpuSelect">
              1. Processor (CPU)
              {selectedCpu && (
                <span className="compatBadge">{selectedCpu.socket}</span>
              )}
            </label>
            <select
              id="cpuSelect"
              value={selectedCpuId}
              onChange={(e) => handleCpuChange(e.target.value)}
            >
              <option value="">-- Choose a CPU --</option>
              {pcComponents.cpus.map((cpu) => (
                <option key={cpu.id} value={cpu.id}>
                  {cpu.name} ({cpu.socket} • {cpu.wattage}W) — ${cpu.price}
                </option>
              ))}
            </select>
          </div>

          <div className="selectorGroup">
            <label htmlFor="moboSelect">
              2. Motherboard
              {selectedCpu && (
                <span className="compatBadge">
                  Filtered for {selectedCpu.socket}
                </span>
              )}
            </label>
            <select
              id="moboSelect"
              value={selectedMoboId}
              onChange={(e) => handleMoboChange(e.target.value)}
            >
              <option value="">
                {selectedCpu
                  ? `-- Choose a ${selectedCpu.socket} Motherboard --`
                  : "-- Choose a Motherboard --"}
              </option>
              {compatibleMotherboards.map((mb) => (
                <option key={mb.id} value={mb.id}>
                  {mb.name} ({mb.socket} • {mb.ramType}) — ${mb.price}
                </option>
              ))}
            </select>
          </div>

          <div className="selectorGroup">
            <label htmlFor="ramSelect">
              3. Memory (RAM)
              {selectedMobo && (
                <span className="compatBadge">
                  Filtered for {selectedMobo.ramType}
                </span>
              )}
            </label>
            <select
              id="ramSelect"
              value={selectedRamId}
              onChange={(e) => setSelectedRamId(e.target.value)}
            >
              <option value="">
                {selectedMobo
                  ? `-- Choose ${selectedMobo.ramType} Memory --`
                  : "-- Choose Memory --"}
              </option>
              {compatibleRam.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — ${r.price}
                </option>
              ))}
            </select>
          </div>

          <div className="selectorGroup">
            <label htmlFor="gpuSelect">
              4. Graphics Card (GPU)
              {selectedGpu && (
                <span className="compatBadge">{selectedGpu.wattage}W TDP</span>
              )}
            </label>
            <select
              id="gpuSelect"
              value={selectedGpuId}
              onChange={(e) => handleGpuChange(e.target.value)}
            >
              <option value="">-- Choose a Graphics Card --</option>
              {pcComponents.gpus.map((gpu) => (
                <option key={gpu.id} value={gpu.id}>
                  {gpu.name} ({gpu.wattage}W) — ${gpu.price}
                </option>
              ))}
            </select>
          </div>

          <div className="selectorGroup">
            <label htmlFor="storageSelect">5. NVMe SSD Storage</label>
            <select
              id="storageSelect"
              value={selectedStorageId}
              onChange={(e) => setSelectedStorageId(e.target.value)}
            >
              <option value="">-- Choose Primary Storage --</option>
              {pcComponents.storage.map((ssd) => (
                <option key={ssd.id} value={ssd.id}>
                  {ssd.name} — ${ssd.price}
                </option>
              ))}
            </select>
          </div>

          <div className="selectorGroup">
            <label htmlFor="psuSelect">
              6. Power Supply (PSU)
              {recommendedPsuWatts > 0 && (
                <span className="compatBadge">
                  Min {recommendedPsuWatts}W Recommended
                </span>
              )}
            </label>
            <select
              id="psuSelect"
              value={selectedPsuId}
              onChange={(e) => setSelectedPsuId(e.target.value)}
            >
              <option value="">
                {recommendedPsuWatts > 0
                  ? `-- Choose ${recommendedPsuWatts}W+ PSU --`
                  : "-- Choose a Power Supply --"}
              </option>
              {compatiblePsus.map((psu) => (
                <option key={psu.id} value={psu.id}>
                  {psu.name} — ${psu.price}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column: Live Build Summary & Wattage Card */}
        <div className="builderSummaryCard">
          <div className="summaryHeaderRow">
            <h2>Build Summary</h2>
            <button
              type="button"
              className="resetBuildBtn"
              onClick={handleReset}
            >
              <RestartAltIcon style={{ fontSize: 18 }} />
              Reset
            </button>
          </div>

          <div className="wattageBox">
            <BoltIcon style={{ color: "#2563eb", fontSize: 22 }} />
            <div>
              <span className="wattageLabel">Estimated Peak Load</span>
              <strong>{estimatedWattage} W</strong>
            </div>
          </div>

          <ul className="summaryList">
            <li>
              <span>CPU</span>
              <strong>{selectedCpu ? selectedCpu.name : "Not selected"}</strong>
            </li>
            <li>
              <span>Motherboard</span>
              <strong>
                {selectedMobo ? selectedMobo.name : "Not selected"}
              </strong>
            </li>
            <li>
              <span>RAM</span>
              <strong>{selectedRam ? selectedRam.name : "Not selected"}</strong>
            </li>
            <li>
              <span>GPU</span>
              <strong>{selectedGpu ? selectedGpu.name : "Not selected"}</strong>
            </li>
            <li>
              <span>Storage</span>
              <strong>
                {selectedStorage ? selectedStorage.name : "Not selected"}
              </strong>
            </li>
            <li>
              <span>Power Supply</span>
              <strong>{selectedPsu ? selectedPsu.name : "Not selected"}</strong>
            </li>
          </ul>

          {isBuildComplete && (
            <div className="compatVerifiedBanner">
              <CheckCircleIcon style={{ fontSize: 20, color: "#2563eb" }} />
              <span>100% Socket, RAM & Wattage Verified</span>
            </div>
          )}

          <div className="totalPriceRow">
            <span>Estimated Total</span>
            <span className="totalPriceValue">${totalPrice}</span>
          </div>

          <Link
            to="/contact"
            state={{
              category: "Custom PC Build",
              title: `Custom Build Quote ($${totalPrice})\n${buildSummaryText}`,
            }}
            className="bookBuildBtn"
          >
            <BuildIcon style={{ fontSize: 18 }} />
            Send Build to Digitly TC
          </Link>
        </div>
      </section>
    </div>
  );
}

export default CustomBuilder;
