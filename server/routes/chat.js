const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const { v4: uuidv4 } = require("uuid");
const { protect } = require("../middleware/auth");
const ChatSession = require("../models/ChatSession");
const MedicalReport = require("../models/MedicalReport");


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


const SYSTEM_PROMPT = `You are MedBot, a medical AI assistant for MedFriend, an Indian health app.

LANGUAGE DETECTION — THIS IS YOUR MOST IMPORTANT RULE:
- Look at the user's CURRENT message carefully
- If it contains English words and English sentence structure → respond in ENGLISH ONLY
- If it contains Tamil script (அ, ஆ, இ, ஈ, உ, எ, க, ச, த, ப, ம, etc.) → respond in TAMIL ONLY
- If it contains Roman Tamil words (enna, epdi, eppadi, iruku, illa, sapten, vali, udambu, marundhu, romba, seri, venum, mudiyala, pa, da, ma, etc.) → respond in TANGLISH ONLY
- NEVER respond in Tamil if the user wrote in English
- NEVER respond in English if the user wrote in Tamil or Tanglish
- Match the user's language EXACTLY every single time
- If the user's message mixes English and Tanglish, reply in the same mixed style

You help users with:
- Understanding medical reports and test results
- Explaining medicines and their side effects
- General health advice
- Symptoms and when to see a doctor

Remember:
- Reply ONLY to medical and health-related questions.
- If the user asks about non-medical topics, politely state that you can only assist with medical and health-related queries.
- Reply in clear bullet points.
- Focus only on the major points.
- Never prescribe new medicines.
- Encourage consulting a qualified doctor for diagnosis or treatment decisions.
- Be warm, friendly, and supportive.
- Use Indian context for diet advice (idli, dosa, rice, sambar, rasam, dal, chapati, vegetables, fruits, etc.).
- Keep responses concise and easy to understand.
`;

function ensureArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return [value];
  if (typeof value === "object") return Object.values(value).flat();
  return [];
}

router.get("/session/:sessionId", protect, async (req, res) => {
  try {
    const session = await ChatSession.findOne({
      userId: req.user._id,
      sessionId: req.params.sessionId,
    });

    if (!session) return res.json({ messages: [] });

    res.json({ messages: session.messages });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/message", protect, async (req, res) => {
  try {
    const { message, sessionId, language = "en" } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const sid = sessionId || uuidv4();

    let session = await ChatSession.findOne({
      userId: req.user._id,
      sessionId: sid,
    });

    if (!session) {
      session = new ChatSession({
        userId: req.user._id,
        sessionId: sid,
        messages: [],
        language,
      });
    }

    const historyMessages = session.messages.slice(-10).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    let reportContext = "";

    try {
      const reportDoc = await MedicalReport.findOne({
        userId: req.user._id,
      });

      if (reportDoc && reportDoc.data && reportDoc.data.size > 0) {
        const latest = [...reportDoc.data.values()]
          .filter((r) => r.status === "done")
          .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];

        if (latest && latest.extractedData) {
          const diagnosis = ensureArray(latest.extractedData.diagnosis);
          const testResults = latest.extractedData.testResults || [];
          const medicines = latest.extractedData.medicines || [];

          reportContext = `
User's latest report context:
Report: ${latest.reportName || "N/A"}
Diagnosis: ${diagnosis.join(", ") || "N/A"}
Test results: ${
            testResults
              .map((t) => `${t.testName}: ${t.value} ${t.unit} (${t.status})`)
              .join(", ") || "N/A"
          }
Medicines: ${medicines.map((m) => `${m.name} ${m.dosage}`).join(", ") || "N/A"}
`;
        }
      }
    } catch (e) {
      console.error("Report context error:", e.message);
    }

    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT + reportContext },
      ...historyMessages,
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL,
      messages: groqMessages,
      max_tokens: 800,
      top_p: 0.9,
      temperature: 0.7,
    });

    const reply = completion?.choices?.[0]?.message?.content;

    session.messages.push({
      role: "user",
      content: message,
      timestamp: new Date(),
    });

    session.messages.push({
      role: "assistant",
      content: reply,
      timestamp: new Date(),
    });

    session.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await session.save();

    res.json({ reply, sessionId: sid });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({
      message: "AI service error",
      error: err.message,
    });
  }
});

router.delete("/session/:sessionId", protect, async (req, res) => {
  try {
    await ChatSession.deleteOne({
      userId: req.user._id,
      sessionId: req.params.sessionId,
    });

    res.json({ message: "Chat session cleared" });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

module.exports = router;
