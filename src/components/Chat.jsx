export default function Chat({ expanded, onExpand, onClose }) {
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
            className="absolute right-0 text-blue-600
                       hover:scale-110 transition"
          >
            <i className="bi bi-arrows-fullscreen"></i>
          </button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto space-y-3 py-2">
          <div className="max-w-[70%] rounded-xl px-3 py-2 text-sm
                          bg-gray-100 text-gray-800">
            <span className="block text-[11px] opacity-70 mb-1">
              Volunteer
            </span>
            Copy that
          </div>

          <div className="max-w-[70%] rounded-xl px-3 py-2 text-sm
                          bg-blue-600 text-white ml-auto">
            <span className="block text-[11px] opacity-70 mb-1">
              Admin
            </span>
            Team A to Zone A
          </div>
        </div>

        {/* INPUT */}
        <div className="flex gap-2 mt-2">
          <input
            className="flex-1 border rounded-xl px-3 py-2 text-sm
                       focus:outline-none
                       focus:ring-2 focus:ring-blue-500"
            placeholder="Type message..."
          />

          <button className="bg-blue-600 text-white px-3 rounded-xl
                             hover:bg-blue-700 transition">
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
              <div className="max-w-[70%] rounded-xl px-3 py-2 text-sm
                              bg-gray-100 text-gray-800">
                <span className="block text-[11px] opacity-70 mb-1">
                  Volunteer
                </span>
                Understood
              </div>

              <div className="max-w-[70%] rounded-xl px-3 py-2 text-sm
                              bg-blue-600 text-white ml-auto">
                <span className="block text-[11px] opacity-70 mb-1">
                  Admin
                </span>
                Stay alert
              </div>
            </div>

            {/* MODAL INPUT */}
            <div className="flex gap-2 mt-2">
              <input
                className="flex-1 border rounded-xl px-3 py-2 text-sm
                           focus:outline-none
                           focus:ring-2 focus:ring-blue-500"
                placeholder="Type message..."
              />

              <button className="bg-blue-600 text-white px-3 rounded-xl
                                 hover:bg-blue-700 transition">
                <i className="bi bi-send-fill"></i>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
