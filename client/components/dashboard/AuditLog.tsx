"use client";

import { motion } from "framer-motion";
import { History, ArrowRight, Clock, Fingerprint } from "lucide-react";

export default function AuditLog({ logs }: any) {
  if (!logs || !logs.length) return null;

  return (
    <div className="relative group">
      {/* Decorative Glow */}
      <div className="absolute -inset-px bg-gradient-to-b from-indigo-500/10 to-transparent rounded-2xl blur-sm opacity-50" />
      
      <div className="relative bg-[#0b0b0d] p-6 rounded-2xl border border-white/5 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <History className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">System Audit</h2>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md border border-white/5">
            <Fingerprint className="w-3 h-3" /> Secure
          </div>
        </div>

        <div className="relative space-y-4">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/50 via-white/5 to-transparent" />

          <div className="space-y-4">
            {logs.map((log: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative pl-10 group"
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 top-2.5 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-indigo-500/10 group-hover:scale-125 transition-transform" />

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400/80">
                      Property: <span className="text-indigo-200">{log.field}</span>
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] font-medium uppercase tracking-tight">
                        {new Date(log.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="px-2 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-mono">
                      {String(log.old)}
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                    <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
                      {String(log.new)}
                    </div>
                  </div>

                  <div className="mt-2 text-[10px] text-slate-600 italic">
                    {new Date(log.time).toDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}