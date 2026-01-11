export default function VolunteerSideBar ({
    isOpen,
    onClose,
    onNavigate,
}) {
    return (
        <>
            {isOpen && (
                <div 
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 z-[9998]"
                />
            )}

            <div
                className={`fixed top-0 left-0 h-full w-16 z-[9999] p-3
                bg-[#1F3347]
                transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <ul className="flex flex-col items-center gap-8 mt-6 text-white">

                    {/* Home / Dashboard */}
                    <li
                        onClick={() => {
                            onNavigate("dashboard");
                            onClose();
                        }}
                        className="cursor-pointer hover:scale-110 transition"
                    >
                        <i className="bi bi-house-fill text-2xl"></i>
                    </li>

                    {/* Tasks */}
                    <li
                        onClick={() => {
                            onNavigate("tasks");
                            onClose();
                        }}
                        className="cursor-pointer hover:scale-110 transition"
                    >
                        <i className="bi bi-card-checklist text-2xl"></i>
                    </li>

                    {/* Team */}
                    <li
                        onClick={() => {
                            onNavigate("team");
                            onClose();
                        }}
                        className="cursor-pointer hover:scale-110 transition"
                    >
                        <i className="bi bi-people-fill text-2xl"></i>
                    </li>

                    {/* History */}
                    <li
                        onClick={() => {
                            onNavigate("history");
                            onClose();
                        }}
                        className="cursor-pointer hover:scale-110 transition"
                    >
                        <i className="bi bi-clock-history text-2xl"></i>
                    </li>

                    {/* Logout (NO POPUP) */}
                    <li
                        onClick={() => {
                            onNavigate("logout");
                            onClose();
                        }}
                        className="cursor-pointer hover:scale-110 transition mt-auto"
                    >
                        <i className="bi bi-box-arrow-right text-2xl"></i>
                    </li>

                </ul>
            </div>
        </>
    );
}
