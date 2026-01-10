import { useEffect, useState } from "react";

export default function PendingRequestsTable() {
  /* ================= STATES ================= */
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const [skill, setSkill] = useState("All");

  /* ================= API / DUMMY DATA ================= */
  useEffect(() => {
    // 🔹 ABHI DUMMY DATA (user-filled forms)
    const dummyData = [
      {
        id: "R001",
        name: "Suresh Kumar",
        email: "suresh@email.com",
        city: "Delhi",
        skills: "Medical Aid",
        formId: "FORM101",
      },
      {
        id: "R002",
        name: "Anjali Mehta",
        email: "anjali@email.com",
        city: "Mumbai",
        skills: "Logistics",
        formId: "FORM102",
      },
      {
        id: "R003",
        name: "Ravi Singh",
        email: "ravi@email.com",
        city: "Pune",
        skills: "Rescue Operations",
        formId: "FORM103",
      },
      {
        id: "R004",
        name: "Kiran Patel",
        email: "kiran@email.com",
        city: "Bangalore",
        skills: "First Aid",
        formId: "FORM104",
      },
    ];

    setTimeout(() => {
      setRequests(dummyData);
      setLoading(false);
    }, 500);

    /* ================= FUTURE BACKEND =================
    fetch("https://api.yuvalink.com/admin/pending-requests")
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    =================================================== */
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filteredRequests = requests.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase());

    const matchCity = city === "All" || r.city === city;
    const matchSkill = skill === "All" || r.skills === skill;

    return matchSearch && matchCity && matchSkill;
  });

  /* ================= FORM VIEW HANDLER ================= */
  const handleViewForm = (formId) => {
    // 🔹 future: open form modal / navigate
    console.log("Open form:", formId);
  };

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading pending requests...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* SEARCH + FILTERS */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search requests..."
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
              <th className="p-4 text-left text-blue-700">Request ID</th>
              <th className="p-4 text-left text-blue-700">Name</th>
              <th className="p-4 text-left text-blue-700">Email</th>
              <th className="p-4 text-left text-blue-700">City</th>
              <th className="p-4 text-left text-blue-700">Skills</th>
              <th className="p-4 text-left text-blue-700">Form</th>
            </tr>
          </thead>

          <tbody>
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No pending requests found
                </td>
              </tr>
            ) : (
              filteredRequests.map((r) => (
                <tr key={r.id} className="border-b last:border-none">
                  <td className="p-4">{r.id}</td>
                  <td className="p-4">{r.name}</td>
                  <td className="p-4">{r.email}</td>
                  <td className="p-4">{r.city}</td>
                  <td className="p-4">{r.skills}</td>

                  {/* FORM ICON */}
                  <td className="p-4">
                    <button
                      onClick={() => handleViewForm(r.formId)}
                      title="View Submitted Form"
                      className="text-blue-600 hover:scale-110 transition"
                    >
                      <i className="bi bi-file-earmark-text-fill text-lg"></i>
                    </button>
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
