import { Sparkles, ArrowRight, Brain, MessageSquare, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AiAdvisorWidget = () => {
  const navigate = useNavigate();

  return (
    <Card
      className="relative overflow-hidden p-5 cursor-pointer group hover:shadow-xl transition-all border-0"
      onClick={() => navigate("/ai-maslahatchi")}
    >
      {/* Gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-blue-600" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />

      <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-white text-base">AI Moliyaviy Maslahatchi</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                YANGI
              </span>
            </div>
            <p className="text-xs text-white/80">
              Qarzdorlik bashorati · Smart tavsiyalar · AI Chat
            </p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="flex items-center gap-1 text-[11px] text-white/90">
                <Brain className="w-3 h-3" /> Risk Score
              </span>
              <span className="flex items-center gap-1 text-[11px] text-white/90">
                <Shield className="w-3 h-3" /> Tavsiyalar
              </span>
              <span className="flex items-center gap-1 text-[11px] text-white/90">
                <MessageSquare className="w-3 h-3" /> Chat
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="bg-white text-violet-700 hover:bg-white/90 group-hover:translate-x-1 transition-transform"
        >
          Ochish
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
};

export default AiAdvisorWidget;
