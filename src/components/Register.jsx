import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await register(fullName, email, password);
    localStorage.setItem("token", data.token);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign up to get started
          </p>
        </div>

        {/* Full Name*/}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            type="text"
            placeholder="full name"
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white
                   transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;

