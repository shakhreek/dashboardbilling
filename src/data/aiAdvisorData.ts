// Demo ma'lumotlar — AI Maslahatchi sahifasi uchun
export interface RiskStudent {
  id: string;
  name: string;
  faculty: string;
  course: number;
  contractAmount: number; // mln so'm
  paid: number; // mln so'm
  daysLate: number;
  paymentHistory: string; // qisqa tavsif
  region: string;
}

export const demoRiskStudents: RiskStudent[] = [
  {
    id: "T-2024-001",
    name: "Aliyev Sardor",
    faculty: "Iqtisodiyot",
    course: 3,
    contractAmount: 14.4,
    paid: 4.2,
    daysLate: 67,
    paymentHistory: "So'nggi 3 semestrda 2 marta kechikkan",
    region: "Toshkent sh.",
  },
  {
    id: "T-2024-002",
    name: "Karimova Dilnoza",
    faculty: "Tibbiyot",
    course: 4,
    contractAmount: 22.0,
    paid: 18.5,
    daysLate: 12,
    paymentHistory: "Doimo o'z vaqtida to'laydi",
    region: "Samarqand",
  },
  {
    id: "T-2024-003",
    name: "Rahimov Otabek",
    faculty: "IT",
    course: 2,
    contractAmount: 16.8,
    paid: 3.0,
    daysLate: 95,
    paymentHistory: "Qarzdor talabalar ro'yxatida 2 yildan beri",
    region: "Farg'ona",
  },
  {
    id: "T-2024-004",
    name: "Yusupova Zarina",
    faculty: "Pedagogika",
    course: 1,
    contractAmount: 9.6,
    paid: 9.6,
    daysLate: 0,
    paymentHistory: "Yangi qabul, to'liq to'lagan",
    region: "Andijon",
  },
  {
    id: "T-2024-005",
    name: "Norqulov Jasur",
    faculty: "Huquq",
    course: 4,
    contractAmount: 18.2,
    paid: 6.8,
    daysLate: 45,
    paymentHistory: "Qisman to'lov, oilaviy qiyinchilik",
    region: "Buxoro",
  },
  {
    id: "T-2024-006",
    name: "Saidova Madina",
    faculty: "Iqtisodiyot",
    course: 2,
    contractAmount: 14.4,
    paid: 7.2,
    daysLate: 28,
    paymentHistory: "Bo'lib to'lash rejimida",
    region: "Toshkent vil.",
  },
  {
    id: "T-2024-007",
    name: "Toshmatov Bobur",
    faculty: "IT",
    course: 3,
    contractAmount: 16.8,
    paid: 16.8,
    daysLate: 0,
    paymentHistory: "Stipendiyat oluvchi, o'z vaqtida",
    region: "Toshkent sh.",
  },
  {
    id: "T-2024-008",
    name: "Mamatova Sevara",
    faculty: "Tibbiyot",
    course: 5,
    contractAmount: 22.0,
    paid: 5.5,
    daysLate: 120,
    paymentHistory: "Uzoq muddatli qarzdor, aloqa qiyin",
    region: "Qoraqalpog'iston",
  },
];

// AI insights uchun joriy moliyaviy snapshot
export const financialSnapshot = {
  jamiTalabalar: 1247832,
  jamiKontraktSummasi: "14 440 mlrd so'm",
  jamiTolanganSummasi: "7 253 mlrd so'm",
  jamiQarzdorlik: "1 890 mlrd so'm",
  qarzdorTalabalarSoni: 14523,
  modullar: {
    kontrakt: { kechikish: "23%", talabalar: 787674 },
    kredit: { kechikish: "31%", talabalar: 142850 },
    ttj: { boshJoylar: "12%", joylar: 5200, band: 4520 },
    stipendiya: { oluvchilar: 23400 },
    ijara: { oluvchilar: 18900, oylik: "190 mlrd so'm" },
    ttjSubsidiya: { oluvchilar: 27800, kutilayotgan: 680 },
  },
  trend: {
    sentabrFebral: "to'lovlar 38% kamaygan",
    fakultetlar: {
      iqtisodiyot: "qarzdorlik +18%",
      it: "qarzdorlik +24%",
      tibbiyot: "qarzdorlik -5%",
      pedagogika: "qarzdorlik +9%",
    },
  },
};
