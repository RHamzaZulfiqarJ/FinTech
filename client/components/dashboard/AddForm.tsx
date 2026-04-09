"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Loader2, DollarSign, User } from "lucide-react";
import { createTransaction } from "@/services/api";

export default function AddForm({ refresh }: any) {
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payee || !amount || status !== "idle") return;

    setStatus("loading");
    try {
      await createTransaction({
        payee,
        amount: Number(amount),
        date: new Date(),
        meta_data: { source: "web_dashboard" },
        organization_id: "TEMP",
      });

      setStatus("success");
      refresh();
      
      // Reset after showing success state
      setTimeout(() => {
        setPayee("");
        setAmount("");
        setStatus("idle");
      }, 2000);
    } catch (error) {
      setStatus("idle");
      console.error("Transaction failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      {/* Payee Input Group */}
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
          <User size={16} />
        </div>
        <input
          type="text"
          value={payee}
          placeholder="Payee"
          onChange={(e) => setPayee(e.target.value)}
          className="bg-[#0f0f12] border border-white/10 hover:border-white/20 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all w-48 lg:w-64"
        />
      </div>

      {/* Amount Input Group */}
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors">
          <DollarSign size={16} />
        </div>
        <input
          type="number"
          value={amount}
          placeholder="0.00"
          onChange={(e) => setAmount(e.target.value)}
          className="bg-[#0f0f12] border border-white/10 hover:border-white/20 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all w-32 tabular-nums"
        />
      </div>

      {/* Action Button */}
      <motion.button
        type="submit"
        disabled={status !== "idle"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={`
          relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden
          ${status === "success" 
            ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
            : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"}
          disabled:cursor-not-allowed
        `}
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              <Plus size={18} />
              <span className="hidden md:inline">Add Transaction</span>
            </motion.div>
          )}

          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 size={18} className="animate-spin" />
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Check size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
}