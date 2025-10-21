import React from 'react'
import { useState } from "react";
import { Sun, Moon, Copy, ArrowRight, Languages } from "lucide-react";

function Home() {
    const [inputSend, setInputSend] = useState("");
      const [langSend, setLangSend] = useState("tamil");
      const [outputSend, setOutputSend] = useState("");
      const [loadingSend, setLoadingSend] = useState(false);
    
      const [inputRecv, setInputRecv] = useState("");
      const [langRecv, setLangRecv] = useState("tamil");
      const [outputRecv, setOutputRecv] = useState("");
      const [loadingRecv, setLoadingRecv] = useState(false);
    
      const [darkMode, setDarkMode] = useState(false);
      const [copiedSend, setCopiedSend] = useState(false);
      const [copiedRecv, setCopiedRecv] = useState(false);
    
      const languages = ["tamil", "telugu", "hindi", "kannada"];
    
      async function translateToLang() {
        if (!inputSend) return;
        setLoadingSend(true);
        setOutputSend("Generating...");
    
        const prompt = `
    You are an AI language model that functions exclusively as a chat translator. Your primary directive is to translate English text into ${langSend}, mimicking the natural, informal way the language is used in casual digital conversations.
    
    Code-Switching: Naturally integrate common English words into the sentence. Do not translate these words if they are commonly left in English during casual chat in ${langSend}.
    Native Grammar: The sentence structure, conjunctions, and syntax must follow the grammatical rules of ${langSend}.
    Script: The entire output must be in the English (Latin) script.
    Punctuation: Do NOT add a period at the end if the original text does not have one.
    Output Purity: Output only the translated text.
    
    Text to translate: "${inputSend}"
    `;
    
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
          setOutputSend(data.candidates[0].content.parts[0].text.trim());
        } catch (error) {
          console.error(error);
          setOutputSend("Error generating translation.");
        } finally {
          setLoadingSend(false);
        }
      }
    
      async function translateToEnglish() {
        if (!inputRecv) return;
        setLoadingRecv(true);
        setOutputRecv("Generating...");
    
        const prompt = `
    You are an AI language model that functions exclusively as a chat translator. Your primary directive is to translate ${langRecv} text into English, mimicking how a native speaker would use it casually in chat.
    
    Code-Switching: Retain any English words as-is.
    Script: Entire output must be English (Latin script).
    Punctuation: Do NOT add a period at the end if the original text does not have one.
    Output Purity: Output only the translated text.
    
    Text to translate: "${inputRecv}"
    `;
    
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
          setOutputRecv(data.candidates[0].content.parts[0].text.trim());
        } catch (error) {
          console.error(error);
          setOutputRecv("Error generating translation.");
        } finally {
          setLoadingRecv(false);
        }
      }
    
      function copyToClipboard(text, side) {
        navigator.clipboard.writeText(text);
        if (side === "send") {
          setCopiedSend(true);
          setTimeout(() => setCopiedSend(false), 2000);
        } else {
          setCopiedRecv(true);
          setTimeout(() => setCopiedRecv(false), 2000);
        }
      }

  return (
    <div
      className={`min-h-screen transition-all duration-250 ${
        darkMode ? "bg-gray-900" : "bg-linear-to-br from-blue-50 to-indigo-50"
      }`}
    >
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-row justify-between items-center w-full mb-8">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg transition-colors duration-250 ${
                darkMode ? "bg-indigo-600" : "bg-indigo-500"
              }`}
            >
              <Languages className="w-6 h-6 text-white" />
            </div>
            <h1
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Chat Translator
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

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* English → Target */}
          <div
            className={`rounded-xl p-6 shadow-lg transition-colors duration-250 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <h2
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                English
              </h2>
              <ArrowRight
                className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              />
              <h2
                className={`text-xl font-semibold ${
                  darkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                {langSend.charAt(0).toUpperCase() + langSend.slice(1)}
              </h2>
            </div>

            <textarea
              value={inputSend}
              onChange={(e) => setInputSend(e.target.value)}
              rows={6}
              placeholder="Enter English text..."
              className={`w-full rounded-lg border-2 p-4 resize-none focus:outline-none focus:ring-2 transition-all duration-250 ${
                darkMode
                  ? "bg-gray-900 text-gray-100 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/50 placeholder-gray-500"
                  : "bg-gray-50 text-gray-900 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/50 placeholder-gray-400"
              }`}
            />

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <select
                value={langSend}
                onChange={(e) => setLangSend(e.target.value)}
                className={`flex-1 min-w-[120px] rounded-lg border-2 px-4 py-2 font-medium focus:outline-none focus:ring-2 transition-all duration-250 ${
                  darkMode
                    ? "bg-gray-900 text-gray-100 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/50"
                    : "bg-gray-50 text-gray-900 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/50"
                }`}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
              <button
                onClick={translateToLang}
                disabled={!inputSend || loadingSend}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-250 cursor-pointer ${
                  darkMode
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-700 disabled:text-gray-500"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white disabled:bg-gray-200 disabled:text-gray-400"
                } disabled:cursor-not-allowed`}
              >
                {loadingSend ? "Translating..." : "Translate"}
              </button>
            </div>

            <div className="mt-4 relative">
              <textarea
                readOnly
                value={outputSend}
                rows={6}
                placeholder="Translated text..."
                className={`w-full rounded-lg border-2 p-4 resize-none ${
                  darkMode
                    ? "bg-gray-900 text-gray-100 border-gray-700 placeholder-gray-500"
                    : "bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400"
                }`}
              />
              {outputSend && outputSend !== "Generating..." && (
                <button
                  onClick={() => copyToClipboard(outputSend, "send")}
                  className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-250 cursor-pointer ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                      : "bg-white hover:bg-gray-100 text-gray-600 shadow-sm"
                  }`}
                  aria-label="Copy translation"
                >
                  <Copy className="w-4 h-4" />
                </button>
              )}
              {copiedSend && (
                <span
                  className={`absolute top-3 right-14 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-250 ${
                    darkMode ? "bg-green-600 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  Copied!
                </span>
              )}
            </div>
          </div>

          {/* Target → English */}
          <div
            className={`rounded-xl p-6 shadow-lg transition-colors duration-250 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <h2
                className={`text-xl font-semibold ${
                  darkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                {langRecv.charAt(0).toUpperCase() + langRecv.slice(1)}
              </h2>
              <ArrowRight
                className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              />
              <h2
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                English
              </h2>
            </div>

            <textarea
              value={inputRecv}
              onChange={(e) => setInputRecv(e.target.value)}
              rows={6}
              placeholder="Enter text to translate..."
              className={`w-full rounded-lg border-2 p-4 resize-none focus:outline-none focus:ring-2 transition-all duration-250 ${
                darkMode
                  ? "bg-gray-900 text-gray-100 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/50 placeholder-gray-500"
                  : "bg-gray-50 text-gray-900 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/50 placeholder-gray-400"
              }`}
            />

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <select
                value={langRecv}
                onChange={(e) => setLangRecv(e.target.value)}
                className={`flex-1 min-w-[120px] rounded-lg border-2 px-4 py-2 font-medium focus:outline-none focus:ring-2 transition-all duration-250 ${
                  darkMode
                    ? "bg-gray-900 text-gray-100 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/50"
                    : "bg-gray-50 text-gray-900 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/50"
                }`}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
              <button
                onClick={translateToEnglish}
                disabled={!inputRecv || loadingRecv}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-250 cursor-pointer ${
                  darkMode
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-700 disabled:text-gray-500"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white disabled:bg-gray-200 disabled:text-gray-400"
                } disabled:cursor-not-allowed`}
              >
                {loadingRecv ? "Translating..." : "Translate"}
              </button>
            </div>

            <div className="mt-4 relative">
              <textarea
                readOnly
                value={outputRecv}
                rows={6}
                placeholder="English translation..."
                className={`w-full rounded-lg border-2 p-4 resize-none ${
                  darkMode
                    ? "bg-gray-900 text-gray-100 border-gray-700 placeholder-gray-500"
                    : "bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400"
                }`}
              />
              {outputRecv && outputRecv !== "Generating..." && (
                <button
                  onClick={() => copyToClipboard(outputRecv, "recv")}
                  className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-250 cursor-pointer ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                      : "bg-white hover:bg-gray-100 text-gray-600 shadow-sm"
                  }`}
                  aria-label="Copy translation"
                >
                  <Copy className="w-4 h-4" />
                </button>
              )}
              {copiedRecv && (
                <span
                  className={`absolute top-3 right-14 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-250 ${
                    darkMode ? "bg-green-600 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home