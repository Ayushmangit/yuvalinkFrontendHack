import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ActiveIncidentsTable() {
  const { token } = useAuth();

  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");

  useEffect(() => {
    if (!token) return;

    const fetchIncidents = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:3333/incidents", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized or failed request");
        }
        const data = await response.json();
        setIncidents(data);
      } catch (error) {
        console.error("Fetch incidents error:", error);
        setIncidents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, [token]);

  const filteredIncidents = incidents.filter((i) => {
    const name = i.incidentName || i.title || "";
    const incidentCity = i.city || "";

    const matchSearch = name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCity = city === "All" || incidentCity === city;

    return matchSearch && matchCity;
  });

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading active incidents...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* SEARCH + FILTERS */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search incidents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-xl px-4 py-2 outline-none"
        />

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded-xl px-4 py-2"
        >
          <option value="All">All Cities</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Bangalore">Bangalore</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left text-blue-700">Incident ID</th>
              <th className="p-4 text-left text-blue-700">Incident Name</th>
              <th className="p-4 text-left text-blue-700">City</th>
              <th className="p-4 text-left text-blue-700">
                Assigned Volunteers
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredIncidents.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No active incidents found
                </td>
              </tr>
            ) : (
              filteredIncidents.map((i) => (
                <tr key={i.id} className="border-b last:border-none">
                  <td className="p-4">{i.id}</td>
                  <td className="p-4">
                    {i.name || i.title}
                  </td>
                  <td className="p-4">{i.city}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                      {i.assignedVolunteers ?? 0}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
