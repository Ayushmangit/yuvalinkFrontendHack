export default function ActivityHistory ({activities = [] }) {
    return (
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-bold">
                Activity History
            </h2>

            {activities.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No activity recorded yet
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="text-left text-gray-500 border-b">
                                <th className="py-2">Date</th>
                                <th className="py-2">Incident</th>
                                <th className="py-2">Task</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Feedback</th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            {activities.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b last:border-b-0"
                                >
                                    <td className="py-2">{item.date}</td>
                                    <td className="py-2">{item.incident}</td>
                                    <td className="py-2">{item.task}</td>

                                    <td className="py-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                item.status === "Completed" ? 
                                                "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="py-2 text-gray-600">
                                        {item.feedback}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            
            )}
        </div>
    );
}