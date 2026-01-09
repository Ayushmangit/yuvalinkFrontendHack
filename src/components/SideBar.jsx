export default function SideBar({
  isOpen,
  onClose,
  onOpenNews,
  onChatClick,
  onProfileClick,
  onSettingsClick

}) {
  return (
    <>
      {/* BACKDROP */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-[9998]"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-16
                    z-[9999] p-3
                    bg-[#1F3347]
                    transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ul className="flex flex-col items-center gap-8 mt-6 text-white">
          
          <li className="cursor-pointer hover:scale-110 transition">
            <i className="bi bi-house-fill text-2xl"></i>
          </li>

          <li
            className="cursor-pointer hover:scale-110 transition"
            onClick={onChatClick}
          >
            <i className="bi bi-chat-left-dots-fill text-2xl"></i>
          </li>

          <li
            className="cursor-pointer hover:scale-110 transition"
            onClick={onOpenNews}
          >
            <i className="bi bi-newspaper text-2xl"></i>
          </li>

          <li className="cursor-pointer hover:scale-110 transition">
            <i className="bi bi-file-bar-graph-fill text-2xl"></i>
          </li>

          <li className="cursor-pointer hover:scale-110 transition"
           onClick={onProfileClick}
          >
            <i className="bi bi-person-fill text-2xl"></i>
          </li>

          <li className="cursor-pointer hover:scale-110 transition mt-auto" onClick={onSettingsClick}>
            <i className="bi bi-gear-fill text-2xl"></i>
          </li>
        </ul>
      </div>
    </>
  );
}
