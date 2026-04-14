import { useEffect, useRef, useState } from "react";
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

// Triple the array for seamless infinite scroll
const infinitePartners = [...partners, ...partners, ...partners];

const PartnersSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let pos = el.scrollWidth / 3; // start at middle set
    el.scrollLeft = pos;

    const speed = 0.5;

    const animate = () => {
      pos += speed;
      // Reset to middle set seamlessly
      if (pos >= (el.scrollWidth / 3) * 2) {
        pos -= el.scrollWidth / 3;
      }
      el.scrollLeft = pos;
      setScrollLeft(pos);
      setContainerWidth(el.clientWidth);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const getOpacity = (index: number) => {
    const el = scrollRef.current;
    if (!el) return 0.15;

    const itemWidth = 180;
    const gap = 64;
    const itemCenter = index * (itemWidth + gap) + itemWidth / 2 - scrollLeft;
    const center = containerWidth / 2;
    const distance = Math.abs(itemCenter - center);
    const maxDistance = containerWidth / 2;

    // Closer to center = more opaque (1.0), edges = dim (0.15)
    const ratio = 1 - Math.min(distance / maxDistance, 1);
    return 0.15 + ratio * 0.85;
  };

  const getGrayscale = (index: number) => {
    const opacity = getOpacity(index);
    // More centered = less grayscale
    return `grayscale(${Math.round((1 - (opacity - 0.15) / 0.85) * 100)}%)`;
  };

  return (
    <div className="bg-white rounded-2xl border border-border/50 py-8 px-2 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex items-center gap-16 overflow-hidden"
        style={{ scrollBehavior: "auto" }}
      >
        {infinitePartners.map((partner, i) => (
          <div
            key={`${partner.name}-${i}`}
            className="flex-shrink-0 flex items-center justify-center transition-opacity duration-100"
            style={{
              width: 180,
              opacity: getOpacity(i),
              filter: getGrayscale(i),
            }}
            title={partner.name}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              loading="lazy"
              className="h-20 md:h-24 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
