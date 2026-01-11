import { useState } from "react";

export default function ActiveIncidentsTable({ incidents, loading }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");

  const filteredIncidents = incidents.filter((i) => {
    const name = i.incidentName || i.title || "";
    const incidentCity = i.city || "";

    const matchSearch = name.toLowerCase().includes(search.toLowerCase());
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
      {/* SEARCH */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search incidents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-xl px-4 py-2"
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
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Incident</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Volunteers</th>
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
                <tr key={i.id} className="border-b">
                  <td className="p-4">{i.id}</td>
                  <td className="p-4">{i.name || i.title}</td>
                  <td className="p-4">{i.city}</td>
                  <td className="p-4">{i.assignedVolunteers ?? 0}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
