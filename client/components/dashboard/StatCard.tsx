"use client";

import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({ title, value, icon: Icon, trend = "+2.5%", trendUp = true }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group p-6 rounded-2xl bg-[#0b0b0d] border border-white/5 overflow-hidden shadow-2xl"
    >
      {/* Background Decorative Blur */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-500" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-cyan-500/30 transition-colors">
            <Icon className="w-5 h-5 text-cyan-400" />
          </div>
          
          {/* Trend Badge */}
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold tracking-tight border ${
            trendUp 
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}>
            <TrendingUp size={10} />
            {trend}
          </div>
        </div>

        <div className="mt-5 space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-extrabold tracking-tighter text-white tabular-nums">
              {value}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-cyan-400 transition-colors" />
          </div>
        </div>

        {/* Bottom Sparkline-style Accent */}
        <div className="mt-4 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Subtle border shine on hover */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-2xl transition-colors pointer-events-none" />
    </motion.div>
  );
}