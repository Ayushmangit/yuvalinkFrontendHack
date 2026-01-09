export default function TeamDetails ({
    teamName = "-",
    category = "-",
    role = "-",
    leaderName = "-",
    leaderContact = "-",
}) {
    return (
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="text-xl font-bold">
                Team Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                <div>
                    <span className="text-gray-500">Team Name</span>
                    <p className="font-medium text-gray-900">{teamName}</p>
                </div>


                <div>
                    <span className="text-gray-500">Team Category</span>
                    <p className="font-medium text-gray-900">{category}</p>
                </div>

                <div>
                    <span className="text-gray-500">Assigned Role</span>
                    <p className="font-medium text-gray-900">{role}</p>
                </div>

                <div>
                    <span className="text-gray-500">Team Leader Contact</span>
                    <p className="font-medium text-gray-900">{leaderName} {leaderContact && `(${leaderContact})`}</p>
                </div>
           
            </div>
        </div>
    )
}