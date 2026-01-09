import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminDashboard from "../context/AdminDashboard";
import VolunteerDashboard from "../context/VolunteerDashboard";
const ProtectedRoute = ({ children }) => {
  const { user, role,loading } = useAuth();
  if(!user)
  {
    return <Navigate to="/login" replace />;
  }
  if(role==="volunteer")
  {
    return <AdminDashboard/>

  }
  if(role === "admin")
    {
      return <AdminDashboard/>
    } 
};

export default ProtectedRoute;
