import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import VolunteerDashboard from "./context/VolunteerDashboard";
import AdminDashboard from "./context/AdminDashboard";

import OnboardingLayout from "./components/onboarding/OnboardingLayout";
import StepBasicInfo from "./components/onboarding/StepBasicInfo";
import StepExperience from "./components/onboarding/StepExperience";
import StepVerification from "./components/onboarding/StepVerification";
import VerificationPending from "./components/onboarding/VerificationPending";



function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/onboarding" element={<OnboardingLayout />}>
          <Route index element={<StepBasicInfo />} />
          <Route path="experience" element={<StepExperience />} />
          <Route path="verify" element={<StepVerification />} />
          <Route path="pending" element={<VerificationPending />} />
        </Route>

        <Route path="/volunteer" element={<VolunteerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />


        {/* Single dashboard route */}
        <Route path="/dashboard" element={<ProtectedRoute />} />
      </Routes>
    </AuthProvider>
          {/* Single dashboard route */}
          <Route path="/dashboard" element={<ProtectedRoute />} />
          
        </Routes>
      </AuthProvider>

  )
}

export default App;
