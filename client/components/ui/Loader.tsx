"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-20 space-y-6">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-16 h-16 bg-indigo-500 rounded-full blur-2xl"
        />

        {/* The Kinetic Spinner */}
        <svg className="w-12 h-12 rotate-[-90deg]">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-white/5"
          />
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            stroke="url(#loader-gradient)"
            strokeWidth="3"
            strokeDasharray="100"
            strokeLinecap="round"
            fill="transparent"
            initial={{ strokeDashoffset: 100 }}
            animate={{ 
              strokeDashoffset: [100, 0, -100],
              rotate: [0, 360]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Synchronizing Text */}
      <div className="flex flex-col items-center gap-1">
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400"
        >
          Synchronizing
        </motion.span>
        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
          Securing Ledger Link
        </span>
      </div>
    </div>
  );
}