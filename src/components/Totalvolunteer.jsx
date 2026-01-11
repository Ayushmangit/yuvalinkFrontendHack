import { useState } from "react";

export default function TotalVolunteerTable({ volunteers, loading }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const [skill, setSkill] = useState("All");

  const filteredVolunteers = volunteers.filter((v) => {
    const matchSearch =
      v.fullName.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase());

    const matchCity = city === "All" || v.city === city;
    const matchSkill = skill === "All" || v.skills === skill;

    return matchSearch && matchCity && matchSkill;
  });

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
          className="flex-1 border rounded-xl px-4 py-2"
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
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Skills</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredVolunteers.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No volunteers found
                </td>
              </tr>
            ) : (
              filteredVolunteers.map((v) => (
                <tr key={v.id} className="border-b">
                  <td className="p-4">{v.id}</td>
                  <td className="p-4">{v.fullName}</td>
                  <td className="p-4">{v.email}</td>
                  <td className="p-4">{v.city}</td>
                  <td className="p-4">{v.skills}</td>
                  <td className="p-4">{v.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
