"use client";

import { useState, useEffect } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";

type Props = {
  value: string;         
  className?: string;    
  size?: number;         
};

export default function CopyClipboard({ value, className = "", size = 16 }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy. Try again.");
    }
  }

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={copy}
      className={
        "inline-flex h-9 w-9 items-center justify-center rounded-lg " +
        "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/[0.08] " +
        "focus:outline-none focus:ring-2 focus:ring-blue-500/60 " +
        className
      }
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? <FiCheck size={size} className="text-emerald-400" /> : <FiCopy size={size} />}
    </button>
  );
}
