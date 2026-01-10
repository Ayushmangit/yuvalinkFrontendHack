import { useEffect, useState } from "react";

export default function AssignedVolunteersTable() {
  /* ================= STATES ================= */
  const [assigned, setAssigned] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");

  /* ================= API / DUMMY DATA ================= */
  useEffect(() => {
    // 🔹 ABHI DUMMY DATA
    const dummyData = [
      {
        id: "V001",
        name: "Rahul Sharma",
        email: "rahul@email.com",
        incident: "Flood in Sector 12",
        city: "Delhi",
      },
      {
        id: "V002",
        name: "Priya Patel",
        email: "priya@email.com",
        incident: "Road Accident",
        city: "Mumbai",
      },
      {
        id: "V003",
        name: "Amit Kumar",
        email: "amit@email.com",
        incident: "Fire Emergency",
        city: "Pune",
      },
      {
        id: "V004",
        name: "Neha Verma",
        email: "neha@email.com",
        incident: "Power Failure",
        city: "Bangalore",
      },
    ];

    setTimeout(() => {
      setAssigned(dummyData);
      setLoading(false);
    }, 500);

    /* ================= FUTURE BACKEND =================
    fetch("https://api.yuvalink.com/admin/assigned-volunteers")
      .then(res => res.json())
      .then(data => {
        setAssigned(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    =================================================== */
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filteredAssigned = assigned.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      v.incident.toLowerCase().includes(search.toLowerCase());

    const matchCity = city === "All" || v.city === city;

    return matchSearch && matchCity;
  });

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading assigned volunteers...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* SEARCH + FILTERS */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search volunteers / incidents..."
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
              <th className="p-4 text-left text-blue-700">Volunteer ID</th>
              <th className="p-4 text-left text-blue-700">Name</th>
              <th className="p-4 text-left text-blue-700">Email</th>
              <th className="p-4 text-left text-blue-700">Incident</th>
              <th className="p-4 text-left text-blue-700">City</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssigned.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No assigned volunteers found
                </td>
              </tr>
            ) : (
              filteredAssigned.map((v) => (
                <tr key={v.id} className="border-b last:border-none">
                  <td className="p-4">{v.id}</td>
                  <td className="p-4">{v.name}</td>
                  <td className="p-4">{v.email}</td>
                  <td className="p-4">{v.incident}</td>
                  <td className="p-4">{v.city}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
