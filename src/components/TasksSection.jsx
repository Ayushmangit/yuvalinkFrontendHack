import { useState } from "react";
import TaskCard from "./TaskCard";

export default function TasksSection() {
    const [declineCount, setDeclineCount] = useState(0);
    const [tasks, setTasks] = useState([{
        id: 1,
        title: "Medical Supply Distribution",
        status: "Pending",
        incident: "Flood Relief - Patna, Bihar",
        supervisor: "District Control Room",
        startTime: "26 Dec 2025, 08:00 AM",
    },
]);

const handleAccept = (id) => {
    setTasks(prev =>
        prev.map(task=>
            task.id === id ? {...task, status:"Accepted"} : task
        )
    );
};

const handleDecline = (id) => {
    if (declineCount >=3 ) return;

    setDeclineCount(prev => prev+1);
    setTasks(prev => prev.filter(task => task.id !== id));
};

return (
    <div className="space-y-4">
        <h2 className="text-xl font-bold">Assigned Tasks/ Missions</h2>

        {tasks.length === 0 ? (
            <p className="text-sm text-gray-500">
                No active tasks assigned
            </p>
        ) : (
            tasks.map(task => (
                <TaskCard
                    key={task.id}
                    {...task}
                    onAccept={() => handleAccept(task.id)}
                    onDecline={() => handleDecline(task.id)}
                    declineDisabled={declineCount >= 3}
                />
            ))
        )}

        <p className="text-xs text-red-500">
            You can decline up to 3 tasks. Repeated declines may lead to suspension.
        </p>
    </div>
);
}