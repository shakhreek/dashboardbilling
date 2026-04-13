import { useState } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell
} from "recharts";
import { BarChart3, Activity, Layers } from "lucide-react";

const radarData = [
  { module: "Kontrakt", arizalar: 85, tolangan: 72, shartnoma: 90 },
  { module: "Kredit", arizalar: 68, tolangan: 52, shartnoma: 78 },
  { module: "TTJ", arizalar: 45, tolangan: 40, shartnoma: 55 },
  { module: "Stipendiya", arizalar: 60, tolangan: 58, shartnoma: 62 },
  { module: "Ijara", arizalar: 50, tolangan: 42, shartnoma: 48 },
  { module: "Subsidiya", arizalar: 72, tolangan: 65, shartnoma: 70 },
];

const comparisonData = [
  { name: "Kontrakt", current: 14440, previous: 12800, color: "hsl(217, 91%, 60%)" },
  { name: "Kredit", current: 3210, previous: 2900, color: "hsl(270, 70%, 55%)" },
  { name: "TTJ", current: 890, previous: 780, color: "hsl(142, 71%, 45%)" },
  { name: "Stipendiya", current: 3600, previous: 3200, color: "hsl(45, 90%, 50%)" },
  { name: "Ijara", current: 2100, previous: 1850, color: "hsl(350, 70%, 55%)" },
  { name: "Subsidiya", current: 4500, previous: 3900, color: "hsl(239, 84%, 60%)" },
];

type ViewMode = "radar" | "comparison";

const ContractChart = () => {
  const [view, setView] = useState<ViewMode>("radar");

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">Modullar tahlili</h3>
        </div>
        <div className="flex gap-1 bg-secondary rounded-lg p-0.5">
          <button
            onClick={() => setView("radar")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
              view === "radar" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Radar
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

      {view === "radar" ? (
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(214, 32%, 91%)" />
            <PolarAngleAxis dataKey="module" tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }} />
            <PolarRadiusAxis tick={{ fontSize: 10 }} />
            <Radar name="Arizalar" dataKey="arizalar" stroke="hsl(217, 91%, 60%)" fill="hsl(217, 91%, 60%)" fillOpacity={0.2} strokeWidth={2} />
            <Radar name="To'langan" dataKey="tolangan" stroke="hsl(142, 71%, 45%)" fill="hsl(142, 71%, 45%)" fillOpacity={0.2} strokeWidth={2} />
            <Radar name="Shartnoma" dataKey="shartnoma" stroke="hsl(270, 70%, 55%)" fill="hsl(270, 70%, 55%)" fillOpacity={0.15} strokeWidth={2} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
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

      {/* Legend for radar */}
      {view === "radar" && (
        <div className="flex justify-center gap-5 mt-3">
          {[
            { label: "Arizalar", color: "hsl(217, 91%, 60%)" },
            { label: "To'langan", color: "hsl(142, 71%, 45%)" },
            { label: "Shartnoma", color: "hsl(270, 70%, 55%)" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContractChart;
