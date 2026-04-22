// AI Advisor edge function — Lovable AI Gateway orqali 3 xil rejim
// mode: "chat" | "insights" | "risk"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPTS: Record<string, string> = {
  chat: `Siz O'zbekiston OTM (oliy ta'lim muassasalari) uchun moliyaviy AI maslahatchisiz. 
Sizga universitet to'lovlari, kontraktlar, kredit, TTJ, stipendiya, ijara va qarzdorlik bo'yicha savollar beriladi.
Javoblaringiz: aniq, qisqa, raqamlar bilan, faqat o'zbek tilida (lotin yozuvida).
Agar ma'lumot yetarli bo'lmasa, taxmin qilmang — qo'shimcha kontekst so'rang.
Tavsiyalar bersangiz, har birini "→" belgisi bilan boshlang.`,

  insights: `Siz OTM rahbariyati uchun moliyaviy ma'lumotlarni tahlil qilib, qisqa amaliy tavsiyalar beruvchi AI tahlilchisiz.
Berilgan ma'lumotlar asosida 4-5 ta eng muhim tavsiya yarating.
Har bir tavsiya: aniq muammo + raqam + amaliy harakat ko'rsatmasi bo'lsin.
Faqat o'zbek tilida (lotin yozuvida) javob bering.`,

  risk: `Siz talabaning qarzdorlik xavfini bashorat qiluvchi AI modelisiz.
Berilgan talaba ma'lumotlari asosida 0-100 oralig'ida xavf balli va qisqa tushuntirish bering.
Faqat o'zbek tilida (lotin yozuvida) javob bering.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mode = "chat", messages, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = SYSTEM_PROMPTS[mode] ?? SYSTEM_PROMPTS.chat;

    // Build messages
    let chatMessages: Array<{ role: string; content: string }> = [];

    if (mode === "insights") {
      chatMessages = [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Quyidagi joriy moliyaviy ma'lumotlar asosida 4-5 ta amaliy tavsiya bering. Har birida: aniq muammo, raqam, va konkret harakat ko'rsatma. JSON formatida qaytaring: {"insights": [{"title": "...", "description": "...", "severity": "high|medium|low", "category": "kontrakt|kredit|ttj|stipendiya|ijara"}]}\n\nMa'lumotlar:\n${JSON.stringify(context, null, 2)}`,
        },
      ];
    } else if (mode === "risk") {
      chatMessages = [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Quyidagi talabalar ro'yxati uchun har biriga qarzdorlik xavfi bahosini bering. JSON formatida qaytaring: {"risks": [{"id": "...", "name": "...", "score": 0-100, "level": "high|medium|low", "reason": "qisqa sabab"}]}\n\nTalabalar:\n${JSON.stringify(context, null, 2)}`,
        },
      ];
    } else {
      chatMessages = [
        { role: "system", content: systemPrompt },
        ...(messages ?? []),
      ];
    }

    const wantJson = mode === "insights" || mode === "risk";

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: chatMessages,
          stream: !wantJson,
          ...(wantJson ? { response_format: { type: "json_object" } } : {}),
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error:
              "So'rovlar limiti oshib ketdi, biroz kutib, qaytadan urinib ko'ring.",
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({
            error:
              "Lovable AI kreditingiz tugagan. Settings → Workspace → Usage bo'limidan to'ldiring.",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "AI xizmatida xatolik yuz berdi" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (wantJson) {
      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content ?? "{}";
      let parsed: unknown = {};
      try {
        parsed = JSON.parse(content);
      } catch {
        parsed = { raw: content };
      }
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // streaming chat
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-advisor error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Noma'lum xatolik",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
