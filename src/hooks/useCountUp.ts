import { useState, useEffect, useRef } from "react";

function parseNumericValue(value: string): { number: number; prefix: string; suffix: string } {
  // Extract the numeric part (with spaces as thousand separators)
  const match = value.match(/^([^\d]*?)([\d\s]+(?:[.,]\d+)?)(.*?)$/);
  if (!match) return { number: 0, prefix: "", suffix: value };
  
  const prefix = match[1];
  const numStr = match[2].replace(/\s/g, "").replace(",", ".");
  const suffix = match[3];
  const number = parseFloat(numStr);
  
  return { number: isNaN(number) ? 0 : number, prefix, suffix };
}

function formatNumber(num: number, original: string): string {
  const parsed = parseNumericValue(original);
  const isInteger = Number.isInteger(parsed.number);
  
  let formatted: string;
  if (isInteger) {
    formatted = Math.round(num).toString();
  } else {
    const decimals = (parsed.number.toString().split(".")[1] || "").length;
    formatted = num.toFixed(decimals);
  }
  
  // Add space thousand separators if original had them
  if (original.replace(/[^\d]/g, "").length > 3 && /\d\s\d/.test(original)) {
    const parts = formatted.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    formatted = parts.join(".");
  }
  
  return parsed.prefix + formatted + parsed.suffix;
}

export function useCountUp(
  targetValue: string,
  duration: number = 1500,
  delay: number = 0
): string {
  const { number: target } = parseNumericValue(targetValue);
  const [displayValue, setDisplayValue] = useState(formatNumber(0, targetValue));
  const frameRef = useRef<number>();

  useEffect(() => {
    if (target === 0) {
      setDisplayValue(targetValue);
      return;
    }

    const timeout = setTimeout(() => {
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = eased * target;
        
        setDisplayValue(formatNumber(current, targetValue));
        
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };
      
      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, targetValue, duration, delay]);

  return displayValue;
}
