"use client";

import { useEffect, useRef } from "react";

export default function ContactModal({
  children,
  onClose,
  title = "Get in touch",
}: {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          (last as HTMLElement).focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          (first as HTMLElement).focus();
          e.preventDefault();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      id="contact-dialog"
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-[#0b0f19] text-slate-200 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)]"
      >
        <div className="h-px w-full rounded-t-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600" />

        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3
              id="contact-modal-title"
              className="text-3xl font-serif font-bold tracking-tight text-slate-100"
            >
              Get{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                in touch
              </span>
            </h3>

            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-2 text-slate-200/80 hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close contact form"
            >
              ✕
            </button>
          </div>

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
