"use client";

import { useState, useEffect } from "react";
import { Search, Command, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar({ onSearch }: any) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Simulate a quick "searching" state for visual feedback
  const handleTriggerSearch = () => {
    if (!value) return;
    setIsSearching(true);
    onSearch(value);
    setTimeout(() => setIsSearching(false), 600);
  };

  // Keyboard shortcut listener (Cmd+K or Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        const input = document.getElementById("main-search");
        input?.focus();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="relative max-w-xl w-full group">
      {/* Search Bar Glow Effect */}
      <div 
        className={`absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-2xl blur-lg transition-opacity duration-500 ${
          isFocused ? "opacity-100" : "opacity-0"
        }`} 
      />

      <div className={`
        relative flex items-center gap-3 p-1.5 rounded-2xl bg-[#0b0b0d] border transition-all duration-300
        ${isFocused ? "border-cyan-500/50 shadow-2xl" : "border-white/10"}
      `}>
        <div className="pl-3 text-slate-500">
          {isSearching ? (
            <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
          ) : (
            <Search className={`w-5 h-5 transition-colors ${isFocused ? "text-cyan-400" : "text-slate-500"}`} />
          )}
        </div>

        <input
          id="main-search"
          type="text"
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTriggerSearch()}
          placeholder="Search by payee, amount, or tag..."
          className="bg-transparent border-none outline-none text-white placeholder:text-slate-600 text-sm w-full py-2"
        />

        {/* Interaction Indicators */}
        <div className="flex items-center gap-2 pr-2">
          <AnimatePresence>
            {value && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => { setValue(""); onSearch(""); }}
                className="p-1 hover:bg-white/10 rounded-md text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>

          {!isFocused && !value && (
            <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
              <Command className="w-3 h-3 text-slate-500" />
              <span className="text-[10px] font-bold text-slate-500">K</span>
            </div>
          )}

          <button
            onClick={handleTriggerSearch}
            className={`
              px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
              ${value 
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-500" 
                : "bg-white/5 text-slate-600 cursor-not-allowed"}
            `}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}