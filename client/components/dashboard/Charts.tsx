"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, BarChart as BarChartIcon } from "lucide-react";

// Custom Tooltip for that "Glass" look
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b0b0d]/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">
          {payload[0].payload.date}
        </p>
        <p className="text-sm font-mono font-bold text-white">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function Charts({ data }: any) {
  const chartData = useMemo(() => {
    const grouped: any = {};
    data.forEach((t: any) => {
      const date = new Date(t.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      if (!grouped[date]) grouped[date] = 0;
      grouped[date] += Number(t.amount);
    });

    return Object.keys(grouped).map((date) => ({
      date,
      amount: grouped[date],
    }));
  }, [data]);

  if (!chartData.length) return null;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* 📈 AREA CHART (Premium Trend) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0b0b0d] p-7 rounded-3xl border border-white/5 relative overflow-hidden group"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Spending Trend</h2>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#22d3ee', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#22d3ee"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAmount)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 📊 BAR CHART (Modern Volume) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#0b0b0d] p-7 rounded-3xl border border-white/5 relative overflow-hidden group"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            <BarChartIcon className="w-4 h-4 text-indigo-400" />
          </div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Daily Volume</h2>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar 
              dataKey="amount" 
              fill="#6366f1" 
              radius={[6, 6, 0, 0]}
              barSize={32}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}