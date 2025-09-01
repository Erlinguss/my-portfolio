"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaLinkedin } from "react-icons/fa";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/#skills" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // close on ESC / outside click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // detect scroll for style change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  // Handle Skills click
  const goToSkills = () => {
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const el = document.getElementById("skills");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", "/");
      }, 400);
    } else {
      const el = document.getElementById("skills");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", "/");
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <nav
        className={`mx-auto transition-all duration-300 ${
          scrolled ? "max-w-full px-6" : "max-w-6xl px-4"
        }`}
        aria-label="Primary"
      >
        <div
          className={`flex items-center justify-between border rounded-2xl shadow-sm transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md border-slate-200 py-2"
              : "bg-white/80 backdrop-blur border-slate-200 py-3"
          } px-5`}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Go to Home"
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg shadow-md">
              EM
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            {links.map((link) => (
              <li key={link.href}>
                {link.label === "Skills" ? (
                  <button
                    onClick={goToSkills}
                    className="transition-colors text-slate-600 hover:text-slate-900"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`transition-colors ${
                      isActive(link.href)
                        ? "text-slate-900 font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/erling-munguia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open LinkedIn profile"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md transition"
            >
              <FaLinkedin size={20} aria-hidden="true" />
            </a>

            {/* Mobile button */}
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200"
              aria-label="Open menu"
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            id="mobile-menu"
            ref={panelRef}
            className="md:hidden mt-2 bg-white border border-slate-200 rounded-2xl shadow-lg"
          >
            <ul className="flex flex-col py-2 text-slate-700">
              {links.map((link) => (
                <li key={link.href}>
                  {link.label === "Skills" ? (
                    <button
                      onClick={() => {
                        goToSkills();
                        setOpen(false);
                      }}
                      className="block w-full text-left px-5 py-3 hover:bg-slate-50"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block px-5 py-3 hover:bg-slate-50 ${
                        isActive(link.href)
                          ? "text-slate-900 font-semibold"
                          : "text-slate-700"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
