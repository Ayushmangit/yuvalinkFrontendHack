export default function TaskCard ({
    title,
    status,
    incident,
    supervisor,
    startTime,
    onAccept,
    onDecline,
    declineDisabled,
}) {
    return (
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">

            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{title}</h3>
                <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        status === "Pending"
                        ? "bg-yellow-100 text-yellow-700" : status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                >
                    {status}
                </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
                <div><span className="font-medium">Incident:</span>{incident}</div>
                <div><span className="font-medium">Supervisor:</span>{supervisor}</div>
                <div><span className="font-medium">Start Time:</span>{startTime}</div>
            </div>

            {status === "Pending" && (
                <div className="flex gap-3 pt-3">
                    <button
                        onClick={onAccept}
                        className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700">
                            Accept
                    </button>

                    <button
                        onClick={onDecline}
                        disabled={declineDisabled}
                        className={`px-4 py-2 rounded-lg text-sm ${ 
                            declineDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" :
                            "bg-red-500 text-white hover:bg-red-600"
                        }`}
                    >
                        Decline
                    </button>
                </div>
            )}
        </div>
    );

}