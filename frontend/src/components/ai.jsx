
import { useState } from "react";
import { bitgodsAI } from "../api/problems.jsx"

const AIChat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            role: "model",
            parts: [{
                text: "hi! i am bitgods ai , how can i help you"
            }]
        }
    ]);



    const handleSubmit = (e) => {
        e.preventDefault();
        const sendHistory = async () => {
            if (!message.trim()) return;

            const newMessage = {
                role: "user",
                parts: [
                    {
                        text: message
                    }
                ]
            }
            const updateHistory = [
                ...messages,
                newMessage
            ]

           //immediately show users message
           setMessages(updateHistory);
        //    clear input
        setMessage("");
            try {
                const response = await bitgodsAI({ history: updateHistory })
                console.log(response);
                const aiMessage = {
                    role: "model",
                    parts: [
                        {
                            text: response.message
                        }
                    ]
                }


               setMessages((prev)=>[
                ...prev,
                aiMessage
               ]);
                
            
            }
            catch (error) {
                console.log(error);
            }
        }
        sendHistory();
    };

    return (
        <div className="flex h-full flex-col bg-[#0b0b0b] text-white">

            {/* Header */}
            <div className="border-b border-gray-800 px-4 py-3">
                <h2 className="font-semibold">BITGODS AI</h2>
                <p className="text-xs text-gray-500">
                    Your coding assistant
                </p>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === "user"
                            ? "justify-end"
                            : "justify-start"
                            }`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${msg.role === "user"
                                ? "bg-[#ff5200] text-white"
                                : "bg-[#181818] text-gray-200"
                                }`}
                        >
                            {msg.parts[0].text}
                        </div>
                    </div>
                ))}

            </div>

            {/* Input */}

            <form
                onSubmit={handleSubmit}
                className="border-t border-gray-800 p-3"
            >
                <div className="flex items-center gap-2">

                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask something..."
                        className="flex-1 rounded-lg border border-gray-700 bg-[#151515] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#ff5200]"
                    />

                    <button
                        type="submit"
                        className="rounded-lg bg-[#ff5200] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e94b00]"
                    >
                        Send
                    </button>

                </div>
            </form>

        </div>
    );
};

export default AIChat;