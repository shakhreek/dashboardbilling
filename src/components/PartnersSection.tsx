import moliyaLogo from "@/assets/partners/moliya-vazirligi.png";
import markaziyBankLogo from "@/assets/partners/markaziy-bank.png";
import aloqabankLogo from "@/assets/partners/aloqabank.png";
import uzasboLogo from "@/assets/partners/uzasbo.png";
import hemisLogo from "@/assets/partners/hemis.png";
import yoshlarLogo from "@/assets/partners/yoshlar.png";
import mygovuzLogo from "@/assets/partners/mygovuz.png";

const partners = [
  { name: "Iqtisodiyot va Moliya Vazirligi", logo: moliyaLogo },
  { name: "Markaziy banki", logo: markaziyBankLogo },
  { name: "AloqaBank", logo: aloqabankLogo },
  { name: "UzASBO", logo: uzasboLogo },
  { name: "HEMIS", logo: hemisLogo },
  { name: "Yoshlar ishlari agentligi", logo: yoshlarLogo },
  { name: "my.gov.uz", logo: mygovuzLogo },
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
              className="opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-default"
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
