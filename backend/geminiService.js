const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); 
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function getChatbotResponse(question) {
    const prompt = `
    You are an expert chatbot for Customer Data Platforms (CDP).
    You must only answer questions related to the following documentation sources:
    - Segment: https://segment.com/docs/?ref=nav
    - mParticle: https://docs.mparticle.com/
    - Lytics: https://docs.lytics.com/
    - Zeotap: https://docs.zeotap.com/home/en-us/

    Do not provide answers to any other topics. 
    
    Answer concisely.

    Question: ${question}
    `;

    try {
        const result = await model.generateContent(prompt);
        let responseText = result.response.text();

        if (!responseText.includes("Segment") && !responseText.includes("mParticle") &&
            !responseText.includes("Lytics") && !responseText.includes("Zeotap")) {
            return "I can only provide answers related to Segment, mParticle, Lytics, or Zeotap.";
        }

        responseText = responseText.split(" ").slice(0, 100).join(" ") + "..."; 

        return responseText;
    } catch (error) {
        console.error("Error fetching response:", error);
        return "I am unable to fetch the information right now.";
    }
}

module.exports = { getChatbotResponse };
