const DonutGauge = ({ percentage = 79 }: { percentage?: number }) => {
  const remaining = 100 - percentage;
  const circumference = 2 * Math.PI * 52;
  const strokeDash = (percentage / 100) * circumference;

  return (
    <div className="bg-card rounded-xl border border-border p-5 flex flex-col items-center justify-center">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(214, 32%, 91%)" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="52" fill="none"
            stroke="hsl(260, 70%, 55%)"
            strokeWidth="8"
            strokeDasharray={`${strokeDash} ${circumference}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">{percentage}%</span>
          <span className="text-xs text-muted-foreground">Shartnoma olganlar</span>
        </div>
      </div>
      <div className="mt-4 w-full">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-muted-foreground">Shartnoma olmaganlar</span>
          <span className="font-semibold" style={{ color: "hsl(0, 70%, 55%)" }}>{remaining}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-secondary">
          <div className="h-full rounded-full" style={{ width: `${remaining}%`, background: "hsl(0, 70%, 55%)" }} />
        </div>
      </div>
    </div>
  );
};

export default DonutGauge;
