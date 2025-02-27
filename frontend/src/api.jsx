import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

export const askQuestion = async (question) => {
    try {
        const response = await axios.post(API_URL, { question });
        return response.data.response;
    } catch (error) {
        return "Error fetching response.";
    }
};
