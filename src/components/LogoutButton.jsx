import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    console.log("logout Called")
    await logout();
    navigate("/Login")
  };
  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-6 py-2 rounded-full
                 bg-gradient-to-r from-blue-600 to-green-700
                 text-white text-sm"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
