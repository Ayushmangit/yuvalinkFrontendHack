export default function ProfileStrip({
    role = "Volunteer",
    name = "-",
    verified = false,
    tier = "-",
    status = "unavailable",
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
                <div>
                    <p className="text-sm text-gray-500">{role}</p>
                    <p className="text-lg font-semibold text-gray-900">{name}</p>
                </div>

                <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full
                    ${verified
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    {verified ? "Verified" : "Unverified"}
                </span>

                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {tier}
                </span>
            </div>

            <div>
                <span
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full
                    ${status === "Available"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                >
                    {status}
                </span>
            </div>
        </div>
    );

}
