export interface StatCardSubLine {
  label: string;
  value: string;
}

export interface StatCard {
  label: string;
  value: string;
  icon: string;
  color: string;
  subLabel?: string;
  subValue?: string;
  subLines?: StatCardSubLine[];
}

export interface ModuleRow {
  name: string;
  icon: string;
  contracts: number;
  paidSum: string;
  debt: string;
}

export const statCards: StatCard[] = [
  { label: "OTM lar", value: "171", icon: "BarChart3", color: "purple", subLabel: "Talabalar soni", subValue: "1 247 832" },
  { label: "Kontrakt", value: "787 674", icon: "FileText", color: "blue", subLines: [
    { label: "Shartnomalar soni", value: "1 022 696" },
    { label: "Summasi", value: "14 440 mlrd" },
  ]},
  { label: "Kredit", value: "142 850", icon: "HandCoins", color: "rose", subLines: [
    { label: "To'lovlar soni", value: "1 774 007" },
    { label: "Summasi", value: "3 210 mlrd" },
  ]},
  { label: "TTJ", value: "48 920", icon: "CircleDollarSign", color: "cyan", subLines: [
    { label: "Shartnomalar soni", value: "52 340" },
    { label: "Summasi", value: "890 mlrd" },
  ]},
  { label: "Talabalar soni", value: "48 920", icon: "GraduationCap", color: "green", subLabel: "Ijaradagilar • 2 100 mlrd", subValue: "18 900" },
];

export const chartData = [
  { month: "Sentabr", shartnoma: 358620, kredit: 1200, yotoqxona: 800 },
  { month: "Oktabr", shartnoma: 286696, kredit: 2100, yotoqxona: 1500 },
  { month: "Noyabr", shartnoma: 95000, kredit: 5200, yotoqxona: 3200 },
  { month: "Dekabr", shartnoma: 42000, kredit: 8400, yotoqxona: 5800 },
  { month: "Yanvar", shartnoma: 28000, kredit: 15200, yotoqxona: 12000 },
  { month: "Fevral", shartnoma: 18000, kredit: 35600, yotoqxona: 25000 },
  { month: "Mart", shartnoma: 12000, kredit: 52000, yotoqxona: 38000 },
  { month: "Aprel", shartnoma: 8000, kredit: 58000, yotoqxona: 42000 },
  { month: "May", shartnoma: 5000, kredit: 62000, yotoqxona: 48000 },
  { month: "Iyun", shartnoma: 3500, kredit: 64000, yotoqxona: 52000 },
  { month: "Iyul", shartnoma: 72000, kredit: 68000, yotoqxona: 55000 },
  { month: "Avgust", shartnoma: 45000, kredit: 70000, yotoqxona: 58000 },
];

export const moduleRows: ModuleRow[] = [
  { name: "To'lov kontrakt", icon: "📝", contracts: 787674, paidSum: "14 440 mlrd", debt: "7 187 mlrd" },
  { name: "Kredit modul", icon: "💳", contracts: 142850, paidSum: "3 210 mlrd", debt: "1 540 mlrd" },
  { name: "TTJ", icon: "🏠", contracts: 48920, paidSum: "890 mlrd", debt: "320 mlrd" },
  { name: "Stipendiya", icon: "🎓", contracts: 23400, paidSum: "3 600 mlrd", debt: "0" },
  { name: "Ijara", icon: "🏢", contracts: 18900, paidSum: "2 100 mlrd", debt: "450 mlrd" },
  { name: "TTJ Subsidiya", icon: "🏛️", contracts: 27800, paidSum: "4 500 mlrd", debt: "980 mlrd" },
];

export const sidebarSections = [
  {
    title: "IJARA (VM-605)",
    items: ["Ma'lumotlar", "Hujjatlar", "Hisobotlar"],
  },
  {
    title: "TTJ SUBSIDIYA (VM-32)",
    items: ["Ma'lumotlar", "Hujjatlar", "Hisobotlar"],
  },
  {
    title: "MAGISTR QIZLAR (VM-447)",
    items: ["Hujjatlar"],
  },
  {
    title: "MODDIY QO'LLAB-QUVVATLASH (VM-585)",
    items: ["OTM ma'sullari", "Yoriqnomalar", "Texnik qo'llab quvvatlash"],
  },
];

export const academicYears = ["2025-2026", "2024-2025", "2023-2024"];

export const kontraktChartData = [
  { faculty: "Iqtisodiyot", contracts: 2340 },
  { faculty: "Huquq", contracts: 1890 },
  { faculty: "Tibbiyot", contracts: 2780 },
  { faculty: "Pedagogika", contracts: 1560 },
  { faculty: "IT", contracts: 2660 },
];

export const kreditPieData = [
  { name: "To'langan", value: 65, fill: "hsl(270, 70%, 55%)" },
  { name: "Jarayonda", value: 20, fill: "hsl(270, 50%, 75%)" },
  { name: "Kechikkan", value: 15, fill: "hsl(0, 70%, 60%)" },
];

export const ttjOccupancy = { total: 5200, occupied: 4520 };

export const stipendiyaDonutData = [
  { name: "Beshlik", value: 980, fill: "hsl(45, 90%, 50%)" },
  { name: "To'rtlik", value: 870, fill: "hsl(35, 80%, 55%)" },
  { name: "Prezident", value: 490, fill: "hsl(25, 85%, 50%)" },
];

export const ijaraLineData = [
  { month: "Yan", amount: 180 },
  { month: "Fev", amount: 195 },
  { month: "Mar", amount: 210 },
  { month: "Apr", amount: 175 },
  { month: "May", amount: 220 },
  { month: "Iyun", amount: 190 },
  { month: "Iyul", amount: 160 },
  { month: "Avg", amount: 200 },
  { month: "Sen", amount: 230 },
  { month: "Okt", amount: 215 },
  { month: "Noy", amount: 205 },
  { month: "Dek", amount: 225 },
];

export const ttjSubsidiyaFunnelData = [
  { stage: "Yangi arizalar", count: 2780 },
  { stage: "Tasdiqlangan", count: 2340 },
  { stage: "To'langan", count: 2100 },
];
