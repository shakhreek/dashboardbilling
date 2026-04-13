export interface ModuleMetric {
  label: string;
  value: string | number;
}

export interface ModuleData {
  id: string;
  title: string;
  icon: string;
  theme: string;
  metrics: ModuleMetric[];
}

export const modules: ModuleData[] = [
  {
    id: "kontrakt",
    title: "Kontrakt",
    icon: "FileText",
    theme: "blue",
    metrics: [
      { label: "Arizalar soni", value: 12450 },
      { label: "Tasdiqlangan shartnomalar soni", value: 11230 },
      { label: "Jami shartnoma summasi", value: "45.2 mlrd so'm" },
      { label: "To'langan summa", value: "38.7 mlrd so'm" },
    ],
  },
  {
    id: "kredit",
    title: "Kredit modul",
    icon: "CreditCard",
    theme: "purple",
    metrics: [
      { label: "Arizalar soni", value: 3420 },
      { label: "Shartnomalar soni", value: 2870 },
      { label: "Shartnoma summasi", value: "12.8 mlrd so'm" },
      { label: "To'lovlar", value: "9.4 mlrd so'm" },
    ],
  },
  {
    id: "ttj",
    title: "TTJ",
    icon: "Building2",
    theme: "green",
    metrics: [
      { label: "Arizalar soni", value: 5670 },
      { label: "Shartnomalar soni", value: 4890 },
      { label: "Shartnoma summasi", value: "8.3 mlrd so'm" },
      { label: "To'lovlar", value: "7.1 mlrd so'm" },
      { label: "TTJda turgan talabalar soni", value: 4520 },
    ],
  },
  {
    id: "stipendiya",
    title: "Stipendiya",
    icon: "Award",
    theme: "amber",
    metrics: [
      { label: "Stipendiya oluvchilar soni", value: 2340 },
      { label: "Jami to'lanadigan summa", value: "3.6 mlrd so'm" },
    ],
  },
  {
    id: "ijara",
    title: "Ijara",
    icon: "Home",
    theme: "rose",
    metrics: [
      { label: "Arizalar soni", value: 1890 },
      { label: "Jami to'lanadigan summa", value: "2.1 mlrd so'm" },
      { label: "Ijara subsidiyasi oladigan talabalar soni", value: 1450 },
    ],
  },
  {
    id: "ttj-subsidiya",
    title: "TTJ Subsidiya",
    icon: "Landmark",
    theme: "indigo",
    metrics: [
      { label: "Arizalar soni", value: 2780 },
      { label: "To'lanadigan summa", value: "4.5 mlrd so'm" },
      { label: "Subsidiya oluvchilar soni", value: 2340 },
    ],
  },
];

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

export const academicYears = [
  "2024-2025",
  "2023-2024",
  "2022-2023",
];

export const faculties = [
  "Barcha fakultetlar",
  "Iqtisodiyot",
  "Huquq",
  "Tibbiyot",
  "Pedagogika",
  "IT va dasturlash",
];
