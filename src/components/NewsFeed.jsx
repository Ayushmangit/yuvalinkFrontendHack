import { useEffect, useState } from "react";
import DetailsModal from "./DetailsModal";
import { useAuth } from "../context/AuthContext";

export default function NewsFeed({ onViewAll, onDataLoaded }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth()
  const [showModal, setShowModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [city, setCity] = useState("");

  // ================= FETCH NEWS =================
  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=(India OR Assam OR Uttarakhand OR Bihar OR Kerala OR Odisha) AND (earthquake OR flood OR cyclone OR landslide)&language=en&sortBy=publishedAt&apiKey=60b5954d65694e3182b0aeffa60036e6"
    )
      .then((res) => res.json())
      .then((data) => {
        const articles = data.articles || [];
        setNews(articles);
        onDataLoaded && onDataLoaded(articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("News API error:", err);
        setLoading(false);
      });
  }, []);

  const handleActivate = async (item) => {

    if (!token) {
      alert("Not authenticated. Please login again.");
      return;
    }

    if (!city || city.trim() === "") {
      alert("City is required!");
      return;
    }

    const payload = {
      name: item.title,
      description: item.description,
      city: city.trim(),
    };

    console.log("PAYLOAD SENDING 👉", payload);

    try {
      const res = await fetch("http://localhost:3333/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("BACKEND RESPONSE 👉", data);

      if (!res.ok) {
        alert(data.message || "Activation failed");
        return;
      }

      setShowModal(false);
      setCity("");
      alert("Incident Activated ✅");
    } catch (err) {
      console.error("ERROR 👉", err);
      alert("Server error");
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-6">
        Loading live disaster feed...
      </p>
    );
  }

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 px-4">
        <h3 className="text-lg font-bold text-gray-800">
          Live Disaster Feed
        </h3>

        <button
          onClick={onViewAll}
          className="bg-[#1F3347] text-white
                     px-4 py-2 rounded-lg text-sm
                     hover:translate-x-1 transition"
        >
          View All
        </button>
      </div>

      {/* FEED ROW */}
      <div className="flex gap-6 overflow-x-auto pb- scrollbar-hide">
        {news.slice(0, 5).map((item, i) => (
          <div
            key={i}
            className="min-w-[260px] max-w-[280px] h-[300px]
                       bg-white rounded-2xl
                       border border-black
                       p-2 shadow-md
                       flex flex-col"
          >
            <h4 className="font-bold text-base mb-3 line-clamp-3">
              {item.title}
            </h4>

            <p className="text-gray-600 text-sm mb-2 line-clamp-3">
              {item.description || "No description available"}
            </p>

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-xs font-semibold
                           hover:underline mb-2 inline-block"
              >
                More info →
              </a>
            )}

            <span className="text-xs text-gray-500 mb-4">
              {item.source?.name} •{" "}
              {new Date(item.publishedAt).toLocaleTimeString()}
            </span>

            <div className="mt-auto flex justify-center">
              <button
                onClick={() => {
                  setSelectedIncident(item);
                  setShowModal(true);
                }}
                className="px-4 py-2 rounded-full
                           bg-gradient-to-r
                           from-blue-600 to-green-700
                           text-white text-sm"
              >
                Activate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {showModal && selectedIncident && (
        <DetailsModal
          title="Activate Incident"
          onClose={() => {
            setShowModal(false);
            setCity("");
          }}
        >
          <div className="space-y-4 text-sm">
            <div>
              <span className="font-semibold">Title:</span>
              <p>{selectedIncident.title}</p>
            </div>

            <div>
              <span className="font-semibold">Description:</span>
              <p>{selectedIncident.description || "N/A"}</p>
            </div>

            <div>
              <span className="font-semibold">Source:</span>
              <p>{selectedIncident.source?.name}</p>
            </div>

            <div>
              <span className="font-semibold">Published:</span>
              <p>
                {new Date(
                  selectedIncident.publishedAt
                ).toLocaleString()}
              </p>
            </div>

            <div className="mt-6">
              <label className="block font-semibold mb-1">
                Enter City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Guwahati"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => handleActivate(selectedIncident)}
                className="px-6 py-2 rounded
                           bg-gradient-to-r from-blue-600 to-green-700
                           text-white"
              >
                Activate Incident
              </button>
            </div>
          </div>
        </DetailsModal>
      )}
    </div>
  );
}
