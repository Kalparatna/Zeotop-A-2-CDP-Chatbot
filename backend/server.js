const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { getChatbotResponse } = require("./geminiService");

dotenv.config();
const app = express();

// Allow CORS for specific frontend domains (Replace with your frontend URL)
const allowedOrigins = [
    "https://your-frontend-domain.vercel.app",
    "http://localhost:3000"
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.post("/api/chat", async (req, res) => {
    const { question } = req.body;
    try {
        const response = await getChatbotResponse(question);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
