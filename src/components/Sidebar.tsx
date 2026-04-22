import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, FileText, Phone, Clock, Sparkles } from "lucide-react";
import { sidebarSections } from "@/data/dashboardData";

const Sidebar = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const toggle = (key: string) =>
    setExpanded((p) => ({ ...p, [key]: !p[key] }));

  return (
    <aside className="w-[260px] h-screen sticky top-0 flex-shrink-0 flex flex-col"
      style={{ background: "hsl(225, 30%, 16%)" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: "hsl(225, 20%, 25%)" }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "hsl(217, 91%, 60%)" }}>
          <span className="text-lg font-bold" style={{ color: "white" }}>E</span>
        </div>
        <div>
          <p className="font-bold text-sm" style={{ color: "white" }}>EDU</p>
          <p className="text-xs" style={{ color: "hsl(220, 20%, 60%)" }}>Billing</p>
        </div>
      </div>

      {/* Nav Sections */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {sidebarSections.map((section) => (
          <div key={section.title} className="mb-1">
            <p className="px-5 py-2.5 text-xs font-bold tracking-wide" style={{ color: "white" }}>
              {section.title}
            </p>
            {section.items.map((item) => (
              <button
                key={item}
                onClick={() => toggle(`${section.title}-${item}`)}
                className="w-full flex items-center justify-between px-5 py-2 text-sm transition-colors hover:bg-white/5"
                style={{ color: "hsl(220, 20%, 70%)" }}
              >
                <span className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" />
                  {item}
                </span>
                {expanded[`${section.title}-${item}`] ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t space-y-3" style={{ borderColor: "hsl(225, 20%, 25%)" }}>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ background: "hsl(225, 25%, 20%)" }}>
          <Clock className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(217, 91%, 65%)" }} />
          <div>
            <p className="text-xs font-semibold" style={{ color: "white" }}>09:30 - 18:00</p>
            <p className="text-[10px]" style={{ color: "hsl(220, 20%, 55%)" }}>Dushanba - Juma</p>
          </div>
        </div>
        <div className="space-y-1.5 px-1">
          <a href="tel:998712031324" className="flex items-center gap-2.5 text-xs py-1 rounded transition-colors hover:text-white" style={{ color: "hsl(220, 20%, 65%)" }}>
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <span>99871-203-13-24</span>
          </a>
          <a href="tel:998712031322" className="flex items-center gap-2.5 text-xs py-1 rounded transition-colors hover:text-white" style={{ color: "hsl(220, 20%, 65%)" }}>
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <span>99871-203-13-22</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
