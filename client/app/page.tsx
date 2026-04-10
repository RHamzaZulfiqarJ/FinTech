"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import API from "@/lib/api";

import Header from "@/components/layout/Header";
import StatCard from "@/components/dashboard/StatCard";
import TransactionTable from "@/components/dashboard/TransactionTable";
import Loader from "@/components/ui/Loader";
import SearchBar from "@/components/dashboard/Searchbar";
import Alert from "@/components/ui/Alert";
import AuditLog from "@/components/dashboard/AuditLog";
import InsightsPanel from "@/components/dashboard/InsightsPanel";
import Charts from "@/components/dashboard/Charts";

import { BarChart3, Receipt, Sparkles } from "lucide-react";
import AddForm from "@/components/dashboard/AddForm";

// Animation Variants for the Page Wrapper
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
};

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [warnings, setWarnings] = useState<any[]>([]);
  const [logs, setLogs] = useState([]);
  const [insights, setInsights] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  const fetchData = async (searchValue = "") => {
    try {
      const res = await API.get(`/transactions?search=${searchValue}`);
      setData(res.data.data || res.data);
      setError("");
    } catch (e: any) {
      setError("System link interrupted. Unable to sync transactions.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAuxiliaryData = async () => {
    try {
      const [warnRes, logRes, insightRes] = await Promise.all([
        API.get("/anomalies"),
        API.get("/audit"),
        API.get("/insights")
      ]);
      setWarnings(warnRes.data);
      setLogs(logRes.data);
      setInsights(insightRes.data);
    } catch (e) {
      console.error("Auxiliary sync error", e);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAuxiliaryData();

    const es = new EventSource("https://fintech-52w9.onrender.com/stream");
    es.onmessage = () => {
      fetchData(search);
      fetchAuxiliaryData();
    };

    return () => es.close();
  }, [search]);

  const totalAmount = useMemo(() => 
    data.reduce((acc, t) => acc + Number(t?.amount || 0), 0), 
  [data]);

  const formatUSD = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <div className="min-h-screen bg-[#060608] text-slate-200 selection:bg-indigo-500/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/5 blur-[100px] rounded-full" />
      </div>

      <Header />

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-7xl mx-auto p-6 space-y-10 pb-24"
      >
        {/* Search & Action Bar */}
        <motion.div variants={sectionVariants}>
          <SearchBar onSearch={(v: string) => {setSearch(v); fetchData(v);}} />
        </motion.div>

        <div className="hidden sm:block border-r border-white/10 pr-6">
          <AddForm refresh={fetchData} />
        </div>

        {/* Stats Grid */}
        <motion.div variants={sectionVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Volume" value={formatUSD(totalAmount)} icon={BarChart3} trend="+12.5%" />
          <StatCard title="Transactions" value={data.length} icon={Receipt} trend="Real-time" />
          <StatCard 
            title="Average Entry" 
            value={data.length ? formatUSD(totalAmount / data.length) : "$0.00"} 
            icon={Sparkles} 
            trend="Stable"
          />
        </motion.div>

        {/* Analytics Section */}
        <motion.div variants={sectionVariants} className="rounded-3xl border border-white/5 bg-white/[0.02] p-1 shadow-2xl">
          <Charts data={data} />
        </motion.div>

        {/* Notifications & Alerts */}
        <AnimatePresence mode="popLayout">
          {(error || warnings.length > 0) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              {error && <Alert type="error" message={error} />}
              {warnings.map((w, i) => (
                <Alert key={i} type="warning" message={w.message} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Data Surface */}
        <motion.div variants={sectionVariants} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000" />
          <div className="relative bg-[#0b0b0d] border border-white/10 rounded-3xl overflow-hidden">
            {loading ? (
              <div className="py-32 flex justify-center"><Loader /></div>
            ) : (
              <TransactionTable data={data} />
            )}
          </div>
        </motion.div>

        {/* Intelligence Sidebars */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div variants={sectionVariants}>
            <InsightsPanel insights={insights} />
          </motion.div>
          <motion.div variants={sectionVariants}>
            <AuditLog logs={logs} />
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}