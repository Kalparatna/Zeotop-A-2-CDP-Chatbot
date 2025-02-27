const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { getChatbotResponse } = require("./geminiService");

dotenv.config();
const app = express();

// Allow CORS
app.use(cors({
    origin: ["https://your-frontend-domain.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// API Route
app.post("/api/chat", async (req, res) => {
    const { question } = req.body;
    try {
        const response = await getChatbotResponse(question);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Fix: Use process.env.PORT assigned by Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
