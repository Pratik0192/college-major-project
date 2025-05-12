import React, { useState } from 'react'
import Lottie from 'lottie-react'
import chatBot from '../assets/chatBot.json'
import { MessageSquare } from 'lucide-react'

const Chatbot = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I assist you today?' }
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return

    const newMessages = [...messages, { from: 'user', text: input }]
    setMessages(newMessages)
    setInput('')

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Thanks for your message!' }])
    }, 500)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-blue-800 text-white p-3 rounded-full shadow-lg"
      >
        <Lottie animationData={chatBot} className="w-14 lg:w-25" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-blue-200 rounded-lg shadow-xl border flex flex-col justify-between z-50">
          <div className="p-4 border-b text-center items-center font-bold text-blue-800 flex">Chat Support <MessageSquare className='ml-2' /> </div>

          <div className="p-3 h-64 bg-blue-100 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${
                  msg.from === 'user' ? 'chat-end' : 'chat-start'
                }`}
              >
                <div
                  className={`chat-bubble ${
                    msg.from === 'user' ? 'chat-bubble-primary' : 'chat-bubble-accent'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
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
  )
}

export default Chatbot
