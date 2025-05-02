import { useState } from "react";
// import { API_CONFIG } from "./config";
// import { TailSpin } from "react-loader-spinner";

import BlurText from "./ui/BText";

import React from "react";
import ReactMarkdown from "react-markdown";
import { FaGithub, FaCopy, FaShare } from "react-icons/fa";
// import Text from "./ui/Text";
import Aurora from "./ui/Aurora";
import "./App.css";
// import LetterGlitch from "./ui/Glitch";
// import ShinyText from "./ui/ShinyText";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSummary("");

    // console.log(url);

    const tdata =
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    try {
      const payload = {
        input_value: repoUrl,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      const response = await fetch("https://gsbackend.onrender.com", options);
      const data = await response.json();

      console.log(data);
      const sum =
        data?.outputs?.[0]?.outputs?.[0]?.artifacts?.message ||
        "No summary available";
      setSummary(sum);

      // console.log(data);

      // const sum = response.outputs[0].outputs[0].artifacts.message;

      // setSummary( "No summary available");
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to generate summary. Please try again later.");
      setSummary(tdata);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "GitSumz Summary",
          text: summary,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(
          `${summary}\n\nShared via GitSumz: ${window.location.href}`
        );
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <>
      <div className="app">
        <Aurora
          colorStops={["#FF0000", "#800080", "#00d8ff"]}
          amplitude={2.0}
          blend={0.6}
        />
        {/* <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        /> */}
        <div className="max-w-3xl mx-auto relative mt-20">
          <div className="text-center flex justify-center flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-black rounded-full animate-ping opacity-20"></div>
                <div className="relative bg-black rounded-full p-4 mt-9">
                  <FaGithub className="text-white text-4xl" />
                </div>
              </div>
            </div>
            {/* <h1 className="text-4xl font-bold text-gray-400 mb-2">GitSumz</h1> */}
            <BlurText
              text="Git Sumz"
              delay={200}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-5xl font-bold font-cartoon text-gray-200 mb-2"
            />
            <p className="text-lg text-gray-600 mb-8">
              Summarize any GitHub repository in seconds
              {/* <ShinyText
                text="Just some shiny text!"
                disabled={false}
                speed={6}
                className="custom-class"
              /> */}
            </p>
          </div>

          <div className="bg-transparent  backdrop-blur-lg rounded-lg shadow-lg p-6 mt-5 ">
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
                  placeholder="https://github.com/username/repository.git"
                  className=" bg-transparent backdrop-blur-xl text-white  w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  /* From Uiverse.io by yohohopizza */
                  <div class="flex flex-row gap-2 justify-center items-center">
                    <div class="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
                    <div class="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
                    <div class="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
                  </div>
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
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-300">
                    Repository Summary
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-2 text-gray-300 hover:text-white transition-colors"
                      title="Copy Summary"
                    >
                      <FaCopy className="text-xl" />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 text-gray-300 hover:text-white transition-colors"
                      title="Share Summary"
                    >
                      <FaShare className="text-xl" />
                    </button>
                  </div>
                </div>
                {copySuccess && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                    Copied!
                  </div>
                )}
                <div className="bg-transparent backdrop-blur-sm rounded-md p-2">
                  <div className="prose prose-sm max-w-none text-white prose-headings:text-white prose-strong:text-gray-600 prose-p:text-white prose-a:text-white prose-code:text-green-300 prose-pre:text-white prose-li:text-white prose-blockquote:text-white">
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
    </>
  );
}

export default App;
