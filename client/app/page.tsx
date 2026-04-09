"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus, BarChart3, Receipt, Tag, DatabaseZap, Loader2, Sparkles } from "lucide-react";
import { createTransaction } from "@/services/api";

// 1. Configure the API (replace URL as needed)
const API = axios.create({ baseURL: "http://localhost:8000" });

// 2. Framer Motion Variants for Staggered Animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger children like Cards and Table Rows
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const tableRowVariants: Variants = {
  hidden: { opacity: 0, x: -10, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 20, scale: 0.95 },
};

// 3. Helper to format currency consistently
const formatUSD = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await API.get("/transactions");
      setData(res.data);
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const es = new EventSource("http://localhost:8000/stream");
    es.onmessage = () => fetchData();
    return () => es.close();
  }, []);

  const totalAmount = data.reduce((acc, t) => acc + Number(t?.amount || 0), 0);

  return (
    <div className="min-h-screen bg-[#060608] text-gray-100 font-sans selection:bg-cyan-500/30">
      {/* Background Decor: Blurred Gradient Blobs for depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[40rem] h-[40rem] rounded-full bg-cyan-950/20 blur-[128px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[30rem] h-[30rem] rounded-full bg-indigo-950/20 blur-[96px]" />
      </div>

      <motion.main 
        className="relative max-w-[90rem] mx-auto p-6 md:p-10 lg:p-12 space-y-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* === HEADER SECTION === */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-800/50">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-900/50 to-indigo-950/50 border border-cyan-800/50 shadow-inner">
              <DatabaseZap className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <motion.h1 
                className="text-4xl font-extrabold tracking-tighter text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Transaction<span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Ledger</span>
              </motion.h1>
              <p className="text-gray-400 mt-1">Real-time financial activity overview</p>
            </div>
          </div>
          {/* Form moved up for balanced layout */}
          <AddForm refresh={fetchData} />
        </header>

        {/* === STATS CARDS === */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard 
            title="Active Entries" 
            value={data.length.toLocaleString()} 
            icon={Receipt} 
            variants={itemVariants}
          />
          <StatCard 
            title="Ledger Volume" 
            value={formatUSD(totalAmount)} 
            icon={BarChart3} 
            variants={itemVariants}
          />
          <StatCard 
            title="Avg. Transaction" 
            value={data.length ? formatUSD(totalAmount / data.length) : '$0.00'} 
            icon={Sparkles} 
            variants={itemVariants}
          />
        </section>

        {/* === TRANSACTIONS TABLE === */}
        <motion.section 
          className="relative rounded-3xl p-6 md:p-8"
          variants={itemVariants}
        >
          {/* Glass Effect */}
          <div className="absolute inset-0 bg-gray-950/30 backdrop-blur-xl rounded-3xl border border-gray-800/50" />
          
          <div className="relative overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-100 tracking-tight mb-8">Activity Feed</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-800">
                  <tr className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    <th className="px-5 py-4 min-w-[180px]">Payee</th>
                    <th className="px-5 py-4 text-right">Amount</th>
                    <th className="px-5 py-4 min-w-[200px]">Metadata / Classification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  <AnimatePresence mode="popLayout">
                    {data.map((t) => (
                      <motion.tr
                        key={t.id || t.amount} // Adjust key as needed
                        variants={tableRowVariants}
                        layout // Enables smooth layout animation when rows change
                        className="group hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="px-5 py-5 text-lg font-medium text-gray-100 group-hover:text-cyan-300">
                          {t.payee || 'Unidentified'}
                        </td>
                        <td className="px-5 py-5 text-right tabular-nums text-2xl font-semibold text-white tracking-tight">
                          {formatUSD(t.amount)}
                        </td>
                        <td className="px-5 py-5">
                          <div className="flex gap-2 flex-wrap">
                            {Object.entries(t.meta_data || {}).map(([k, v]) => (
                              <div
                                key={k}
                                className="flex items-center gap-1.5 bg-cyan-950/30 text-cyan-200 px-3 py-1 rounded-full text-xs font-medium border border-cyan-800/50"
                              >
                                <Tag className="w-3 h-3 text-cyan-400" />
                                <span className="opacity-70">{k}:</span> <span className="font-semibold text-cyan-100">{String(v)}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {loading && data.length === 0 && (
                 <div className="flex justify-center p-20 text-gray-600"><Loader2 className="animate-spin w-10 h-10"/></div>
              )}
            </div>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}

// === Premium Stat Card Component ===
function StatCard({ title, value, icon: Icon, variants }: any) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.02, y: -4, borderColor: 'rgba(34, 211, 238, 0.5)' }}
      className="relative p-7 rounded-3xl group bg-gray-950/40 backdrop-blur-md border border-gray-800/50 overflow-hidden shadow-xl transition-all duration-300 ease-out"
    >
      {/* Subtle hover background highlight */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/0 via-cyan-950/20 to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">{title}</h3>
          <div className="p-2.5 rounded-xl bg-gray-900 group-hover:bg-cyan-950/40 border border-gray-800 group-hover:border-cyan-800/50 transition-colors">
            <Icon className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        
        <p className="text-5xl font-extrabold tracking-tighter text-white tabular-nums">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

// === High-Fidelity Add Form ===
function AddForm({ refresh }: any) {
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payee || !amount) return;
    setAdding(true);
    try {
      createTransaction({
        payee,
        amount: Number(amount),
        date: new Date(),
        meta_data: { source: "pro_dashboard" },
        organization_id: "d7804a85-764d-47ab-afdf-73537061c7e8", // Placeholder
      });
      setPayee("");
      setAmount("");
      refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3 } }}
      onSubmit={handleSubmit}
      className="flex gap-2.5 bg-gray-950 p-2.5 rounded-2xl border border-gray-800"
    >
      <input
        className="w-full md:w-64 bg-gray-900 focus:bg-gray-800 p-3.5 rounded-xl text-white placeholder:text-gray-600 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all"
        placeholder="Enter Payee (e.g., Apple Store)"
        value={payee}
        onChange={(e) => setPayee(e.target.value)}
      />
      <input
        type="number"
        className="w-48 bg-gray-900 focus:bg-gray-800 p-3.5 rounded-xl text-white placeholder:text-gray-600 focus:ring-2 focus:ring-cyan-500/50 outline-none tabular-nums transition-all"
        placeholder="Amount USD"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        type="submit"
        disabled={adding}
        className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 disabled:opacity-70 p-4 rounded-xl text-white transition-all font-semibold flex items-center justify-center gap-2"
      >
        {adding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
      </button>
    </motion.form>
  );
}