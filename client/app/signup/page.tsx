"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, UserPlus, Loader2, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const API = "http://localhost:8000";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API}/auth/signup`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      router.push("/");
    } catch (err: any) {
      setError("Registration failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060608] text-white overflow-hidden relative">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Logo Branding */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)] mb-4">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter">
            FIN<span className="text-indigo-500">TECH</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">Build your financial future today.</p>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <h2 className="text-xl font-bold mb-8 tracking-tight">Create Account</h2>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-black/40 border border-white/5 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none p-3.5 pl-12 rounded-2xl text-sm transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/5 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none p-3.5 pl-12 rounded-2xl text-sm transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-xs text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20 italic"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all mt-4"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Get Started</span>
                  <ArrowRight size={16} className="ml-1 opacity-50" />
                </>
              )}
            </motion.button>
          </form>

          {/* Login Redirection */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-xs font-medium">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="text-indigo-400 hover:text-indigo-300 transition-colors font-bold underline-offset-4 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center mt-10 text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
          Secure Infrastructure &bull; 256-bit Encryption
        </p>
      </motion.div>
    </div>
  );
}