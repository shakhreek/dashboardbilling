import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { chartData } from "@/data/dashboardData";

const tabs = [
  { key: "barchasi", label: "Barchasi" },
  { key: "shartnoma", label: "Shartnoma" },
  { key: "kredit", label: "Kredit" },
  { key: "yotoqxona", label: "Yotoqxona" },
];

const ContractChart = () => {
  const [activeTab, setActiveTab] = useState("barchasi");

  const lines = useMemo(() => {
    if (activeTab === "shartnoma") return [{ key: "shartnoma", color: "hsl(260, 70%, 55%)" }];
    if (activeTab === "kredit") return [{ key: "kredit", color: "hsl(217, 91%, 60%)" }];
    if (activeTab === "yotoqxona") return [{ key: "yotoqxona", color: "hsl(170, 70%, 50%)" }];
    return [
      { key: "shartnoma", color: "hsl(260, 70%, 55%)" },
      { key: "kredit", color: "hsl(217, 91%, 60%)" },
      { key: "yotoqxona", color: "hsl(170, 70%, 50%)" },
    ];
  }, [activeTab]);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h3 className="text-base font-semibold text-foreground">Tasdiqlangan shartnoma</h3>
        <div className="flex gap-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === tab.key
                  ? "text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-accent"
              }`}
              style={activeTab === tab.key ? { background: "hsl(142, 71%, 45%)" } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
          <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
          <Tooltip />
          {lines.map((l) => (
            <Line key={l.key} type="monotone" dataKey={l.key} stroke={l.color} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContractChart;
