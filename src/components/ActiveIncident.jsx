import { useEffect, useState } from "react";

export default function ActiveIncidentsTable() {
  /* ================= STATES ================= */
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");

  /* ================= API / DUMMY DATA ================= */
  useEffect(() => {
    // 🔹 ABHI DUMMY DATA
    const dummyData = [
      {
        incidentId: "INC001",
        incidentName: "Flood in Sector 12",
        city: "Delhi",
        assignedVolunteers: 5,
      },
      {
        incidentId: "INC002",
        incidentName: "Road Accident",
        city: "Mumbai",
        assignedVolunteers: 3,
      },
      {
        incidentId: "INC003",
        incidentName: "Fire Emergency",
        city: "Pune",
        assignedVolunteers: 7,
      },
      {
        incidentId: "INC004",
        incidentName: "Power Failure",
        city: "Bangalore",
        assignedVolunteers: 2,
      },
    ];

    setTimeout(() => {
      setIncidents(dummyData);
      setLoading(false);
    }, 500);

    /* ================= FUTURE BACKEND =================
    fetch("https://api.yuvalink.com/admin/active-incidents")
      .then(res => res.json())
      .then(data => {
        setIncidents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    =================================================== */
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filteredIncidents = incidents.filter((i) => {
    const matchSearch = i.incidentName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCity = city === "All" || i.city === city;

    return matchSearch && matchCity;
  });

  /* ================= UI ================= */
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
                <tr
                  key={i.incidentId}
                  className="border-b last:border-none"
                >
                  <td className="p-4">{i.incidentId}</td>
                  <td className="p-4">{i.incidentName}</td>
                  <td className="p-4">{i.city}</td>

                  {/* ASSIGNED COUNT */}
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                      {i.assignedVolunteers}
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
