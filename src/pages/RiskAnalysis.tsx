import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, XCircle, Activity, ChevronRight, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import dashboardBg from "@/assets/dashboard-bg.jpg";
import { useCountUp } from "@/hooks/useCountUp";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
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
    ],
    chartType: "bar",
    chartData: [
      { name: "TDIU", value: 245 },
      { name: "TATU", value: 198 },
      { name: "SamDU", value: 167 },
      { name: "TDYU", value: 142 },
      { name: "Boshqa", value: 495 },
    ],
  },
  {
    id: "hemis-ttj",
    title: "HEMIS-TTJ sinxronizatsiya",
    metric: "O'chirilgan talabalar shartnomalari",
    value: 86,
    severity: "red",
    description: "HEMISdan o'chirilgan yoki o'qishdan chetlatilgan talabalarning hali ham faol bo'lgan TTJ shartnomalari.",
    details: [
      { label: "Faol TTJ shartnomalari", value: "4 520" },
      { label: "O'chirilgan talabalar", value: 86 },
      { label: "Eng ko'p OTM", value: "TDIU — 23 ta" },
    ],
    chartType: "bar",
    chartData: [
      { name: "TDIU", value: 23 },
      { name: "TATU", value: 18 },
      { name: "NamDU", value: 15 },
      { name: "SamDU", value: 12 },
      { name: "Boshqa", value: 18 },
    ],
  },
  {
    id: "super-kontrakt",
    title: "Shartnoma summasi tekshiruvi",
    metric: "Noto'g'ri summa mosliklari",
    value: 23,
    severity: "yellow",
    description: "Shartnoma summasi belgilangan tarifga mos kelmaydigan holatlar. Qo'lda kiritish xatoliklari yoki tizim nosozliklari.",
    details: [
      { label: "Tekshirilgan shartnomalar", value: "787 674" },
      { label: "Noto'g'ri mosliklar", value: 23 },
      { label: "Xatolik foizi", value: "0.003%" },
      { label: "Farq summasi", value: "156 mln so'm" },
    ],
    chartData: [],
  },
  {
    id: "otm-debt-aging",
    title: "OTM qarz eskirishi",
    metric: "Maksimal kechikish kunlari",
    value: "365+",
    severity: "red",
    description: "OTMlar bo'yicha to'lov muddati o'tgan shartnomalar tahlili. Eng uzoq kechikish va umumiy qarz summasi.",
    details: [
      { label: "Jami qarzdor shartnomalar", value: "12 340" },
      { label: "90+ kun kechikkan", value: "3 456" },
      { label: "180+ kun kechikkan", value: "1 890" },
      { label: "O'rtacha kechikish kuni", value: "142 kun" },
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
    title: "To'lanmagan shartnomalar",
    metric: "0 to'lovli tasdiqlangan shartnomalar",
    value: "4 312",
    severity: "yellow",
    description: "Tasdiqlangan, lekin hech qanday to'lov amalga oshirilmagan shartnomalar. Kurs boshlangandan beri 0 so'm to'langan.",
    details: [
      { label: "Jami tasdiqlangan", value: "787 674" },
      { label: "To'lov qilinmagan shartnoma soni", value: "4 312" },
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

const severityConfig: Record<Severity, {
  color: string;
  lightBg: string;
  text: string;
  label: string;
  icon: React.ElementType;
  gradient: string;
  shadow: string;
}> = {
  red: {
    color: "hsl(0, 70%, 55%)",
    lightBg: "bg-red-500/5",
    text: "text-red-600 dark:text-red-400",
    label: "Yuqori xavf",
    icon: XCircle,
    gradient: "from-red-500/10 to-orange-500/5",
    shadow: "rgba(239,68,68,0.12)",
  },
  yellow: {
    color: "hsl(45, 90%, 50%)",
    lightBg: "bg-yellow-400/5",
    text: "text-yellow-600 dark:text-yellow-400",
    label: "O'rtacha xavf",
    icon: AlertTriangle,
    gradient: "from-yellow-400/10 to-amber-500/5",
    shadow: "rgba(250,204,21,0.12)",
  },
  green: {
    color: "hsl(142, 71%, 45%)",
    lightBg: "bg-emerald-500/5",
    text: "text-emerald-600 dark:text-emerald-400",
    label: "Normal",
    icon: CheckCircle,
    gradient: "from-emerald-500/10 to-green-500/5",
    shadow: "rgba(16,185,129,0.12)",
  },
};

const AnimatedRiskValue = ({ value, delay }: { value: string | number; delay: number }) => {
  const animated = useCountUp(String(value), 1400, delay);
  return <>{animated}</>;
};

const RiskDetailCard = ({ risk, index }: { risk: RiskDetail; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const cfg = severityConfig[risk.severity];
  const SeverityIcon = cfg.icon;

  const severityColor = risk.severity === "red" ? "hsl(0, 70%, 55%)" : risk.severity === "yellow" ? "hsl(45, 90%, 50%)" : "hsl(142, 71%, 45%)";

  return (
    <div
      className={`relative group animate-fade-in opacity-0`}
      style={{ animationDelay: `${0.1 + index * 0.08}s`, animationFillMode: "forwards" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow */}
      <div
        className="absolute -inset-1 rounded-2xl transition-all duration-500 blur-2xl pointer-events-none"
        style={{ background: severityColor, opacity: isHovered ? 0.08 : 0 }}
      />

      <div
        className="relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 group-hover:border-transparent"
        style={{ boxShadow: isHovered ? `0 12px 40px -12px ${cfg.shadow}` : 'none' }}
      >
        {/* Top accent */}
        <div className="h-1 transition-all duration-300 group-hover:h-1.5" style={{ background: `linear-gradient(90deg, ${severityColor}, ${severityColor}40)` }} />

        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: `linear-gradient(135deg, ${severityColor}18, ${severityColor}08)`,
                  border: `1.5px solid ${severityColor}30`,
                }}
              >
                <SeverityIcon className="w-5 h-5" style={{ color: severityColor }} />
                {risk.severity === "red" && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"
                  />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{risk.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{risk.metric}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className={`text-3xl font-bold tabular-nums ${cfg.text} transition-transform duration-300 inline-block`}
                  style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                >
                  <AnimatedRiskValue value={risk.value} delay={200 + index * 150} />
                </span>
              </div>
              <span
                className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-full border`}
                style={{
                  background: `${severityColor}10`,
                  color: severityColor,
                  borderColor: `${severityColor}25`,
                }}
              >
                {cfg.label}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{risk.description}</p>

          {/* Stats + Chart grid */}
          <div className={`grid gap-5 ${risk.chartData.length > 0 ? "grid-cols-1 lg:grid-cols-[1fr_1.2fr]" : "grid-cols-1"}`}>
            {/* Detail metrics */}
            <div className={`grid ${risk.chartData.length > 0 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"} gap-3`}>
              {risk.details.map((d, dIdx) => (
                <div
                  key={d.label}
                  className="rounded-xl border border-border/60 p-3.5 transition-all duration-300 hover:bg-accent/50 hover:border-border group/stat cursor-default"
                >
                  <p className="text-[11px] text-muted-foreground mb-1.5">{d.label}</p>
                  <p className="text-lg font-bold text-foreground tabular-nums">
                    <AnimatedRiskValue value={d.value} delay={400 + index * 150 + dIdx * 80} />
                  </p>
                </div>
              ))}
            </div>

            {/* Chart */}
            {risk.chartData.length > 0 && (
              <div className="h-52 rounded-xl border border-border/40 bg-muted/20 p-3">
                <ResponsiveContainer width="100%" height="100%">
                  {risk.chartType === "bar" ? (
                    <BarChart data={risk.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: 12,
                          fontSize: 12,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Bar dataKey="value" fill={severityColor} radius={[6, 6, 0, 0]} />
                    </BarChart>
                  ) : risk.chartType === "pie" ? (
                    <PieChart>
                      <Pie data={risk.chartData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={3}>
                        {risk.chartData.map((entry: any, idx: number) => (
                          <Cell key={idx} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: 12,
                          fontSize: 12,
                        }}
                      />
                    </PieChart>
                  ) : (
                    <AreaChart data={risk.chartData}>
                      <defs>
                        <linearGradient id={`risk-grad-${risk.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={severityColor} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={severityColor} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: 12,
                          fontSize: 12,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Area type="monotone" dataKey="count" stroke={severityColor} fill={`url(#risk-grad-${risk.id})`} strokeWidth={2.5} dot={{ r: 3, fill: severityColor }} activeDot={{ r: 5 }} />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RiskAnalysis = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState("2025-2026");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/15 to-orange-500/10 flex items-center justify-center border border-red-500/20">
                  <Shield className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Xavf tahlili · Salomatlik tekshiruvi</h1>
                  <p className="text-sm text-muted-foreground">Billing tizimi salomatligi — batafsil tahlil</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                {[
                  { count: redCount, label: "xavfli", color: "bg-red-500/10 text-red-500 border-red-500/20" },
                  { count: yellowCount, label: "ogohlantirish", color: "bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border-yellow-400/20" },
                ].map((b) => (
                  <span key={b.label} className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${b.color}`}>
                    {b.count} {b.label}
                  </span>
                ))}
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                  <Activity className="w-3.5 h-3.5" />
                  bugun, 09:30
                </span>
              </div>
            </div>
          </div>

          {/* Risk detail cards */}
          <div className="space-y-6">
            {riskDetails.map((risk, i) => (
              <RiskDetailCard key={risk.id} risk={risk} index={i} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RiskAnalysis;
