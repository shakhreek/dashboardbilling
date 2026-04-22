import { supabase } from "@/integrations/supabase/client";

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-advisor`;

type ChatMsg = { role: "user" | "assistant"; content: string };

export async function callAiInsights(context: unknown) {
  const { data, error } = await supabase.functions.invoke("ai-advisor", {
    body: { mode: "insights", context },
  });
  if (error) throw error;
  return data as {
    insights?: Array<{
      title: string;
      description: string;
      severity: "high" | "medium" | "low";
      category: string;
    }>;
    error?: string;
  };
}

export async function callAiRisk(students: unknown) {
  const { data, error } = await supabase.functions.invoke("ai-advisor", {
    body: { mode: "risk", context: students },
  });
  if (error) throw error;
  return data as {
    risks?: Array<{
      id: string;
      name: string;
      score: number;
      level: "high" | "medium" | "low";
      reason: string;
    }>;
    error?: string;
  };
}

export async function streamAiChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: ChatMsg[];
  onDelta: (chunk: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  try {
    const resp = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ mode: "chat", messages }),
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        onError("So'rovlar limiti oshib ketdi. Biroz kutib qaytadan urinib ko'ring.");
        return;
      }
      if (resp.status === 402) {
        onError("AI kreditingiz tugagan. Workspace sozlamalaridan to'ldiring.");
        return;
      }
      onError("AI bilan bog'lanishda xatolik yuz berdi.");
      return;
    }

    if (!resp.body) {
      onError("Javob bo'sh keldi.");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let done = false;

    while (!done) {
      const { done: streamDone, value } = await reader.read();
      if (streamDone) break;
      buffer += decoder.decode(value, { stream: true });

      let nlIdx: number;
      while ((nlIdx = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, nlIdx);
        buffer = buffer.slice(nlIdx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.trim() || line.startsWith(":")) continue;
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") {
          done = true;
          break;
        }
        try {
          const parsed = JSON.parse(json);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }
    onDone();
  } catch (e) {
    console.error(e);
    onError(e instanceof Error ? e.message : "Noma'lum xatolik");
  }
}
