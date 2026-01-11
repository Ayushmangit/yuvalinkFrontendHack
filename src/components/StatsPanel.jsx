import { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import DetailsModal from "../components/DetailsModal";
import TotalVolunteerTable from "../components/Totalvolunteer";
import PendingRequestsTable from "./PendingRequest";
import ActiveIncidentsTable from "./ActiveIncident";
import AssignedVolunteersTable from "./AssignedVolunteers";
export default function StatsPanel() {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const { token } = useAuth();
const [volunteers, setVolunteers] = useState([]);
const [incidents, setIncidents] = useState([]);
const [loadingStats, setLoadingStats] = useState(true);
  const openDetails = (type) => {
    setModalType(type);
    setOpenModal(true);
  };
  useEffect(() => {
  if (!token) return;

  const fetchStats = async () => {
    try {
      setLoadingStats(true);

      const [incidentsRes, volunteersRes] = await Promise.all([
        fetch("http://localhost:3333/incidents", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }),
        fetch("http://localhost:3333/auth/", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }),
      ]);

      const [incidentsData, volunteersData] = await Promise.all([
        incidentsRes.json(),
        volunteersRes.json(),
      ]);

      setIncidents(incidentsData);
      setVolunteers(volunteersData);
    } catch (err) {
      console.error("Stats fetch failed", err);
      setIncidents([]);
      setVolunteers([]);
    } finally {
      setLoadingStats(false);
    }
  };

  fetchStats();
}, [token]);

  return (
    <div className="space-y-6">
      {/* HEADING */}
      <h3 className="text-lg font-bold text-center mb-6 text-gray-800">
        Incident Stats
      </h3>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {/* TOTAL VOLUNTEERS */}
        <div className="relative bg-black rounded-2xl shadow-md p-7 pb-12 w-full max-w-sm">
          <p className="text-sm text-blue-600 font-bold">
            Total Volunteers
          </p>
                <p className="text-xl text-blue-500 font-bold mt-2">
          {loadingStats ? "..." : volunteers.length}
        </p>
          <p
            onClick={() => openDetails("volunteers")}
            className="absolute bottom-4 right-5 text-xs text-blue-400 cursor-pointer hover:text-blue-300 transition"
          >
            View Details →
          </p>
        </div>

        {/* PENDING REQUESTS */}
        <div className="relative bg-black rounded-2xl shadow-md p-7 pb-12 w-full max-w-sm">
          <p className="text-sm text-blue-600 font-bold">
            Pending Requests
          </p>
          <p className="text-xl text-blue-500 font-bold mt-2">
            80
          </p>
          <p
           onClick={() => openDetails("requests")}
          className="absolute bottom-4 right-5 text-xs text-blue-400">
            View Details →
          </p>
        </div>

        {/* ACTIVE INCIDENTS */}
        <div className="relative bg-black rounded-2xl shadow-md p-7 pb-12 w-full max-w-sm">
          <p className="text-sm text-blue-600 font-bold">
            Active Incidents
          </p>
                  <p className="text-xl text-blue-500 font-bold mt-2">
            {loadingStats? "..." : incidents.length}
          </p>
          <p 
          onClick={() => openDetails("incidents")}
          className="absolute bottom-4 right-5 text-xs text-blue-400">
            View Details →
          </p>
        </div>

        {/* ASSIGNED VOLUNTEERS */}
        <div className="relative bg-black rounded-2xl shadow-md p-7 pb-12 w-full max-w-sm">
          <p className="text-sm text-blue-600 font-bold">
            Assigned Volunteers
          </p>
          <p className="text-xl text-blue-500 font-bold mt-2">
            40
          </p>
          <p 
          onClick={() => openDetails("assigned")}
          className="absolute bottom-4 right-5 text-xs text-blue-400">
            View Details →
          </p>
        </div>
      </div>

      {/* ✅ MODAL RENDER */}
     {openModal && (
  <DetailsModal
    title={
      modalType === "volunteers"
        ? "Total Volunteers"
        : modalType === "requests"
        ? "Pending Requests"
        : modalType === "incidents" ?"Active Incidents": 
        modalType === "assigned" ? "Assigned Volunteers" 
        : ""
    }
    onClose={() => setOpenModal(false)}
  >
   {modalType === "volunteers" && (
  <TotalVolunteerTable
    volunteers={volunteers}
    loading={loadingVolunteers}
  />
)}
    {modalType === "requests" && <PendingRequestsTable />}
    {modalType === "incidents" && (
  <ActiveIncidentsTable
    incidents={incidents}
    loading={loadingIncidents}
  />
)}
    {modalType === "assigned" && <AssignedVolunteersTable />}


  </DetailsModal>
)}

    </div>
  );
}
