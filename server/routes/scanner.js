const express = require("express");
const router = express.Router();
const multer = require("multer");
const Groq = require("groq-sdk");
const fs = require("fs");
const path = require("path");
const { protect } = require("../middleware/auth");

const upload = multer({ dest: "uploads/scanner/" });

let _client = null;

function getClient() {
  if (!_client) {
    _client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return _client;
}

// ── Language name map for prompt injection ──────────────────────────
const LANGUAGE_NAMES = {
  en: "English",
  ta: "Tamil (தமிழ்)",
  hi: "Hindi (हिंदी)",
  bn: "Bengali (বাংলা)",
  te: "Telugu (తెలుగు)",
  mr: "Marathi (मराठी)",
};

// ── Category prompt templates ────────────────────────────────────────
// {LANGUAGE} placeholder gets replaced at runtime
const PROMPTS = {
  medicine: `You are a pharmacist. Analyse this medicine image and return JSON only.
IMPORTANT: Write ALL text values (summary, keyPoints, warning, medicine names and uses) in {LANGUAGE}.
{
  "summary": "what this medicine is for in 2 simple sentences",
  "keyPoints": ["how to take it", "common side effects", "when to avoid"],
  "medicines": [{"name": "medicine name", "use": "what it treats"}],
  "warning": "any important warning or empty string"
}`,

  terms: `You are a legal expert. Analyse this terms & conditions document and return JSON only.
IMPORTANT: Write ALL text values (summary, keyPoints, warning) in {LANGUAGE}.
{
  "summary": "what this document is about in simple sentences focus on points",
  "keyPoints": ["most important point 1", "most important point 2", "most important point 3", "most important point 4"],
  "medicines": [],
  "warning": "any concerning clause the user should know about or empty string"
}`,

  report: `You are a doctor. Analyse this medical report image and return JSON only.
IMPORTANT: Write ALL text values (summary, keyPoints, warning) in {LANGUAGE}.
{
  "summary": "what this report shows in simple sentences, in points",
  "keyPoints": ["key finding 1", "key finding 2", "key finding 3"],
  "medicines": [],
  "warning": "any abnormal value or concern or empty string"
}`,

  insurance: `You are an insurance expert. Analyse this insurance document and return JSON only.
IMPORTANT: Write ALL text values (summary, keyPoints, warning) in {LANGUAGE}.
{
  "summary": "what this insurance covers in simple sentences in points",
  "keyPoints": ["coverage point 1", "coverage point 2", "exclusion to note", "claim process"],
  "medicines": [],
  "warning": "any important exclusion or limitation or empty string"
}`,

  bill: `You are a medical billing expert. Analyse this hospital bill and return JSON only.
IMPORTANT: Write ALL text values (summary, keyPoints, warning) in {LANGUAGE}.
{
  "summary": "summary of this bill in 2 simple sentences in points",
  "keyPoints": ["total amount", "major charges", "insurance claimable items"],
  "medicines": [],
  "warning": "any overcharge concern or empty string"
}`,

  other: `Analyse this document image and return JSON only.
IMPORTANT: Write ALL text values (summary, keyPoints, warning) in {LANGUAGE}.
{
  "summary": "what this document is about in simple sentences, in points",
  "keyPoints": ["key point 1", "key point 2", "key point 3"],
  "medicines": [],
  "warning": "any important information or empty string"
}`,
};

// ── Build final prompt with language injected ────────────────────────
function buildPrompt(category, languageCode) {
  const template = PROMPTS[category] || PROMPTS.other;
  const languageName = LANGUAGE_NAMES[languageCode] || "English";
  return template.replace(/\{LANGUAGE\}/g, languageName);
}

// ── Strip <think>...</think> reasoning blocks some Groq models emit ──
function stripThinking(text) {
  // Handles a closed think block
  let cleaned = text.replace(/<think>[\s\S]*?<\/think>/gi, "");
  // Handles a think block that never closed because generation was cut off
  cleaned = cleaned.replace(/<think>[\s\S]*$/gi, "");
  return cleaned.trim();
}

// ── Route ────────────────────────────────────────────────────────────
router.post("/analyse", protect, upload.single("file"), async (req, res) => {
  console.log("==== /analyse HIT ====");
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const category = req.body.category || "other";
    const language = req.body.language || "en"; // ← read language from request
    const prompt = buildPrompt(category, language);

    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString("base64");
    const mimeType = req.file.mimetype || "image/jpeg";

    const completion = await getClient().chat.completions.create({
      model:
        process.env.GROQ_VISION_MODEL ||
        "qwen/qwen3.6-27b",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      temperature: 0.1,
      // Groq's own param name for this; also give the model enough
      // headroom to finish its internal reasoning AND write the JSON.
      max_completion_tokens: 4096,
      // Ask Groq to enforce valid JSON output directly.
      response_format: { type: "json_object" },
    });

    let content = completion.choices[0].message.content?.trim() || "";
    const finishReason = completion.choices[0].finish_reason;

    console.log("RAW MODEL OUTPUT:", content);
    console.log("FINISH REASON:", finishReason);

    if (finishReason === "length") {
      // Model ran out of tokens before finishing — treat as a hard error
      // rather than trying to parse a truncated fragment.
      throw new Error(
        "Model response was truncated (finish_reason=length). Try increasing max_completion_tokens."
      );
    }

    // Some reasoning models still leak <think> blocks into content
    // even with response_format set — strip them defensively.
    content = stripThinking(content);

    // Strip markdown code fences if any
    content = content.replace(/```json\s*/gi, "");
    content = content.replace(/```\s*/gi, "");
    content = content.trim();

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    content = jsonMatch[0];

    const result = JSON.parse(content);

    fs.unlinkSync(req.file.path);

    res.json(result);
  } catch (err) {
    console.error("========== SCANNER ERROR ==========");
    console.dir(err, { depth: null });

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      error: err.message,
      details: err.error || err,
    });
  }
});

module.exports = router;