"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import CustomIcon from "./CustomIcon";
import pillarsData from "../data/pillars.json";

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
    <div id="skills" className="text-center mb-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900">
        Core Skills &{" "}
        <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Technologies
        </span>
      </h2>
      <p className="mt-3 text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
        Precise, outcome-driven engineering across frontend, backend, QA/DevOps,
        Mobile, and UX/UI.
      </p>
    </div>
  );
}

/* ---------- Icon Mapper ---------- */
const iconMap: Record<string, React.ReactNode> = {
  react: <FaReact size={18} className="text-blue-500" />,
  nextjs: <SiNextdotjs size={18} />,
  typescript: <SiTypescript size={18} className="text-blue-600" />,
  tailwind: <SiTailwindcss size={18} className="text-sky-400" />,
  javascript: <SiJavascript size={18} className="text-yellow-500" />,
  node: <FaNodeJs size={18} className="text-green-600" />,
  java: <CustomIcon src="/icons/java.png" alt="Java" />,
  csharp: <CustomIcon src="/icons/CSharp.png" alt="CSharp" />,
  mysql: <SiMysql size={18} className="text-blue-600" />,
  mongodb: <SiMongodb size={18} className="text-green-600" />,
  api: <AiOutlineApi size={18} />,
  postman: <SiPostman size={18} className="text-orange-500" />,
  playwright: <CustomIcon src="/icons/playwright.png" alt="Playwright" />,
  docker: <SiDocker size={18} className="text-blue-500" />,
  azuredev: <CustomIcon src="/icons/azuredev.png" alt="Azure DevOps" />,
  github: <SiGithub size={18} />,
  jira: <SiJira size={18} className="text-blue-600" />,
  readyapi: <CustomIcon src="/icons/ReadyAPI.png" alt="ReadyAPI" />,
  swift: <SiSwift size={18} className="text-orange-500" />,
  xcode: <SiXcode size={18} className="text-blue-500" />,
  figma: <SiFigma size={18} className="text-pink-500" />,
  framer: <CustomIcon src="/icons/Framer.png" alt="Framer" />,
  storybook: <SiStorybook size={18} className="text-rose-500" />,
  "design-tokens": <SiTailwindcss size={18} className="text-sky-400" />,
  qa: <VscBeaker size={18} className="text-pink-500" />,
  design: <MdOutlineDesignServices size={18} className="text-violet-600" />,
};

/* ---------- Card ---------- */
function ImpactCard({
  pillar,
}: {
  pillar: {
    title: string;
    blurb: string;
    badges: { icon: string; label: string }[];
    bullets: string[];
  };
}) {
  return (
    <article className="relative w-full h-full rounded-3xl border border-slate-200 bg-white shadow-md hover:shadow-xl transition flex flex-col p-6 sm:p-7">
      <div className="absolute -top-6 -right-3 z-20">
        <div className="grid place-items-center w-12 h-12 rounded-2xl bg-white shadow-md ring-1 ring-slate-200">
          {iconMap[pillar.badges[0].icon]}
        </div>
      </div>

      <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
        <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 shadow-[0_0_0_6px_rgba(99,102,241,.08)]" />
        {pillar.title}
      </h3>
      <p className="mt-3 text-[14px] sm:text-[15px] text-slate-600 leading-relaxed">
        {pillar.blurb}
      </p>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {pillar.badges.map((b) => (
          <Pill key={b.label}>
            <span className="grid place-items-center w-6 h-6 rounded-full bg-slate-50 border border-slate-200">
              {iconMap[b.icon]}
            </span>
            {b.label}
          </Pill>
        ))}
      </div>

      <ul className="mt-6 space-y-2.5 text-[13px] sm:text-[15px] text-slate-700">
        {pillar.bullets.map((line, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-[7px] inline-block w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ---------- Carousel ---------- */
export default function TechStack() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState(0);

  // measure card width on mount + resize
  useEffect(() => {
    const updateCardWidth = () => {
      if (cardRef.current && scrollerRef.current) {
        const card = cardRef.current.getBoundingClientRect().width;
        const gap = parseFloat(
          getComputedStyle(scrollerRef.current).columnGap || "24"
        );
        setCardWidth(card + gap);
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  // autoplay scroll (pause on hover)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !cardWidth) return;

    let isHovered = false;
    const onEnter = () => {
      isHovered = true;
    };
    const onLeave = () => {
      isHovered = false;
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    const interval = setInterval(() => {
      if (isHovered) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 5;

      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 4000);

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [cardWidth]);

  return (
    <section id="skills" className="mt-20 md:mt-28 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 relative">
        <SectionTitle />

        {/* Cards wrapper with relative positioning */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() =>
              scrollerRef.current?.scrollBy({
                left: -cardWidth,
                behavior: "smooth",
              })
            }
            className="hidden sm:flex items-center justify-center
                      absolute -left-4 top-1/2 -translate-y-1/2 z-30
                      bg-white/90 backdrop-blur border border-slate-200 rounded-full shadow-sm
                      w-9 h-9 md:w-10 md:h-10
                      hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Scroll left"
          >
            <ChevronLeft className="text-slate-700" size={22} />
          </button>

          {/* Scroll Area */}
          <div
            ref={scrollerRef}
            className="relative flex gap-[40px] overflow-x-auto scroll-smooth hide-scrollbar snap-x snap-mandatory pt-10 pb-10 px-8 sm:px-8 lg:px-16"
          >
            {pillarsData.map((pillar, idx) => (
              <div
                key={idx}
                ref={idx === 0 ? cardRef : null}
                className="
                  w-[85%] 
                  sm:w-[280px]
                  md:w-[calc(50%-16px)]  
                  lg:w-[calc(33.333%-18px)]  
                  shrink-0 snap-center
                "
              >
                <ImpactCard pillar={pillar} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() =>
              scrollerRef.current?.scrollBy({
                left: cardWidth,
                behavior: "smooth",
              })
            }
            className="hidden sm:flex items-center justify-center
                      absolute -right-4 top-1/2 -translate-y-1/2 z-30
                      bg-white/90 backdrop-blur border border-slate-200 rounded-full shadow-sm
                      w-9 h-9 md:w-10 md:h-10
                      hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Scroll right"
          >
            <ChevronRight className="text-slate-700" size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
