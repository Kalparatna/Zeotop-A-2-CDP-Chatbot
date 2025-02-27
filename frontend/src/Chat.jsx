import { useState, useEffect, useRef } from "react";
import { askQuestion } from "./api";
import { Send } from "lucide-react"; 

export default function Chat() {
    const [question, setQuestion] = useState("");
    const [chatHistory, setChatHistory] = useState([]); 
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null); 

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory, loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        const userMessage = { type: "user", text: question };
        setChatHistory((prev) => [...prev, userMessage]); 

        setChatHistory((prev) => [...prev, { type: "bot", text: "typing...", isTyping: true }]);

        const botResponse = await askQuestion(question);

        setChatHistory((prev) => prev.filter((msg) => !msg.isTyping));

        const botMessage = { type: "bot", text: botResponse };
        setChatHistory((prev) => [...prev, botMessage]); 

        setLoading(false);
        setQuestion(""); 
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-[#1e3a8a] to-[#9333ea]">
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-6 flex flex-col h-[80vh] border border-white/20">
                <h2 className="text-3xl font-extrabold text-white mb-4 text-center tracking-wide">💬 Zeotop Chatbot</h2>

                <div className="flex-1 overflow-y-auto p-4 bg-transparent rounded-lg">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} mb-3`}>
                            <div
                                className={`p-3 rounded-2xl shadow-lg max-w-xs text-sm leading-5 transition-all duration-300 ${
                                    msg.type === "user"
                                        ? "bg-blue-500 text-white rounded-br-none"
                                        : "bg-gray-100 text-gray-900 rounded-bl-none"
                                }`}
                            >
                                {msg.isTyping ? (
                                    <div className="flex space-x-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                                    </div>
                                ) : (
                                    msg.text
                                )}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="mt-4 w-full flex items-center space-x-3 bg-white/20 p-3 rounded-2xl border border-white/30 backdrop-blur-md">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-1 bg-transparent outline-none text-white placeholder-gray-300 px-3"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-300"
                        disabled={loading}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
