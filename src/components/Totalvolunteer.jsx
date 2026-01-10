import { useEffect, useState } from "react";

export default function TotalVolunteerTable() {
  /* ================= STATES ================= */
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const [skill, setSkill] = useState("All");

  /* ================= API / DUMMY DATA ================= */
  useEffect(() => {
    // 🔹 ABHI DUMMY DATA (backend ready hone pe sirf yaha change hoga)
    const dummyData = [
      {
        id: "V001",
        name: "Rahul Sharma",
        email: "rahul@email.com",
        city: "Mumbai",
        skills: "Medical Aid",
        status: "Active",
        verified: true,
      },
      {
        id: "V002",
        name: "Priya Patel",
        email: "priya@email.com",
        city: "Delhi",
        skills: "Logistics",
        status: "Active",
        verified: false,
      },
      {
        id: "V003",
        name: "Amit Kumar",
        email: "amit@email.com",
        city: "Bangalore",
        skills: "Rescue Operations",
        status: "Inactive",
        verified: false,
      },
      {
        id: "V004",
        name: "Neha Verma",
        email: "neha@email.com",
        city: "Pune",
        skills: "First Aid",
        status: "Active",
        verified: true,
      },
    ];

    // ⏳ fake loading
    setTimeout(() => {
      setVolunteers(dummyData);
      setLoading(false);
    }, 500);

    /* ================= FUTURE BACKEND =================
    fetch("https://api.yuvalink.com/admin/volunteers")
      .then(res => res.json())
      .then(data => {
        setVolunteers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    =================================================== */
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filteredVolunteers = volunteers.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase());

    const matchCity = city === "All" || v.city === city;
    const matchSkill = skill === "All" || v.skills === skill;

    return matchSearch && matchCity && matchSkill;
  });

  /* ================= ACTION HANDLER ================= */
  const handleVerify = (id) => {
    // backend-ready
    console.log("Verify volunteer:", id);

    setVolunteers((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, verified: true } : v
      )
    );
  };

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading volunteers...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* SEARCH + FILTERS */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search volunteers..."
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
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Pune">Pune</option>
        </select>

        <select
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="border rounded-xl px-4 py-2"
        >
          <option value="All">All Skills</option>
          <option value="Medical Aid">Medical Aid</option>
          <option value="Logistics">Logistics</option>
          <option value="Rescue Operations">Rescue Operations</option>
          <option value="First Aid">First Aid</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left text-blue-700">ID</th>
              <th className="p-4 text-left text-blue-700">Name</th>
              <th className="p-4 text-left text-blue-700">Email</th>
              <th className="p-4 text-left text-blue-700">City</th>
              <th className="p-4 text-left text-blue-700">Skills</th>
              <th className="p-4 text-left text-blue-700">Status</th>
              <th className="p-4 text-left text-blue-700">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredVolunteers.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  No volunteers found
                </td>
              </tr>
            ) : (
              filteredVolunteers.map((v) => (
                <tr key={v.id} className="border-b last:border-none">
                  <td className="p-4">{v.id}</td>
                  <td className="p-4">{v.name}</td>
                  <td className="p-4">{v.email}</td>
                  <td className="p-4">{v.city}</td>
                  <td className="p-4">{v.skills}</td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        v.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="p-4">
                    {v.verified ? (
                      <span className="px-3 py-1 rounded-lg text-sm bg-blue-100 text-blue-700">
                        Request Verified
                      </span>
                    ) : (
                      <button
                        onClick={() => handleVerify(v.id)}
                        className="px-3 py-1 rounded-lg text-sm bg-red-100 text-red-700 hover:bg-red-200 transition"
                      >
                        Request Non-Verified
                      </button>
                    )}
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
