import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
     //bhavya
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Single dashboard route */}
          <Route path="/dashboard" element={<ProtectedRoute />} />
        </Routes>
      </AuthProvider>
   
  );
}

export default App;
