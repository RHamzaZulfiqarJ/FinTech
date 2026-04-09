"use client";

import { motion } from "framer-motion";
import { Sparkles, Lightbulb, Zap, ShieldCheck } from "lucide-react";

export default function InsightsPanel({ insights }: any) {
  if (!insights || !insights.length) return null;

  return (
    <div className="relative group overflow-hidden">
      {/* Animated Gradient Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
      
      <div className="relative bg-[#0b0b0d]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/10 border border-amber-500/20">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Smart Insights</h2>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-0.5">
                AI-Generated Analysis
              </p>
            </div>
          </div>
          <Zap className="w-4 h-4 text-slate-600" />
        </div>

        <div className="space-y-4">
          {insights.map((insight: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
              className="group/item relative p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                    {i % 2 === 0 ? (
                      <Lightbulb className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-slate-300 group-hover/item:text-white transition-colors">
                    {insight}
                  </p>
                </div>
              </div>

              {/* Subtle accent line on hover */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-indigo-500 group-hover/item:h-1/2 transition-all duration-300 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Footer Detail */}
        <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
          <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-400 transition-colors">
            Refresh Analysis
          </button>
        </div>
      </div>
    </div>
  );
}