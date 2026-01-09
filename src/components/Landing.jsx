import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0F1F2E] text-white">

      {/* HERO */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{
          backgroundImage: "url('/d1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Yuva<span className="text-[#1F3347]-400">Link</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Real-time disaster monitoring, volunteer coordination & incident chat
            — all in one platform.
          </p>

          <div className="flex justify-center gap-4">
          {/* Login */}
          <Link
            to="/login"
            className="bg-[#1F3347] hover:bg-[#274a6d] px-6 py-3 rounded-xl font-semibold transition"
          >
            Login
          </Link>

          {/* Register */}
          <Link
            to="/register"
            className="bg-white/10 border border-white/30 px-6 py-3 rounded-xl font-semibold
                      hover:bg-white/20 transition"
          >
            Register
          </Link>
        </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-[#13293D]">
        <h2 className="text-4xl font-bold text-center mb-12">
          Platform Capabilities
        </h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "bi-newspaper",
              title: "Live Disaster Feed",
              desc: "India-focused real-time disaster news",
            },
            {
              icon: "bi-people-fill",
              title: "Volunteer Dashboard",
              desc: "Assign & manage volunteers instantly",
            },
            {
              icon: "bi-chat-dots-fill",
              title: "Incident Chat",
              desc: "Live coordination during emergencies",
            },
            {
              icon: "bi-bar-chart-fill",
              title: "Incident Analytics",
              desc: "Track response & activity stats",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition"
            >
              <i className={`bi ${f.icon} text-4xl text-blue-400 mb-4`}></i>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-300 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          How YuvaLink Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            "Disaster detected from live news",
            "Admin activates incident",
            "Volunteers receive alerts",
            "Live chat & coordination begins",
          ].map((step, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-xl p-6 text-center border border-white/10"
            >
              <div className="text-blue-400 text-3xl font-bold mb-2">
                {i + 1}
              </div>
              <p className="text-gray-300">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Built for Real Emergencies
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          YuvaLink helps authorities and volunteers act faster when every second
          matters.
        </p>

        <div className="flex justify-center gap-4">
  <Link
    to="/register"
    className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold
               hover:bg-gray-100 transition"
  >
    Join as Volunteer
  </Link>

  <Link
    to="/login"
    className="bg-white/20 text-white px-8 py-3 rounded-xl font-semibold
               hover:bg-white/30 transition"
  >
    Login
  </Link>
</div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B1622] py-10 text-center text-gray-400">
        <div className="flex justify-center gap-6 mb-4">
          <span className="cursor-pointer hover:text-white">Privacy</span>
          <span className="cursor-pointer hover:text-white">Terms</span>
          <span className="cursor-pointer hover:text-white">Contact</span>
        </div>
        <p>© 2025 YuvaLink. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
