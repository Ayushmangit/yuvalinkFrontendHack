import { useEffect, useState } from "react";
import VolunteerSideBar from "../components/VolunteerSideBar";
import DetailsModal from "../components/DetailsModal";
import ProfileStrip from "../components/ProfileStrip";
import DashboardCards from "../components/DashboardCards";
import TasksSection from "../components/TasksSection";
import TeamDetails from "../components/TeamDetails";
import ActivityHistory from "../components/ActivityHistory";
import { useAuth } from "./AuthContext";

export default function VolunteerDashboard() {
  const { user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const [volunteer, setVolunteer] = useState(null);
  const [dashboardStats] = useState({
    verified: true,
    activeTasks: 0,
    tier: "Tier-2",
    status: "Available",
  });

  const [teamDetails] = useState({
    teamName: "Relief Operations Unit - Alpha",
    category: "Medical & Logistics Support",
    role: "Field Coordinator",
    leaderName: "Captain Anil Verma",
    leaderContact: "+91-98765-43210",
  });

  const [activityHistory] = useState([
    {
      date: "2025-12-20",
      incident: "Flood Relief - Kerala",
      task: "Medical Aid Distribution",
      status: "Completed",
      feedback: "Submitted",
    },
    {
      date: "2025-12-15",
      incident: "Fire Response - Mumbai",
      task: "Evacuation Support",
      status: "Completed",
      feedback: "Pending",
    },
  ]);

  useEffect(() => {
    if (user) {
      setVolunteer({
        role: user.role ?? "Volunteer",
        name: user.fullName,
        verified: user.verification,
        tier: user.tier ?? "Tier-2",
        status: user.status ?? "Inactive",
      });
    }
  }, [user]);

  const images = ["/d1.jpg", "/d3.jpg", "/d4.jpg", "/d5.jpg", "/d6.jpg"];
  const [index, setIndex] = useState(0);
  const [activeBg, setActiveBg] = useState(images[0]);

  const next = () => {
    const newIndex = (index + 1) % images.length;
    setIndex(newIndex);
    setActiveBg(images[newIndex]);
  };

  const prev = () => {
    const newIndex = index === 0 ? images.length - 1 : index - 1;
    setIndex(newIndex);
    setActiveBg(images[newIndex]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!volunteer) return null;

  return (
    <>
      {/* BACKGROUND */}
      <div
        className="relative h-screen bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${activeBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>

        <button
          className="fixed top-2 left-2 z-[60] w-[50px] h-[44px] flex items-center justify-center bg-[#1F3347] rounded-xl"
          onClick={() => setSidebarOpen(true)}
        >
          <i className="bi bi-list fs-1 text-white"></i>
        </button>

        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-[#1F3347]/90 px-12 py-6 rounded-2xl">
            <h1 className="text-4xl font-bold text-white">Yuvalink</h1>
          </div>
        </div>
      </div>

      {/* DASHBOARD */}
      <div className="relative bg-[#1F3347] pt-35 pb-32">
        <div className="relative mx-auto -mt-[85vh] w-[72%] bg-white rounded-2xl shadow-2xl p-6">

          {/* CAROUSEL */}
          <div className="relative max-w-[1100px] mx-auto h-[300px] p-8">
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 text-white text-2xl">
              <i className="bi bi-arrow-left"></i>
            </button>

            <img src={images[index]} className="w-full h-full object-contain rounded-[20%]" />

            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 text-white text-2xl">
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>

          <div className="space-y-8 mt-6">
            <ProfileStrip {...volunteer} />
            <DashboardCards {...dashboardStats} />

            <div id="tasks"><TasksSection /></div>
            <div id="team"><TeamDetails {...teamDetails} /></div>
            <div id="history"><ActivityHistory activities={activityHistory} /></div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {["tasks", "team", "history"].includes(activeModal) && (
        <DetailsModal title="" onClose={() => setActiveModal(null)}>
          {activeModal === "tasks" && <TasksSection />}
          {activeModal === "team" && <TeamDetails {...teamDetails} />}
          {activeModal === "history" && <ActivityHistory activities={activityHistory} />}
        </DetailsModal>
      )}

      <VolunteerSideBar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(section) => {
          setSidebarOpen(false);
          if (section === "logout") handleLogout();
          else setActiveModal(section);
        }}
      />
    </>
  );
}
