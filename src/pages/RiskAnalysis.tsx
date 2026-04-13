import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, XCircle, Activity, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import HeaderBar from "@/components/HeaderBar";
import dashboardBg from "@/assets/dashboard-bg.jpg";
import { useCountUp } from "@/hooks/useCountUp";

const qarzdorStudents = [
  { name: "Abdullayev Jasur", otm: "TDIU" },
  { name: "Karimova Nilufar", otm: "TDIU" },
  { name: "Rahimov Sardor", otm: "TATU" },
  { name: "Xasanova Madina", otm: "SamDU" },
  { name: "Toshmatov Bekzod", otm: "TDIU" },
  { name: "Ergasheva Zulfiya", otm: "NamMQI" },
  { name: "Mirzayev Otabek", otm: "TATU" },
  { name: "Sultonova Dilfuza", otm: "BuxDU" },
  { name: "Qodirov Azizbek", otm: "TDIU" },
  { name: "Nazarova Shoira", otm: "SamDU" },
  { name: "Yusupov Ulugbek", otm: "TDIU" },
  { name: "Aliyeva Kamola", otm: "TATU" },
];

type Severity = "red" | "yellow" | "green";

interface RiskDetail {
  id: string;
  title: string;
  metric: string;
  value: string | number;
  severity: Severity;
  description: string;
  details: { label: string; value: string | number }[];
}

const riskDetails: RiskDetail[] = [
  {
    id: "qayta-taqsimot",
    title: "Qayta taqsimot tahlili",
    metric: "Nomuvofiqliklar soni",
    value: "1 247",
    severity: "red",
    description: "Shartnoma summalarida aniqlangan nomuvofiqliklar. OTMlar bo'yicha taqsimot summasi va hujjatlardagi summa o'rtasidagi farqlar.",
    details: [
      { label: "Talabalar soni", value: "45 320" },
      { label: "Nomuvofiqliklar soni", value: "1 247" },
      { label: "Nomuvofiqlik foizi", value: "2.75%" },
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
  },
  {
    id: "super-kontrakt",
    title: "Tabaqalashtirilgan shartnomalar tahlili",
    metric: "Noto'g'ri summa mosliklari",
    value: 23,
    severity: "yellow",
    description: "Shartnoma summasi belgilangan tarifga mos kelmaydigan holatlar. Noto'g'ri tabaqalashtirilgan shartnomalar tahlili.",
    details: [
      { label: "Tekshirilgan shartnomalar", value: "787 674" },
      { label: "Noto'g'ri mosliklar", value: 23 },
      { label: "Xatolik foizi", value: "0.003%" },
      { label: "Farq summasi", value: "156 mln so'm" },
    ],
  },
  {
    id: "otm-debt-aging",
    title: "Qarzdor talabalar tahlili",
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
  },
  {
    id: "unpaid-contracts",
    title: "To'lov qilinmagan shartnomalar tahlili",
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
  },
];

const severityConfig: Record<Severity, {
  color: string;
  text: string;
  label: string;
  icon: React.ElementType;
  shadow: string;
}> = {
  red: {
    color: "hsl(0, 70%, 55%)",
    text: "text-red-600 dark:text-red-400",
    label: "Yuqori xavf",
    icon: XCircle,
    shadow: "rgba(239,68,68,0.12)",
  },
  yellow: {
    color: "hsl(45, 90%, 50%)",
    text: "text-yellow-600 dark:text-yellow-400",
    label: "O'rtacha xavf",
    icon: AlertTriangle,
    shadow: "rgba(250,204,21,0.12)",
  },
  green: {
    color: "hsl(142, 71%, 45%)",
    text: "text-emerald-600 dark:text-emerald-400",
    label: "Normal",
    icon: CheckCircle,
    shadow: "rgba(16,185,129,0.12)",
  },
};

const AnimatedRiskValue = ({ value, delay }: { value: string | number; delay: number }) => {
  const animated = useCountUp(String(value), 1400, delay);
  return <>{animated}</>;
};

const RiskDetailCard = ({ risk, index }: { risk: RiskDetail; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isQarzdor = risk.id === "otm-debt-aging";
  const cfg = severityConfig[risk.severity];
  const SeverityIcon = cfg.icon;
  const severityColor = cfg.color;

  return (
    <div
      className="relative group animate-fade-in opacity-0"
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
                className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: `linear-gradient(135deg, ${severityColor}18, ${severityColor}08)`,
                  border: `1.5px solid ${severityColor}30`,
                }}
              >
                <SeverityIcon className="w-5 h-5" style={{ color: severityColor }} />
                {risk.severity === "red" && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{risk.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{risk.metric}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-3xl font-bold tabular-nums ${cfg.text} transition-transform duration-300 inline-block`}
                style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
              >
                <AnimatedRiskValue value={risk.value} delay={200 + index * 150} />
              </span>
              <span
                className="text-[11px] font-semibold px-2.5 py-1.5 rounded-full border"
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

          {/* Detail metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {risk.details.map((d, dIdx) => {
              const isClickable = isQarzdor && d.label === "Jami qarzdor shartnomalar";
              return (
                <div
                  key={d.label}
                  className={`rounded-xl border border-border/60 p-3.5 transition-all duration-300 hover:bg-accent/50 hover:border-border ${isClickable ? 'cursor-pointer ring-1 ring-transparent hover:ring-red-500/30' : 'cursor-default'}`}
                  onClick={isClickable ? () => setIsExpanded(!isExpanded) : undefined}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: severityColor, opacity: 0.5 }} />
                    <p className="text-[11px] text-muted-foreground">{d.label}</p>
                    {isClickable && (
                      <ChevronDown
                        className="w-3 h-3 text-muted-foreground ml-auto transition-transform duration-300"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    )}
                  </div>
                  <p className="text-lg font-bold text-foreground tabular-nums">
                    <AnimatedRiskValue value={d.value} delay={400 + index * 150 + dIdx * 80} />
                  </p>
                </div>
              );
            })}
          </div>

          {/* Expandable table for Qarzdor talabalar */}
          <AnimatePresence>
            {isQarzdor && isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-xl border border-border/60 overflow-hidden">
                  <div className="max-h-52 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm">
                        <tr>
                          <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">#</th>
                          <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Talaba ismi</th>
                          <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">OTM nomi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {qarzdorStudents.map((s, i) => (
                          <tr key={i} className="border-t border-border/40 hover:bg-accent/30 transition-colors">
                            <td className="px-4 py-2 text-xs text-muted-foreground">{i + 1}</td>
                            <td className="px-4 py-2 text-foreground font-medium">{s.name}</td>
                            <td className="px-4 py-2 text-muted-foreground">{s.otm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end px-4 py-2 border-t border-border/40 bg-muted/30">
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/50"
                    >
                      Yopish
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
