import React, { useState } from "react";
import { products } from "./data/product";

function App() {
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    if (!input.trim()) return alert("Please enter a product description!");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, products }),
      });
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 text-white p-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-3xl transition-all hover:shadow-indigo-500/40 border border-white/20">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            🛍️ AI Product Recommendation System
          </span>
        </h1>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <input
            type="text"
            placeholder="e.g. I want a gaming laptop under $1000"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full sm:w-3/4 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          />
          <button
            onClick={handleRecommend}
            className="relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 font-semibold text-white shadow-lg hover:scale-105 transition-transform duration-300"
          >
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <>
                <span className="relative z-10">Get Recommendations</span>
                <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></span>
              </>
            )}
          </button>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-300">
            Recommended Products
          </h3>

          {loading ? (
            <p className="text-center text-gray-300 animate-pulse">
              Fetching recommendations...
            </p>
          ) : recommendations.length > 0 ? (
            <ul className="grid sm:grid-cols-2 gap-4">
              {recommendations.map((p) => (
                <li
                  key={p.id}
                  className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all shadow-md hover:shadow-indigo-500/20 flex flex-col justify-between"
                >
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {p.name}
                  </h4>
                  <p className="text-indigo-300 font-medium">${p.price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400">
              No recommendations yet. Try describing what you need!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
