"use client";

import { motion } from "framer-motion";
import { LogOut, LayoutDashboard } from "lucide-react";

export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#060608]/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Brand/Logo Area */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)] group-hover:rotate-12 transition-transform duration-300">
              <LayoutDashboard className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-white">
              FIN<span className="text-indigo-500">TECH</span>
            </h1>
          </div>
        </div>

        {/* Actions Area */}
        <div className="flex gap-6 items-center">
          {/* Integrated AddForm */}
          

          <div className="flex items-center gap-4">
            {/* Logout - Transformed from bulky button to elegant action */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-xl border border-red-500/20 transition-all duration-300 group"
            >
              <span className="text-xs font-bold uppercase tracking-wider hidden md:inline">Exit</span>
              <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}