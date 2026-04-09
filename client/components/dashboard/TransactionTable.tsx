"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Tag, MoreHorizontal, ArrowUpRight, DollarSign } from "lucide-react";

export default function TransactionTable({ data }: any) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#0b0b0d]/50 backdrop-blur-xl shadow-2xl">
      {/* Header Section */}
      <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.01]">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Ledger Operations</h2>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Live Feed</p>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-500">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-white/5 bg-white/[0.01]">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Payee</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 text-right">Amount</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Classification</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 text-right">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.02]">
            <AnimatePresence mode="popLayout">
              {data.map((t: any, i: number) => (
                <motion.tr
                  key={t.id || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: i * 0.03 }}
                  className="group hover:bg-white/[0.03] transition-colors cursor-default"
                >
                  {/* Payee Column */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-white/5 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        <ArrowUpRight size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                          {t.payee}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          ID: {String(t.id || 'N/A').substring(0, 8)}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Amount Column */}
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="text-sm font-black text-white tabular-nums">
                        ${Number(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </td>

                  {/* Metadata/Tags Column */}
                  <td className="px-6 py-5">
                    <div className="flex gap-2 flex-wrap">
                      {Object.entries(t.meta_data || {}).map(([k, v]) => (
                        <div
                          key={k}
                          className="flex items-center gap-1.5 bg-indigo-500/5 border border-indigo-500/10 px-2.5 py-1 rounded-full group-hover:border-indigo-500/30 transition-colors"
                        >
                          <Tag size={10} className="text-indigo-400" />
                          <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-tight">
                            {String(v)}
                          </span>
                        </div>
                      ))}
                      {(!t.meta_data || Object.keys(t.meta_data).length === 0) && (
                        <span className="text-[10px] text-slate-700 font-bold uppercase italic">No Tags</span>
                      )}
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-5 text-right">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400">
                      <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="p-20 text-center">
          <div className="inline-flex p-4 rounded-full bg-white/5 border border-white/10 text-slate-600 mb-4">
            <DollarSign size={32} />
          </div>
          <p className="text-slate-500 text-sm font-medium">No transactions recorded for this period.</p>
        </div>
      )}
    </div>
  );
}