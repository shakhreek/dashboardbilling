export interface StatCardSubLine {
  label: string;
  value: string;
}

export interface StatCard {
  label: string;
  value: string;
  icon: string;
  color: string;
  valueLabel?: string;
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
  { label: "OTM va talabalar", value: "171", icon: "Landmark", color: "purple", valueLabel: "OTM soni", subLabel: "Talabalar soni", subValue: "1 247 832" },
  { label: "To'lov kontrakt", value: "787 674", icon: "FileSignature", color: "blue", valueLabel: "Kontraktda o'qiydigan talabalar soni", subLines: [
    { label: "Arizalar soni", value: "1 022 696" },
    { label: "Summasi", value: "14 440 mlrd" },
  ]},
  { label: "Kredit modul", value: "142 850", icon: "CreditCard", color: "rose", valueLabel: "Arizalar soni", subLines: [
    { label: "Arizalar soni", value: "1 774 007" },
    { label: "Summasi", value: "3 210 mlrd" },
  ]},
  { label: "Talabalar turar joyi", value: "48 920", icon: "Building", color: "cyan", valueLabel: "Turuvchilar soni", subLines: [
    { label: "Arizalar soni", value: "52 340" },
    { label: "Summasi", value: "890 mlrd" },
  ]},
];

// Oylik to'lov summalari (mlrd so'm)
export const chartData = [
  { month: "Sentabr", shartnoma: 1850, kredit: 180, yotoqxona: 95 },
  { month: "Oktabr", shartnoma: 2240, kredit: 220, yotoqxona: 110 },
  { month: "Noyabr", shartnoma: 1620, kredit: 280, yotoqxona: 85 },
  { month: "Dekabr", shartnoma: 1380, kredit: 310, yotoqxona: 70 },
  { month: "Yanvar", shartnoma: 1150, kredit: 340, yotoqxona: 65 },
  { month: "Fevral", shartnoma: 980, kredit: 290, yotoqxona: 60 },
  { month: "Mart", shartnoma: 1240, kredit: 350, yotoqxona: 75 },
  { month: "Aprel", shartnoma: 890, kredit: 320, yotoqxona: 55 },
  { month: "May", shartnoma: 720, kredit: 280, yotoqxona: 50 },
  { month: "Iyun", shartnoma: 540, kredit: 240, yotoqxona: 45 },
  { month: "Iyul", shartnoma: 1420, kredit: 200, yotoqxona: 80 },
  { month: "Avgust", shartnoma: 1310, kredit: 200, yotoqxona: 100 },
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
