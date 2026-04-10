"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, LogIn, Loader2, LayoutDashboard, ShieldCheck } from "lucide-react";
import Link from "next/link";

const API = "https://fintech-52w9.onrender.com";

export default function LoginPage() {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("string");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      router.push("/");
    } catch (err: any) {
      setError("Invalid credentials. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060608] text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="w-14 h-14 bg-indigo-600 rounded-[1.25rem] flex items-center justify-center shadow-2xl shadow-indigo-600/40 mb-6"
          >
            <LayoutDashboard className="text-white w-7 h-7" />
          </motion.div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">
            Fin<span className="text-indigo-500">tech</span>
          </h1>
          <div className="flex items-center gap-2 mt-2 text-slate-500">
            <ShieldCheck size={14} className="text-emerald-500/70" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Secure Terminal</span>
          </div>
        </div>

        {/* Login Surface */}
        <div className="bg-[#0b0b0d] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative">
          {/* Subtle top light effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Identity</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="admin@fintech.io"
                  className="w-full bg-white/[0.02] border border-white/5 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none p-4 pl-12 rounded-2xl text-sm transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Keyphrase</label>
                <a href="#" className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300">Recovery?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/[0.02] border border-white/5 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none p-4 pl-12 rounded-2xl text-sm transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-400 bg-red-500/5 border border-red-500/10 p-3 rounded-xl text-center font-medium italic"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-white text-black hover:bg-slate-200 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all mt-6 shadow-xl shadow-white/5"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Authorize Access</span>
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-600 text-xs font-medium uppercase tracking-tight">
              New to the platform?{" "}
              <Link 
                href="/signup" 
                className="text-white hover:text-indigo-400 transition-colors font-black ml-1"
              >
                Establish Identity
              </Link>
            </p>
          </div>
        </div>

        {/* Subtle bottom disclaimer */}
        <p className="text-center mt-12 text-[9px] text-slate-700 font-bold uppercase tracking-[0.4em] leading-loose">
          Authorized Personnel Only <br />
          Encrypted Session Active
        </p>
      </motion.div>
    </div>
  );
}