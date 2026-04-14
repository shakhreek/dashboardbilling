const partners = [
  { name: "O'zbekiston Respublikasi Iqtisodiyot va Moliya Vazirligi", short: "Moliya Vazirligi" },
  { name: "O'zbekiston Respublikasi Markaziy banki", short: "Markaziy bank" },
  { name: "AloqaBank", short: "AloqaBank" },
  { name: "UDASBO", short: "UDASBO" },
  { name: "HEMIS", short: "HEMIS" },
  { name: "Yoshlar ishlari agentligi", short: "Yoshlar agentligi" },
  { name: "my.gov.uz", short: "my.gov.uz" },
  { name: "O'zbekiston Respublikasi OTM", short: "OTM" },
];

const PartnersSection = () => {
  return (
    <div className="py-8 px-4">
      <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 py-6 px-8">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-center mb-6">
          Hamkorlar
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              <div className="w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center">
                <span className="text-[10px] font-bold text-muted-foreground">
                  {partner.short.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                {partner.short}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
