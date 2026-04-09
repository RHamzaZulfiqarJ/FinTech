"use client";

import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, CheckCircle2, X } from "lucide-react";

interface AlertProps {
  type?: "error" | "warning" | "success";
  message: string;
  onClose?: () => void;
}

export default function Alert({ type = "error", message, onClose }: AlertProps) {
  const config = {
    error: {
      container: "bg-red-500/5 border-red-500/20 text-red-400",
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      accent: "bg-red-500",
      label: "System Error"
    },
    warning: {
      container: "bg-amber-500/5 border-amber-500/20 text-amber-400",
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      accent: "bg-amber-500",
      label: "Attention Required"
    },
    success: {
      container: "bg-emerald-500/5 border-emerald-500/20 text-emerald-400",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      accent: "bg-emerald-500",
      label: "Action Successful"
    },
  };

  const current = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      layout
      className={`relative group overflow-hidden p-4 rounded-2xl border backdrop-blur-md ${current.container} mb-4 flex items-start gap-4 shadow-2xl`}
    >
      {/* Decorative Side Accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${current.accent} opacity-40`} />
      
      {/* Icon with Pulse Effect */}
      <div className="relative flex-shrink-0 mt-0.5">
        <div className={`absolute inset-0 rounded-full blur-md opacity-20 animate-pulse ${current.accent}`} />
        <div className="relative">{current.icon}</div>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
            {current.label}
          </span>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-1 hover:bg-white/5 rounded-md transition-colors opacity-0 group-hover:opacity-100"
            >
              <X size={14} className="text-slate-500" />
            </button>
          )}
        </div>
        <p className="text-sm font-medium leading-relaxed italic">
          {message}
        </p>
      </div>

      {/* Subtle background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.div>
  );
}