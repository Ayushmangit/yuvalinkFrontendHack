import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";
export default function User({ isOpen, onClose }) {

  const { user } = useAuth()
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm
                    z-[999] flex items-center justify-center">

      <div className="w-[400px] bg-white rounded-2xl p-6 shadow-2xl relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* PROFILE INFO */}

        <div className="flex flex-col items-center gap-4">

          <div className="w-24 h-24 rounded-full bg-[#1F3347]
                          flex items-center justify-center
                          text-white text-3xl font-bold">
            A
          </div>

          <h3 className="text-xl font-bold">{user.fullName} </h3>
          <p className="text-gray-500 text-sm">{user.email}</p>

          <div className="w-full border-t pt-4 space-y-2 text-sm">
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Location:</strong> India</p>
            <p><strong>Status:</strong> {user.status}</p>
          </div>
          <LogoutButton />

        </div>
      </div>
    </div >
  );
}

