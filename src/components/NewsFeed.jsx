import { useEffect, useState } from "react";

export default function NewsFeed({ onViewAll,onDataLoaded }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=(India OR Assam OR Uttarakhand OR Bihar OR Kerala OR Odisha) AND (earthquake OR flood OR cyclone OR landslide)&language=en&sortBy=publishedAt&apiKey=60b5954d65694e3182b0aeffa60036e6"
    )
      .then((res) => res.json())
      .then((data) => {
        const articles = data.articles || [];
        setNews(articles);
        onDataLoaded && onDataLoaded(articles); // 👈 YAHAN MAGIC
        setLoading(false);
            
      })
      .catch((err) => {
        console.error("News API error:", err);
        setLoading(false);
      });
  }, []);

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
                      "
          >
            <h4 className="font-bold text-base mb-3 line-clamp-3">
              {item.title}
            </h4>

            <p className="text-gray-600 text-sm mb-2 line-clamp-3">
              {item.description || "No description available"}
            </p>
             {/* 🔗 MORE INFO LINK */}
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
                className="px-4 py-2 rounded-full
                           bg-gradient-to-r
                           from-blue-600 to-green-700
                           text-white text-sm
                           hover:translate-x-1 transition"
              >
                Activate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
