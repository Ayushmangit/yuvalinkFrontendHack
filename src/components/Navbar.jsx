import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <Link to="/" className="text-xl font-bold">YuvaLink</Link>
      <div className="space-x-3">
        {!user ? (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="btn">Dashboard</Link>
            <button onClick={handleLogout} className="btn bg-red-500 px-4 rounded-4xl">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
