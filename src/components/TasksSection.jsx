import { useState } from "react";
import TaskCard from "./TaskCard";

export default function TasksSection() {
  const [declineCount, setDeclineCount] = useState(0);

  // BACKEND-FRIENDLY INITIAL DATA (can be replaced by API later)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Medical Supply Distribution",
      status: "Pending",
      incident: "Flood Relief - Patna, Bihar",
      supervisor: "District Control Room",
      startTime: "26 Dec 2025, 08:00 AM",
    },
    {
      id: 2,
      title: "Rescue Operations",
      status: "Pending",
      incident: "Landslide - Uttarakhand",
      supervisor: "NDRF Team",
      startTime: "27 Dec 2025, 06:00 AM",
    },
    {
      id: 3,
      title: "Fire Evacuation Support",
      status: "Pending",
      incident: "Fire Response - Mumbai",
      supervisor: "Mumbai Fire Dept",
      startTime: "28 Dec 2025, 06:30 AM",
    },
    {
      id: 4,
      title: "Food & Water Distribution",
      status: "Pending",
      incident: "Cyclone Relief - Odisha",
      supervisor: "State Disaster Response Team",
      startTime: "29 Dec 2025, 09:00 AM",
    },
    {
      id: 5,
      title: "Temporary Shelter Setup",
      status: "Pending",
      incident: "Earthquake Relief - Nepal Border",
      supervisor: "Army Engineering Corps",
      startTime: "30 Dec 2025, 07:00 AM",
    },
  ]);

  const handleAccept = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: "Accepted" } : task
      )
    );
  };

  const handleDecline = (id) => {
    if (declineCount >= 3) return;

    setDeclineCount((prev) => prev + 1);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Assigned Tasks/ Missions</h2>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">
          No active tasks assigned
        </p>
      ) : (
        tasks.map((task) => (
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
