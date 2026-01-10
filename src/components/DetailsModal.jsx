export default function DetailsModal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      
      {/* WHITE MODAL */}
      <div className="bg-white w-[80%] h-[80%] rounded-3xl p-8 relative shadow-lg">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-xl text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* HEADING */}
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {title}
        </h2>

        {/* TABLE AREA */}
        <div className="overflow-auto h-[calc(100%-120px)]">
          {children}
        </div>

      </div>
    </div>
  );
}
