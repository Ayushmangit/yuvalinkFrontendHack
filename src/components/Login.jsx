import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
  <div
    className="min-h-screen flex items-center justify-center px-4"
    style={{
      backgroundImage: "url('/d1.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* overlay */}
    <div className="absolute inset-0 bg-[#0F1F2E]/80 backdrop-blur-sm"></div>

    <form
      onSubmit={handleSubmit}
      className="relative z-10 w-full max-w-md space-y-6
                 rounded-3xl border border-white/20
                 bg-white/10 backdrop-blur-xl
                 p-8 shadow-2xl text-white"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-extrabold">Volunteer Login</h2>
        <p className="mt-2 text-sm text-gray-300">
          Access the YuvaLink platform
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm mb-1 text-gray-200">
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl bg-white/20 border border-white/30
                     px-4 py-2 text-white placeholder-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm mb-1 text-gray-200">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl bg-white/20 border border-white/30
                     px-4 py-2 text-white placeholder-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-3
                   font-semibold text-white
                   transition hover:bg-blue-700"
      >
        Sign In
      </button>

      {/* Footer text */}
      <p className="text-xs text-center text-gray-300">
        Secure access for volunteers & administrators
      </p>
    </form>
  </div>
);

};

export default Login;
