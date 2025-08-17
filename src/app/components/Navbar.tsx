
// Navbar.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // close on ESC / outside click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [open]);

  return (
    <header className="sticky top-4 z-50">
      <nav className="max-w-6xl mx-auto px-4" aria-label="Primary">
        <div className="flex items-center justify-between bg-white/80 backdrop-blur border border-slate-200 rounded-2xl shadow-sm px-5 py-3">
          <Link href="#about" className="flex items-center gap-2" aria-label="Go to About">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg shadow-md">EM</div>
          </Link>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <li><a href="#about" className="hover:text-slate-900">About</a></li>
            <li><a href="#projects" className="hover:text-slate-900">Projects</a></li>
            <li><a href="#skills" className="hover:text-slate-900">Skills</a></li>
            <li><a href="#contact" className="hover:text-slate-900">Contact</a></li>
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/erling-munguia"
              target="_blank" rel="noopener noreferrer"
              aria-label="Open LinkedIn profile"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md"
            >
              <FaLinkedin size={20} aria-hidden="true" />
            </a>

            {/* Mobile button */}
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200"
              aria-label="Open menu"
             // aria-expanded={String(open)}
              aria-controls="mobile-menu"
              onClick={() => setOpen(v => !v)}
            >
              <span className="sr-only">Menu</span>
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {open && (
          <div id="mobile-menu" ref={panelRef} className="md:hidden mt-2 bg-white border border-slate-200 rounded-2xl shadow-lg">
            <ul className="flex flex-col py-2 text-slate-700">
              <li><a className="block px-5 py-3 hover:bg-slate-50" href="#about" onClick={()=>setOpen(false)}>About</a></li>
              <li><a className="block px-5 py-3 hover:bg-slate-50" href="#projects" onClick={()=>setOpen(false)}>Projects</a></li>
              <li><a className="block px-5 py-3 hover:bg-slate-50" href="#skills" onClick={()=>setOpen(false)}>Skills</a></li>
              <li><a className="block px-5 py-3 hover:bg-slate-50" href="#contact" onClick={()=>setOpen(false)}>Contact</a></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
