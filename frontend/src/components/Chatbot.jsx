import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import chatBot from "../assets/chatBot.json";
import { MessageSquare } from "lucide-react";
import { getBotReply } from "../botReply";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem("chatMessages");
    return stored
      ? JSON.parse(stored)
      : [{ from: "bot", text: "Hi! How can I assist you today?" }];
  });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [botContext, setBotContext] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const { botReply, updatedContext } = getBotReply(input, botContext);
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
      setBotContext(updatedContext);
      setTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-18 lg:bottom-6 right-5.5 lg:right-6 z-10 bg-blue-800 text-white p-0 lg:p-3 rounded-full shadow-lg"
      >
        <Lottie animationData={chatBot} className="w-12 lg:w-25" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-blue-200 rounded-lg shadow-xl border flex flex-col justify-between z-50">
          <div className="p-4 border-b text-center items-center font-bold text-blue-800 flex">
            Chat Support <MessageSquare className="ml-2" />
          </div>

          <div className="p-3 h-64 bg-blue-100 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${
                  msg.from === "user" ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble ${
                    msg.from === "user"
                      ? "chat-bubble-primary"
                      : "chat-bubble-accent"
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                ></div>
              </div>
            ))}

            {typing && (
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-accent animate-pulse">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex p-3 bg-blue-200 border-t gap-2">
            <input
              type="text"
              className="input input-bordered bg-gray-500 input-sm w-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
            />
            <button className="btn btn-sm btn-primary" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
