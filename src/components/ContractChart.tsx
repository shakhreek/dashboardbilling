import { useState } from "react";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell
} from "recharts";
import { BarChart3, TrendingUp, Activity } from "lucide-react";
import { chartData } from "@/data/dashboardData";

const comparisonData = [
  { name: "Kontrakt", current: 14440, previous: 12800, color: "hsl(217, 91%, 60%)" },
  { name: "Kredit modul", current: 3210, previous: 2900, color: "hsl(270, 70%, 55%)" },
  { name: "TTJ", current: 890, previous: 780, color: "hsl(142, 71%, 45%)" },
  { name: "Stipendiya", current: 3600, previous: 3200, color: "hsl(45, 90%, 50%)" },
  { name: "Ijara", current: 2100, previous: 1850, color: "hsl(350, 70%, 55%)" },
  { name: "Subsidiya", current: 4500, previous: 3900, color: "hsl(239, 84%, 60%)" },
];

type ViewMode = "area" | "comparison";

const moduleTabs = [
  { label: "Barchasi", value: "all" },
  { label: "Kontrakt", value: "shartnoma" },
  { label: "Kredit modul", value: "kredit" },
  { label: "TTJ", value: "yotoqxona" },
];

const moduleColors: Record<string, { stroke: string; fill: string; label: string }> = {
  shartnoma: { stroke: "hsl(217, 91%, 60%)", fill: "url(#gradShartnoma)", label: "Shartnoma" },
  kredit: { stroke: "hsl(270, 70%, 55%)", fill: "url(#gradKredit)", label: "Kredit" },
  yotoqxona: { stroke: "hsl(142, 71%, 45%)", fill: "url(#gradTTJ)", label: "Yotoqxona" },
};

const ContractChart = () => {
  const [view, setView] = useState<ViewMode>("area");
  const [activeModule, setActiveModule] = useState("all");

  const visibleModules = activeModule === "all"
    ? ["shartnoma", "kredit", "yotoqxona"]
    : [activeModule];

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">Modullar tahlili</h3>
        </div>
        <div className="flex gap-1 bg-secondary rounded-lg p-0.5">
          <button
            onClick={() => setView("area")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
              view === "area" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Dinamika
          </button>
          <button
            onClick={() => setView("comparison")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
              view === "comparison" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Solishtirish
          </button>
        </div>
      </div>

      {view === "area" ? (
        <>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="gradShartnoma" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradKredit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(270, 70%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(270, 70%, 55%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradTTJ" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
              <YAxis yAxisId="left" tick={{ fontSize: 10 }} stroke="hsl(217, 91%, 60%)" tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
              {visibleModules.some(m => m !== "shartnoma") && (
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} stroke="hsl(270, 70%, 55%)" tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
              )}
              <Tooltip
                formatter={(value: number) => value.toLocaleString()}
                contentStyle={{ borderRadius: 8, border: "1px solid hsl(214, 32%, 91%)" }}
              />
              {visibleModules.map((key) => (
                <Area
                  key={key}
                  yAxisId={key === "shartnoma" ? "left" : visibleModules.some(m => m !== "shartnoma") ? "right" : "left"}
                  type="monotone"
                  dataKey={key}
                  name={moduleColors[key].label}
                  stroke={moduleColors[key].stroke}
                  fill={moduleColors[key].fill}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-5 mt-3">
            {visibleModules.map((key) => (
              <div key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: moduleColors[key].stroke }} />
                {moduleColors[key].label}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 mt-4 pt-3 border-t border-border/50">
            {moduleTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveModule(tab.value)}
                className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all duration-200 border ${
                  activeModule === tab.value
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-secondary/50 text-muted-foreground border-border hover:bg-accent hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={comparisonData} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(215, 16%, 47%)" />
            <Tooltip
              formatter={(value: number) => `${value.toLocaleString()} mlrd`}
              contentStyle={{ borderRadius: 8, border: "1px solid hsl(214, 32%, 91%)" }}
            />
            <Bar dataKey="previous" name="O'tgan yil" fill="hsl(214, 32%, 85%)" radius={[4, 4, 0, 0]} barSize={18} />
            <Bar dataKey="current" name="Joriy yil" radius={[4, 4, 0, 0]} barSize={18}>
              {comparisonData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ContractChart;
