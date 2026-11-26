require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenAI, Type } = require("@google/genai");

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const STORE_CATALOG = `
CPUs: AMD Ryzen 5 7600 (AM5, 65W, $199), AMD Ryzen 7 7800X3D (AM5, 120W, $389), Intel Core i5-14600K (LGA1700, 125W, $299), Intel Core i7-14700K (LGA1700, 190W, $399)
Motherboards: MSI B650 Tomahawk Wi-Fi (AM5, DDR5, $199), ASUS ROG Strix X670E-A (AM5, DDR5, $349), MSI PRO B760M-P DDR4 (LGA1700, DDR4, $109), ASUS TUF Gaming Z790-Plus WiFi (LGA1700, DDR5, $229)
RAM: Corsair Vengeance 32GB DDR5-6000 ($115), G.Skill Trident Z5 Neo 64GB DDR5-6000 ($209), Corsair Vengeance LPX 32GB DDR4-3200 ($68)
GPUs: NVIDIA RTX 4060 8GB (115W, $299), NVIDIA RTX 4070 Super 12GB (220W, $599), AMD RX 7800 XT 16GB (263W, $499), NVIDIA RTX 4080 Super 16GB (320W, $999)
Storage: Samsung 990 PRO 1TB NVMe ($99), WD Black SN850X 2TB NVMe ($159), Crucial T700 2TB PCIe 5.0 NVMe ($249)
PSUs: Corsair RM650 650W ($89), Corsair RM750e 750W ($109), MSI MPG A850G 850W ($139), Corsair RM1000x 1000W ($189)
`;

app.get("/", (req, res) => {
  res.send("Digitly TC AI Server is running!");
});

app.post("/api/ai-advisor", async (req, res) => {
  console.log("Incoming AI Advisor prompt:", req.body.prompt);
  try {
    const { prompt } = req.body;
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: `You are the Digitly TC Hardware & Custom PC AI Advisor.
Users will often enter brief keywords, shorthand, or rough goals (for example: "gaming 1200", "video editing nvidia", "cheap office pc", "ryzen 1440p").
Always interpret any keyword list, budget number, workload, or brand preference as a request to build a complete, 100% socket/RAM/wattage-compatible PC (set type to "build"), selecting parts primarily from the Digitly TC catalog below and filling in sensible defaults for anything not mentioned.
Set badge to "EST. TOTAL: $<total> • <wattage>W PSU" and write a concise summary in notes.
Populate parts with roles: "Processor (CPU)", "Motherboard", "Graphics (GPU)", "Memory (RAM)", "NVMe Storage", and "Power Supply".
Only set type to "qa" if the user explicitly asks a direct hardware question without wanting a build—in that case, set badge to "COMPATIBILITY VERIFIED", put the explanation in answer, and list bullet points in recommendations ({ label, detail }).
Catalog:\n${STORE_CATALOG}`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, enum: ["build", "qa"] },
            title: { type: Type.STRING },
            badge: { type: Type.STRING },
            notes: { type: Type.STRING },
            answer: { type: Type.STRING },
            parts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  role: { type: Type.STRING },
                  name: { type: Type.STRING },
                },
                required: ["role", "name"],
              },
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  detail: { type: Type.STRING },
                },
                required: ["label", "detail"],
              },
            },
          },
          required: ["type", "title", "badge"],
        },
      },
    });

    console.log("Gemini response received!");
    res.json(JSON.parse(response.text));
  } catch (error) {
    console.error("Gemini API Error:", error.message || error);
    res.status(500).json({
      type: "qa",
      title: "AI Engine Error",
      badge: "SERVER DIAGNOSTIC",
      answer: `Gemini API returned an error: ${error.message || "Unknown error"}`,
      recommendations: [],
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Digitly TC AI Server running on http://localhost:${process.env.PORT || 5000}`,
  );
});
