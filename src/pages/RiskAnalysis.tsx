import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, XCircle, Activity, FileSearch, TrendingUp, TrendingDown, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dashboardBg from "@/assets/dashboard-bg.jpg";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
} from "recharts";

type Severity = "red" | "yellow" | "green";

interface RiskDetail {
  id: string;
  title: string;
  metric: string;
  value: string | number;
  severity: Severity;
  description: string;
  details: { label: string; value: string | number }[];
  chartType?: "bar" | "pie" | "line";
  chartData: any[];
}

const riskDetails: RiskDetail[] = [
  {
    id: "qayta-taqsimot",
    title: "Qayta taqsimot",
    metric: "Nomuvofiqliklar soni",
    value: "1 247",
    severity: "red",
    description: "Shartnoma summalarida aniqlangan nomuvofiqliklar. OTMlar bo'yicha taqsimot summasi va hujjatlardagi summa o'rtasidagi farqlar.",
    details: [
      { label: "Talabalar soni", value: "45 320" },
      { label: "Nomuvofiqliklar soni", value: "1 247" },
      { label: "Nomuvofiqlik foizi", value: "2.75%" },
      { label: "Umumiy farq summasi", value: "3.2 mlrd so'm" },
    ],
    chartData: [],
  },
  {
    id: "hemis-ttj",
    title: "HEMIS-TTJ Sync",
    metric: "O'chirilgan talabalar shartnomalari",
    value: 86,
    severity: "red",
    description: "HEMISdan o'chirilgan yoki o'qishdan chetlatilgan talabalarning hali ham faol bo'lgan TTJ shartnomalari.",
    details: [
      { label: "Faol TTJ shartnomalari", value: "4 520" },
      { label: "O'chirilgan talabalar", value: 86 },
      { label: "To'lanmagan qoldiq", value: "124 mln so'm" },
      { label: "Eng ko'p OTM", value: "TDIU — 23 ta" },
    ],
    chartData: [],
  },
  {
    id: "super-kontrakt",
    title: "Super Kontrakt Check",
    metric: "Noto'g'ri summa mosliklari",
    value: 23,
    severity: "yellow",
    description: "Shartnoma summasi belgilangan tarifga mos kelmaydigan holatlar. Qo'lda kiritish xatoliklari yoki tizim nosozliklari.",
    details: [
      { label: "Tekshirilgan shartnomalar", value: "787 674" },
      { label: "Noto'g'ri mosliklar", value: 23 },
      { label: "Xatolik foizi", value: "0.003%" },
      { label: "Tuzatish kerak", value: "18 ta" },
    ],
    chartData: [],
  },
  {
    id: "otm-debt-aging",
    title: "OTM Debt Aging",
    metric: "Maksimal kechikish kunlari",
    value: "365+",
    severity: "red",
    description: "OTMlar bo'yicha to'lov muddati o'tgan shartnomalar tahlili. Eng uzoq kechikish va umumiy qarz summasi.",
    details: [
      { label: "Jami qarzdor shartnomalar", value: "12 340" },
      { label: "90+ kun kechikkan", value: "3 456" },
      { label: "180+ kun kechikkan", value: "1 890" },
      { label: "365+ kun kechikkan", value: 728 },
    ],
    chartType: "line",
    chartData: [
      { month: "Yan", count: 8500 },
      { month: "Fev", count: 9200 },
      { month: "Mar", count: 9800 },
      { month: "Apr", count: 10400 },
      { month: "May", count: 10900 },
      { month: "Iyun", count: 11200 },
      { month: "Iyul", count: 11600 },
      { month: "Avg", count: 11900 },
      { month: "Sen", count: 12100 },
      { month: "Okt", count: 12340 },
    ],
  },
  {
    id: "unpaid-contracts",
    title: "Unpaid Contracts",
    metric: "0 to'lovli tasdiqlangan shartnomalar",
    value: "4 312",
    severity: "yellow",
    description: "Tasdiqlangan, lekin hech qanday to'lov amalga oshirilmagan shartnomalar. Kurs boshlangandan beri 0 so'm to'langan.",
    details: [
      { label: "Jami tasdiqlangan", value: "787 674" },
      { label: "0 to'lovli", value: "4 312" },
      { label: "To'lanmagan summa", value: "48.5 mlrd so'm" },
      { label: "O'rtacha shartnoma", value: "11.2 mln so'm" },
    ],
    chartType: "bar",
    chartData: [
      { name: "Bakalavr", value: 2840 },
      { name: "Magistr", value: 890 },
      { name: "Sirtqi", value: 412 },
      { name: "Kechki", value: 170 },
    ],
  },
];

const severityConfig: Record<Severity, { bg: string; text: string; label: string; icon: React.ReactNode; border: string }> = {
  red: {
    bg: "bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    label: "Yuqori xavf",
    icon: <XCircle className="w-5 h-5 text-red-500" />,
    border: "border-l-red-500",
  },
  yellow: {
    bg: "bg-yellow-400/10",
    text: "text-yellow-600 dark:text-yellow-400",
    label: "O'rtacha xavf",
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    border: "border-l-yellow-400",
  },
  green: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    label: "Normal",
    icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    border: "border-l-emerald-500",
  },
};

const RiskAnalysis = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState("2025-2026");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const redCount = riskDetails.filter((r) => r.severity === "red").length;
  const yellowCount = riskDetails.filter((r) => r.severity === "yellow").length;

  return (
    <div className="flex min-h-screen bg-background relative">
      <div
        className="fixed inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url(${dashboardBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative w-[260px] h-full animate-slide-in-left" onClick={(e) => e.stopPropagation()}>
            <Sidebar />
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-[-40px] w-8 h-8 rounded-full bg-card flex items-center justify-center shadow-lg"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
      )}

      <div className="hidden lg:block relative z-10">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <HeaderBar year={year} onYearChange={setYear} onMenuToggle={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {/* Back + Header */}
          <div className="mb-6 animate-fade-in">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Bosh sahifaga qaytish
            </button>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Risk Analysis · Health Check</h1>
                  <p className="text-sm text-muted-foreground">Billing tizimi salomatligi — batafsil tahlil</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-red-500 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  {redCount} xavfli
                </span>
                <span className="flex items-center gap-1.5 text-yellow-500 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  {yellowCount} ogohlantirish
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Activity className="w-4 h-4" />
                  bugun, 09:30
                </span>
              </div>
            </div>
          </div>

          {/* Risk detail cards */}
          <div className="space-y-6">
            {riskDetails.map((risk, i) => {
              const cfg = severityConfig[risk.severity];
              return (
                <Card
                  key={risk.id}
                  className={`overflow-hidden border-l-4 ${cfg.border} animate-fade-in opacity-0`}
                  style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {cfg.icon}
                        <div>
                          <CardTitle className="text-lg">{risk.title}</CardTitle>
                          <p className="text-xs text-muted-foreground mt-0.5">{risk.metric}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-2xl font-bold tabular-nums ${cfg.text}`}>{risk.value}</span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text}`}>
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-5">{risk.description}</p>

                    <div className={`grid gap-6 ${risk.chartData.length > 0 ? "grid-cols-1 lg:grid-cols-[1fr_1.2fr]" : "grid-cols-1"}`}>
                      {/* Stats */}
                      <div className={`grid ${risk.chartData.length > 0 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"} gap-3`}>
                        {risk.details.map((d) => (
                          <div key={d.label} className="rounded-lg bg-muted/40 p-3">
                            <p className="text-xs text-muted-foreground mb-1">{d.label}</p>
                            <p className="text-lg font-bold text-foreground tabular-nums">{d.value}</p>
                          </div>
                        ))}
                      </div>

                      {risk.chartData.length > 0 && (
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            {risk.chartType === "bar" ? (
                              <BarChart data={risk.chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                                <Bar dataKey="value" fill={risk.severity === "red" ? "hsl(0, 70%, 55%)" : "hsl(45, 90%, 50%)"} radius={[4, 4, 0, 0]} />
                              </BarChart>
                            ) : risk.chartType === "pie" ? (
                              <PieChart>
                                <Pie data={risk.chartData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={3}>
                                  {risk.chartData.map((entry: any, idx: number) => (
                                    <Cell key={idx} fill={entry.fill} />
                                  ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                              </PieChart>
                            ) : (
                              <LineChart data={risk.chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                                <Line type="monotone" dataKey="count" stroke="hsl(0, 70%, 55%)" strokeWidth={2} dot={{ r: 3 }} />
                              </LineChart>
                            )}
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RiskAnalysis;
