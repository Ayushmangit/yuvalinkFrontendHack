export default function DashboardCards ({
    verified=  false,
    activeTasks = 0,
    tier = "-",
    status = "Unavailable",
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-green-50 to-white border">
                <p className="text-sm uppercase tracking-wide text-gray-500">
                    Verification
                </p>
                <h2 className="mt-3 text-3xl font-extrabold">
                    {verified ? "Verified" : "Pending"}
                </h2>

                <span
                    className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                        verified ? "bg-green-500" : "bg-yellow-400"}`}
                />
            </div>

            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border">
                <p className="text-sm uppercase tracking-wide text-gray-500">
                    Active Tasks
                </p>
                <h2 className="mt-3 text-4xl font-extrabold text-blue-700">
                    {activeTasks}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    {activeTasks === 0 ? "No current active tasks" : "Tasks in progress"}
                </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border">
                <p className="text-sm uppercase tracking-wide text-gray-500">
                    Volunteer Tier
                </p>
                <h2 className="mt-3 text-3xl font-extrabold text-emerald-700">
                    {tier}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Skill Classification
                </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-100 to-white border">
                <p className="text-sm uppercase tracking-wide text-gray-500">
                    Availability
                </p>
                <h2 className={`mt-3 text-3xl font-extrabold ${
                    status === "Available" ? "text-green-600" : "text-gray-600"
                }`}
                >
                    {status}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    {status === "Available" ? "Accepting tasks" : "Not accepting tasks"}
                </p>
            </div>
        </div>
    );
        
}