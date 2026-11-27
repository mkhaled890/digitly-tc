import React, { useState } from "react";
import "../styles/AiAdvisor.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MemoryIcon from "@mui/icons-material/Memory";
import BoltIcon from "@mui/icons-material/Bolt";

function AiAdvisor() {
  // Interactive controls + natural language prompt state
  const [promptText, setPromptText] = useState("");
  const [loading, setLoading] = useState(false);

  // Stores the AI response object (either a full PC build blueprint or a hardware compatibility Q&A)
  const [aiResult, setAiResult] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!promptText || !promptText.trim()) return;

    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/ai-advisor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText }),
      });
      const data = await response.json();
      setAiResult(data);
    } catch (err) {
      console.error("AI Advisor fetch failed:", err);
    } finally {
      setLoading(false);
    }
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
          Enter keywords, a budget, or any hardware compatibility question to
          generate a verified custom PC blueprint.
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
          </div>

          <button type="submit" className="generateBtn" disabled={loading}>
            {loading
              ? "Generating Blueprint..."
              : "Ask AI / Generate Blueprint"}
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
                  {aiResult.parts?.map((part, idx) => (
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
                  {aiResult.recommendations?.map((rec, idx) => (
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
