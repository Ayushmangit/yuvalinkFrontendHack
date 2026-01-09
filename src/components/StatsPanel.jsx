export default function StatsPanel() {
  return (
    <div className="space-y-6">
      {/* HEADING */}
      <h3 className="text-lg font-bold text-center mb-6 text-gray-800">
        Incident Stats
      </h3>

      {/* GRID 1 */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        <div className="bg-black rounded-2xl shadow-md p-7 w-full max-w-sm">
          <p className="text-sm text-blue-600 font-bold">
            Total Volunteers
          </p>
          <p className="text-xl text-blue-500 font-bold mt-2">
            128
          </p>
        </div>

        <div className="bg-black rounded-2xl shadow-md p-7 w-full max-w-sm">
          <p className="text-sm text-blue-600 font-bold">
            Pending Requests
          </p>
          <p className="text-xl text-blue-500 font-bold mt-2">
            80
          </p>
        </div>
      </div>

      {/* GRID 2 */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        <div className="bg-black rounded-2xl shadow-md p-7 w-full max-w-sm">
          <p className="text-sm text-blue-600 font-bold">
            Active Incidents
          </p>
          <p className="text-xl text-blue-500 font-bold mt-2">
            20
          </p>
        </div>

        <div className="bg-black rounded-2xl shadow-md p-7 w-full max-w-sm">
          <p className="text-sm text-blue-600 font-bold">
            Assigned Volunteers
          </p>
          <p className="text-xl text-blue-500 font-bold mt-2">
            40
          </p>
        </div>
      </div>
    </div>
  );
}
