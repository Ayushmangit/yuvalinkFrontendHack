import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome, {user.fullName}</p>
    </div>
  );
};

export default Dashboard;

