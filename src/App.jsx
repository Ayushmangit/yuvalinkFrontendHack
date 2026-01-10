import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import VolunteerDashboard from "./context/VolunteerDashboard";
import AdminDashboard from "./context/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/volunteer" element={<VolunteerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Single dashboard route */}
        <Route path="/dashboard" element={<ProtectedRoute />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;
