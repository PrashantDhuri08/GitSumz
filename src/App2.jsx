import { useState } from "react";
import { API_CONFIG } from "./config";
import React from "react";
import ReactMarkdown from "react-markdown";
import { FaGithub } from "react-icons/fa";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await fetch(API_CONFIG.BASE_URL, {
        method: "POST",
        mode: "no-cors",
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify({
          input_value: repoUrl,
          output_type: "chat",
          input_type: "chat",
          session_id: "user_1",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      const sum = data.message || data.output || "No summary available";
      setSummary(sum);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to generate summary. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-black rounded-full animate-ping opacity-20"></div>
              <div className="relative bg-black rounded-full p-4">
                <FaGithub className="text-white text-4xl" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">GitSumz</h1>
          <p className="text-lg text-gray-600 mb-8">
            Summarize any GitHub repository in seconds
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="repo-url"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                GitHub Repository URL
              </label>
              <input
                type="url"
                id="repo-url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing Repository...
                </span>
              ) : (
                "Generate Summary"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {summary && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Repository Summary
              </h2>
              <div className="bg-gray-50 rounded-md p-6">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>
                    {summary.replace(/```text\n/g, "").replace(/```\n/g, "")}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
