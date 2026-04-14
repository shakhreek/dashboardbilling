// Multipliers per OTM to simulate different data when an OTM is selected
const otmMultipliers: Record<string, { factor: number; label: string }> = {
  all: { factor: 1, label: "Barcha OTMlar" },
  "tashkent-iqtisodiyot": { factor: 0.14, label: "Toshkent davlat iqtisodiyot universiteti" },
  "tashkent-tibbiyot": { factor: 0.12, label: "Toshkent tibbiyot universiteti" },
  "samarqand-tibbiyot": { factor: 0.09, label: "Samarqand davlat tibbiyot universiteti" },
  "tashkent-yuridik": { factor: 0.08, label: "Toshkent davlat yuridik universiteti" },
  "uzmu": { factor: 0.11, label: "Mirzo Ulug'bek nomidagi O'zMU" },
  "andijon-tibbiyot": { factor: 0.07, label: "Andijon davlat tibbiyot instituti" },
  "fargona-dtu": { factor: 0.06, label: "Farg'ona davlat universiteti" },
  "buxoro-muhandislik": { factor: 0.05, label: "Buxoro muhandislik-texnologiya instituti" },
  "namangan-muhandislik": { factor: 0.04, label: "Namangan muhandislik-texnologiya instituti" },
};

export function getMultiplier(otm: string): number {
  return otmMultipliers[otm]?.factor ?? 1;
}

export function applyOtmFactor(value: number, otm: string): number {
  return Math.round(value * getMultiplier(otm));
}

export function applyOtmToStr(value: string, otm: string): string {
  if (otm === "all") return value;
  const factor = getMultiplier(otm);
  // Parse numeric part from string like "142 850" or "3 210 mlrd" or "1.54 mln"
  const numMatch = value.match(/^([\d\s.,]+)/);
  if (!numMatch) return value;
  const rawNum = numMatch[1].replace(/\s/g, "").replace(",", ".");
  const num = parseFloat(rawNum);
  if (isNaN(num)) return value;
  const scaled = num * factor;
  const suffix = value.slice(numMatch[0].length);
  // Format with spaces for thousands
  const formatted = scaled >= 1000
    ? Math.round(scaled).toLocaleString("ru-RU").replace(/,/g, " ")
    : scaled % 1 === 0
      ? Math.round(scaled).toLocaleString("ru-RU").replace(/,/g, " ")
      : scaled.toFixed(2);
  return `${formatted}${suffix}`;
}

export function scaleChartData<T extends Record<string, unknown>>(
  data: T[],
  otm: string,
  numericKeys: string[]
): T[] {
  if (otm === "all") return data;
  const factor = getMultiplier(otm);
  return data.map((item) => {
    const scaled = { ...item };
    for (const key of numericKeys) {
      if (typeof scaled[key] === "number") {
        (scaled as Record<string, unknown>)[key] = Math.round((scaled[key] as number) * factor);
      }
    }
    return scaled;
  });
}
