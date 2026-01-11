import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

export default function TasksSection() {
  const [tasks, setTasks] = useState([]);
  const [declineCount, setDeclineCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:3333/tasks/pending", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await res.json();

        const mappedTasks = data.map((item) => ({
          id: item.incidentId,
          incidentId: item.incidentId,
          title: item.incident,
          status: item.status, // <- Pending or Accepted
          incident: `${item.incident} - ${item.city}`,
          supervisor: "District Control Room",
          startTime: "To be notified",
        }));

        setTasks(mappedTasks);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAccept = async (incidentId) => {
    try {
      await fetch("http://localhost:3333/tasks/pending/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ incidentId }),
      });

      setTasks((prev) =>
        prev.map((task) =>
          task.incidentId === incidentId
            ? { ...task, status: "Accepted" }
            : task
        )
      );
    } catch (err) {
      console.error("Failed to accept task", err);
    }
  };

  const handleDecline = async (incidentId) => {
    if (declineCount >= 3) return;

    try {
      await fetch("http://localhost:3333/tasks/pending/decline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ incidentId }),
      });

      setDeclineCount((prev) => prev + 1);
      setTasks((prev) =>
        prev.filter((task) => task.incidentId !== incidentId)
      );
    } catch (err) {
      console.error("Failed to decline task", err);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading tasks...</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Assigned Tasks / Missions</h2>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">
          No pending tasks available for your city
        </p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onAccept={() => handleAccept(task.incidentId)}
            onDecline={() => handleDecline(task.incidentId)}
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
