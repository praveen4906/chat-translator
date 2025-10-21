import React from 'react';
import { useState } from "react";
import { Sun, Moon, Copy, Sparkles } from "lucide-react";

function Eng() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  async function enhanceText(type) {
    if (!inputText) return;
    setLoading(true);
    setOutputText("Generating...");

    let prompt = "";

    switch (type) {
      case "grammar":
        prompt = `
You are a grammar assistant. Correct the grammar, punctuation, and spelling of this chat message without changing the meaning.
Do not add unnecessary periods if not present in the original message.
Output only the corrected text.
Text: "${inputText}"
`;
        break;
      case "funnier":
        prompt = `
You are a humorous chat assistant. Rewrite the following message to make it funnier and more playful without changing the core meaning. Keep it casual and chat-friendly.
Output only the enhanced text.
Text: "${inputText}"
`;
        break;
      case "polite":
        prompt = `
You are a professional communication assistant. Rewrite this message to be more polite and formal while maintaining the original meaning. Make it suitable for professional or business contexts.
Output only the enhanced text.
Text: "${inputText}"
`;
        break;
      case "concise":
        prompt = `
You are a concise communication expert. Summarize this text to be shorter and more chat-friendly while keeping the essential message.
Output only the concise version.
Text: "${inputText}"
`;
        break;
      case "emotive":
        prompt = `
You are an expressive chat assistant. Add fun, expressive words and appropriate emojis to make the chat more lively and emotional without changing the core meaning.
Output only the enhanced text.
Text: "${inputText}"
`;
        break;
      case "sarcastic":
        prompt = `
You are a witty chat assistant. Rewrite this in a playful, sarcastic tone that's humorous but not offensive. Keep it light-hearted.
Output only the enhanced text.
Text: "${inputText}"
`;
        break;
      case "casual":
        prompt = `
You are a casual chat expert. Turn this text into casual, slang-friendly chat language. Use abbreviations and casual expressions naturally.
Output only the casualified text.
Text: "${inputText}"
`;
        break;
      case "poetic":
        prompt = `
You are a creative writer. Rewrite this message in a poetic, artistic style while keeping the core message. Make it beautiful and expressive.
Output only the poetic version.
Text: "${inputText}"
`;
        break;
      case "friendly":
        prompt = `
You are a friendly communication assistant. Make this text warmer, friendlier, and more approachable while maintaining the message.
Output only the friendly version.
Text: "${inputText}"
`;
        break;
      case "random":
        const effects = ["funnier", "emotive", "casual", "friendly"];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        prompt = `
You are a creative chat assistant. Apply ${randomEffect} style to this message. Make it engaging and fun.
Output only the enhanced text.
Text: "${inputText}"
`;
        break;
      default:
        prompt = inputText;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      const data = await response.json();
      setOutputText(data.candidates[0].content.parts[0].text.trim());
    } catch (error) {
      console.error(error);
      setOutputText("Error generating enhanced text.");
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function resetText() {
    setOutputText("");
  }

  const enhancementButtons = [
    { type: "grammar", label: "Fix Grammar", color: "blue" },
    { type: "funnier", label: "Make Funnier", color: "yellow" },
    { type: "polite", label: "Make Polite", color: "purple" },
    { type: "concise", label: "Make Concise", color: "green" },
    { type: "emotive", label: "Add Emojis", color: "pink" },
    { type: "sarcastic", label: "Sarcastic", color: "orange" },
    { type: "casual", label: "Casualify", color: "cyan" },
    { type: "poetic", label: "Poetic", color: "indigo" },
    { type: "friendly", label: "Friendlier", color: "teal" },
    { type: "random", label: "✨ Surprise Me", color: "gradient" }
  ];

  const getButtonColor = (color) => {
    const colors = {
      blue: darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600",
      yellow: darkMode ? "bg-yellow-600 hover:bg-yellow-700" : "bg-yellow-500 hover:bg-yellow-600",
      purple: darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-500 hover:bg-purple-600",
      green: darkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600",
      pink: darkMode ? "bg-pink-600 hover:bg-pink-700" : "bg-pink-500 hover:bg-pink-600",
      orange: darkMode ? "bg-orange-600 hover:bg-orange-700" : "bg-orange-500 hover:bg-orange-600",
      cyan: darkMode ? "bg-cyan-600 hover:bg-cyan-700" : "bg-cyan-500 hover:bg-cyan-600",
      indigo: darkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-500 hover:bg-indigo-600",
      teal: darkMode ? "bg-teal-600 hover:bg-teal-700" : "bg-teal-500 hover:bg-teal-600",
      gradient: darkMode ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div
      className={`min-h-screen transition-all duration-250 ${
        darkMode ? "bg-gray-900" : "bg-linear-to-br from-purple-50 to-pink-50"
      }`}
    >
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-row justify-between items-center w-full mb-8">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg transition-colors duration-250 ${
                darkMode ? "bg-purple-600" : "bg-purple-500"
              }`}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Chat Enhancer
            </h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-all duration-250 ${
              darkMode
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
            } cursor-pointer`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Section */}
          <div
            className={`rounded-xl p-6 shadow-lg transition-colors duration-250 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Original Text
            </h2>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={12}
              placeholder="Enter text..."
              className={`w-full rounded-lg border-2 p-4 resize-none focus:outline-none focus:ring-2 transition-all duration-250 ${
                darkMode
                  ? "bg-gray-900 text-gray-100 border-gray-700 focus:border-purple-500 focus:ring-purple-500/50 placeholder-gray-500"
                  : "bg-gray-50 text-gray-900 border-gray-200 focus:border-purple-500 focus:ring-purple-500/50 placeholder-gray-400"
              }`}
            />

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {inputText.length} characters
              </span>
              {inputText && (
                <button
                  onClick={() => setInputText("")}
                  className={`text-sm px-3 py-1 rounded-lg transition-all duration-250 ${
                    darkMode
                      ? "text-gray-400 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Output Section */}
          <div
            className={`rounded-xl p-6 shadow-lg transition-colors duration-250 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Enhanced Text
            </h2>

            <div className="relative">
              <textarea
                readOnly
                value={outputText}
                rows={12}
                placeholder="Enhanced text..."
                className={`w-full rounded-lg border-2 p-4 resize-none ${
                  darkMode
                    ? "bg-gray-900 text-gray-100 border-gray-700 placeholder-gray-500"
                    : "bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400"
                }`}
              />
              {outputText && outputText !== "Generating..." && (
                <button
                  onClick={() => copyToClipboard(outputText)}
                  className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-250 cursor-pointer ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                      : "bg-white hover:bg-gray-100 text-gray-600 shadow-sm"
                  }`}
                  aria-label="Copy enhanced text"
                >
                  <Copy className="w-4 h-4" />
                </button>
              )}
              {copied && (
                <span
                  className={`absolute top-3 right-14 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-250 ${
                    darkMode ? "bg-green-600 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  Copied!
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {outputText && outputText !== "Generating..." ? `${outputText.length} characters` : ""}
              </span>
              {outputText && outputText !== "Generating..." && (
                <button
                  onClick={resetText}
                  className={`text-sm px-3 py-1 rounded-lg transition-all duration-250 ${
                    darkMode
                      ? "text-gray-400 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Enhancement Buttons */}
        <div
          className={`mt-8 rounded-xl p-6 shadow-lg transition-colors duration-250 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Enhancement Options
          </h3>

          <div className="flex flex-wrap gap-3">
            {enhancementButtons.map((btn) => (
              <button
                key={btn.type}
                onClick={() => enhanceText(btn.type)}
                disabled={!inputText || loading}
                className={`px-4 py-2 rounded-lg font-medium text-white transition-all duration-250 cursor-pointer ${getButtonColor(
                  btn.color
                )} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {loading && (
            <div className="mt-4 flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Enhancing your text...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Eng;