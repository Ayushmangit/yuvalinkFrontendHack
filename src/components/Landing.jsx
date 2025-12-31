import { useAuth } from "../context/AuthContext";

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      {user ? <p>Logged in as {user.email}</p> : <p>Please login</p>}
    </div>
  );
};

export default Landing;
