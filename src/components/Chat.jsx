import { useEffect, useState } from "react";

export default function Chat({ expanded, onExpand, onClose }) {
  /* ================= STATES ================= */
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  /* ================= FETCH MESSAGES ================= */
  useEffect(() => {
    // 🔹 ABHI DUMMY DATA
    const dummyMessages = [
      {
        id: 1,
        sender: "Volunteer",
        text: "Copy that",
      },
      {
        id: 2,
        sender: "Admin",
        text: "Team A to Zone A",
      },
    ];

    setMessages(dummyMessages);

    /* ================= FUTURE BACKEND =================
    fetch("https://api.yuvalink.com/incidents/123/chat")
      .then(res => res.json())
      .then(data => setMessages(data));
    =================================================== */
  }, []);

  /* ================= SEND MESSAGE ================= */
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "Admin", // future me auth se aayega
      text: input,
    };

    // UI update
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    /* ================= FUTURE BACKEND =================
    fetch("https://api.yuvalink.com/incidents/123/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    });
    =================================================== */
  };

  /* ================= MESSAGE UI ================= */
  const MessageBubble = ({ msg }) => {
    const isAdmin = msg.sender === "Admin";

    return (
      <div
        className={`max-w-[70%] rounded-xl px-3 py-2 text-sm
          ${isAdmin
            ? "bg-blue-600 text-white ml-auto"
            : "bg-gray-100 text-gray-800"}
        `}
      >
        <span className="block text-[11px] opacity-70 mb-1">
          {msg.sender}
        </span>
        {msg.text}
      </div>
    );
  };

  return (
    <>
      {/* SMALL CHAT CARD */}
      <div className="bg-white rounded-2xl p-4 flex flex-col
                      h-[290px] w-full max-w-[420px]
                      border border-gray-200
                      shadow-[0_10px_30px_rgba(0,0,0,0.12)]">

        {/* HEADER */}
        <div className="flex items-center justify-center relative mb-2">
          <h3 className="text-lg font-bold text-gray-800">
            Incident Chat
          </h3>

          <button
            onClick={onExpand}
            title="Expand chat"
            className="absolute right-0 text-blue-600 hover:scale-110 transition"
          >
            <i className="bi bi-arrows-fullscreen"></i>
          </button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto space-y-3 py-2">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
        </div>

        {/* INPUT */}
        <div className="flex gap-2 mt-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-xl px-3 py-2 text-sm
                       focus:outline-none
                       focus:ring-2 focus:ring-blue-500"
            placeholder="Type message..."
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-3 rounded-xl
                       hover:bg-blue-700 transition"
          >
            <i className="bi bi-send-fill"></i>
          </button>
        </div>
      </div>

      {/* EXPANDED CHAT MODAL */}
      {expanded && (
        <div className="fixed inset-0 bg-black/50
                        flex items-center justify-center
                        z-[9999]">

          <div className="bg-white w-[85%] max-w-5xl h-[85vh]
                          rounded-3xl shadow-2xl
                          flex flex-col p-5">

            {/* MODAL HEADER */}
            <div className="flex items-center justify-center relative mb-3">
              <h3 className="text-lg font-bold text-gray-800">
                Incident Chat
              </h3>

              <button
                onClick={onClose}
                className="absolute right-0 text-xl
                           text-gray-500 hover:text-black transition"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* MODAL MESSAGES */}
            <div className="flex-1 overflow-y-auto space-y-3 py-2">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
            </div>

            {/* MODAL INPUT */}
            <div className="flex gap-2 mt-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border rounded-xl px-3 py-2 text-sm
                           focus:outline-none
                           focus:ring-2 focus:ring-blue-500"
                placeholder="Type message..."
              />

              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-3 rounded-xl
                           hover:bg-blue-700 transition"
              >
                <i className="bi bi-send-fill"></i>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
