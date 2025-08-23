"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiMysql,
  SiMongodb,
  SiPostman,
  SiGithub,
  SiDocker,
  SiJira,
  SiFigma,
  SiStorybook,
  SiSwift,
  SiXcode,
} from "react-icons/si";
import { AiOutlineApi } from "react-icons/ai";
import { VscBeaker } from "react-icons/vsc";
import { MdOutlineDesignServices } from "react-icons/md";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CustomIcon from "./CustomIcon";

/* ---------- Small primitive ---------- */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-medium text-slate-800 shadow-sm">
      {children}
    </span>
  );
}

/* ---------- Section Title ---------- */
function SectionTitle() {
  return (
    <div className="text-center mb-10">
      <h2 className="text-[34px] sm:text-[40px] font-extrabold tracking-tight text-slate-900">
        Core Skills &{" "}
        <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Technologies
        </span>
      </h2>
      <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
        Precise, outcome-driven engineering across frontend, backend, QA/DevOps,
        Mobile, and UX/UI.
      </p>
    </div>
  );
}

/* ---------- Types ---------- */
type Badge = { icon: React.ReactNode; label: string };
type Pillar = {
  title: string;
  blurb: string;
  emblem: React.ReactNode;
  badges: Badge[];
  bullets: string[];
};

/* ---------- Data ---------- */
const PILLARS: Pillar[] = [
  {
    title: "Frontend Development",
    blurb: "Crafting responsive, accessible, and performance-driven interfaces.",
    emblem: (
      <div className="grid place-items-center w-12 h-12 rounded-2xl bg-white shadow-md ring-1 ring-slate-200">
        <SiNextdotjs className="text-slate-700" size={20} />
      </div>
    ),
    badges: [
      { icon: <SiNextdotjs size={18} />, label: "Next.js" },
      { icon: <FaReact size={18} className="text-blue-500" />, label: "React" },
      { icon: <SiTypescript size={18} className="text-blue-600" />, label: "TypeScript" },
      { icon: <SiTailwindcss size={18} className="text-sky-400" />, label: "TailwindCSS" },
      { icon: <SiJavascript size={18} className="text-yellow-500" />, label: "JavaScript" },
    ],
    bullets: [
      "Delivered interfaces optimized for Core Web Vitals.",
      "Built responsive, reusable design systems.",
      "Developed SPAs with React & Next.js.",
      "Ensured WCAG-compliant accessibility.",
      "Integrated state management & API hooks.",
    ],
  },
  {
    title: "Backend & APIs",
    blurb: "Engineering secure, scalable, and maintainable backend systems.",
    emblem: (
      <div className="grid place-items-center w-12 h-12 rounded-2xl bg-white shadow-md ring-1 ring-slate-200">
        <FaNodeJs className="text-green-600" size={20} />
      </div>
    ),
    badges: [
      { icon: <FaNodeJs size={18} className="text-green-600" />, label: "Node.js" },
      { icon: <CustomIcon src="/icons/java.png" alt="Java" />, label: "Java" },
      { icon: <SiMongodb size={18} className="text-green-600" />, label: "MongoDB" },
      { icon: <SiMysql size={18} className="text-blue-600" />, label: "MySQL" },
      { icon: <AiOutlineApi size={18} />, label: "Rest API" },
      { icon: <CustomIcon src="/icons/CSharp.png" alt="CSharp" />, label: "CSharp" },
    ],
    bullets: [
      "Designed REST APIs with authentication layers.",
      "Built scalable CRUD & pagination logic.",
      "Implemented JWT & session auth.",
      "Schema design for SQL & NoSQL DBs.",
      "Optimized performance for high traffic.",
    ],
  },
  {
    title: "QA Automation & DevOps",
    blurb: "Driving quality and speed through automated testing and CI/CD pipelines.",
    emblem: (
      <div className="grid place-items-center w-12 h-12 rounded-2xl bg-white shadow-md ring-1 ring-slate-200">
        <VscBeaker className="text-pink-500" size={20} />
      </div>
    ),
    badges: [
      { icon: <SiPostman size={18} className="text-orange-500" />, label: "Postman" },
      { icon: <CustomIcon src="/icons/playwright.png" alt="Playwright" />, label: "Playwright" },
      { icon: <SiDocker size={18} className="text-blue-500" />, label: "Docker" },
      { icon: <CustomIcon src="/icons/azuredev.png" alt="Azure DevOps" />, label: "Azure DevOps" },
      { icon: <SiGithub size={18} />, label: "GitHub" },
      { icon: <SiJira size={18} className="text-blue-600" />, label: "Jira" },
      { icon: <CustomIcon src="/icons/ReadyAPI.png" alt="ReadyAPI" />, label: "ReadyAPI" },
    ],
    bullets: [
      "Built UI/API automation test suites.",
      "Set up CI checks & delivery pipelines.",
      "Maintained dev/prod parity with Docker.",
      "Automated regression & smoke tests.",
      "Deployed monitoring with alerts.",
    ],
  },
  {
    title: "Mobile Development",
    blurb: "Building smooth, performant apps for iOS and cross-platform environments.",
    emblem: (
      <div className="grid place-items-center w-12 h-12 rounded-2xl bg-white shadow-md ring-1 ring-slate-200">
        <SiSwift size={18} className="text-orange-500" />
      </div>
    ),
    badges: [
      { icon: <SiSwift size={18} className="text-orange-500" />, label: "Swift" },
      { icon: <SiXcode size={18} className="text-blue-500" />, label: "Xcode" },
    ],
    bullets: [
      "Developed native iOS apps with Swift & SwiftUI.",
      "Integrated REST APIs, persistence, and offline storage.",
      "Implemented secure auth, deep links & push notifications.",
      "Used Xcode Instruments to profile & tune performance.",
      "Automated build/signing steps and TestFlight distribution.",
    ],
  },
  {
    title: "UX/UI Design",
    blurb: "Designing intuitive experiences with clean layouts and motion.",
    emblem: (
      <div className="grid place-items-center w-12 h-12 rounded-2xl bg-white shadow-md ring-1 ring-slate-200">
        <MdOutlineDesignServices className="text-violet-600" size={22} />
      </div>
    ),
    badges: [
      { icon: <SiFigma size={18} className="text-pink-500" />, label: "Figma" },
      { icon: <CustomIcon src="/icons/Framer.png" alt="Framer" />, label: "Framer" },
      { icon: <SiStorybook size={18} className="text-rose-500" />, label: "Storybook" },
      { icon: <SiTailwindcss size={18} className="text-sky-400" />, label: "Design Tokens" },
    ],
    bullets: [
      "Designed wireframes and prototypes with Figma.",
      "Created reusable design systems in Storybook.",
      "Developed UX flows & interaction patterns.",
      "Applied accessibility & WCAG compliance.",
      "Produced micro-animations with Framer.",
    ],
  },
];

/* ---------- Card ---------- */
function ImpactCard({ pillar }: { pillar: Pillar }) {
  return (
    <div className="shrink-0 snap-center overflow-visible">
      <article
        className="relative w-[385px] 
             h-[460px] sm:h-[500px] lg:h-[520px] 
             rounded-3xl border border-slate-200 bg-white shadow-md
             hover:shadow-xl transition flex flex-col"
      >
        {/* emblem */}
        <div className="absolute -top-6 -right-3 z-20">{pillar.emblem}</div>

        <div className="p-6 sm:p-7 flex flex-col">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 shadow-[0_0_0_6px_rgba(99,102,241,.08)]" />
            {pillar.title}
          </h3>
          <p className="mt-3 text-[15px] text-slate-600 leading-relaxed flex-grow">
            {pillar.blurb}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {pillar.badges.map((b) => (
              <Pill key={b.label}>
                <span className="grid place-items-center w-6 h-6 rounded-full bg-slate-50 border border-slate-200">
                  {b.icon}
                </span>
                {b.label}
              </Pill>
            ))}
          </div>

          <ul className="mt-6 space-y-2.5 text-[15px] text-slate-700">
            {pillar.bullets.map((line, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-[7px] inline-block w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}


/* ---------- Carousel ---------- */
export default function TechStack() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const CARD_WIDTH = 380 + 32; // match fixed width + gap

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const interval: NodeJS.Timeout = setInterval(() => {
      if (isHovered) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const next = scrollLeft + CARD_WIDTH;

      // reset to start if fully scrolled
      if (next + clientWidth >= scrollWidth) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollTo({ left: next, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, CARD_WIDTH]);

  return (
    <section id="skills" className="mt-28 md:mt-36 pt-8 pb-24 relative bg-inherit">
      <div className="max-w-7xl mx-auto px-4 relative">
        <SectionTitle />

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() =>
              scrollerRef.current?.scrollBy({ left: -CARD_WIDTH, behavior: "smooth" })
            }
            className="absolute -left-16 top-1/2 -translate-y-1/2 z-30
                       bg-white shadow-xl rounded-full p-4
                       hover:bg-slate-100 transition"
            aria-label="Scroll left"
          >
            <ChevronLeft size={26} className="text-slate-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() =>
              scrollerRef.current?.scrollBy({ left: CARD_WIDTH, behavior: "smooth" })
            }
            className="absolute -right-16 top-1/2 -translate-y-1/2 z-30
                       bg-white shadow-xl rounded-full p-4
                       hover:bg-slate-100 transition"
            aria-label="Scroll right"
          >
            <ChevronRight size={26} className="text-slate-700" />
          </button>
<div
  ref={scrollerRef}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
 className="flex gap-[32px] overflow-x-auto overflow-y-visible scroll-smooth hide-scrollbar snap-x snap-mandatory bg-inherit pt-12 pb-12"
>
  

  {PILLARS.map((p) => (
    <ImpactCard key={p.title} pillar={p} />
  ))}

</div>
        </div>
      </div>
    </section>
  );
}
