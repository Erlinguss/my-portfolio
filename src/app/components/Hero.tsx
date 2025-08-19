"use client";

import React from "react";
import Image from "next/image";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import Footer from "./Footer";

import TechStack from "./TechStack";
import ContactButton from "./ContactLink";

export default function Hero() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 md:pt-32" id="about">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* Left — text */}
          <div>
            <p className="text-slate-500 font-semibold text-xl sm:text-2xl mb-4">
              Hello there <span className="inline-block">👋</span>
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              I’m <span className="text-slate-900">Erling Munguia</span>,<br />
              a <span className="text-blue-600">Web Developer</span>
            </h1>

            <p className="mt-5 text-slate-600 text-lg leading-relaxed max-w-xl">
              I ship accessible, performant web apps with React/Next.js, strong UX,
              and clean, maintainable code.
            </p>
<div className="mt-8 flex flex-wrap gap-3">
  <a
    href="#projects"
    className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-5 py-3 text-sm font-semibold hover:bg-blue-700 shadow-sm"
  >
    View Projects
  </a>


  <a
    href="#contact"
    className=""
  >
 <ContactButton  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Contact</ContactButton>
  </a>

  <a
    href="/api/cv?v=1"
    className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
  >
    Download CV
  </a>
</div>

          </div>

          {/* Right — image + tiny orbit chips */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-blue-50 to-purple-50" />

            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-white max-w-xs md:max-w-sm mx-auto">
              <Image
                src="/ErlingMunguia.jpg"
                alt="Erling Munguia portrait"
                width={400}
                height={520}
                priority
                sizes="(min-width:1024px) 400px, (min-width:768px) 320px, 75vw"
                className="object-cover w-full h-auto"
              />
            </div>

            {/* Tiny bubbles (chips) around the photo */}
            <FloatChip icon={<FaReact size={20} className="text-blue-500" />} position="-top-5 -left-5" delay="0s" />
            <FloatChip icon={<SiNextdotjs size={18} />} position="top-6 -right-6" delay=".2s" />
            <FloatChip icon={<SiTypescript size={18} className="text-blue-600" />} position="-bottom-5 left-6" delay=".4s" />
            <FloatChip icon={<SiTailwindcss size={18} className="text-sky-400" />} position="bottom-10 -right-8" delay=".6s" />
            <FloatChip icon={<FaNodeJs size={18} className="text-green-600" />} position="top-1/2 -left-10" delay=".8s" />
          </div>
        </div>
      </section>

      {/* Tech stack cards */}
    
        <TechStack />
        <Footer />
      </>
  );
}

/** Small, floating round chip */
function FloatChip({
  icon,
  position,
  delay = "0s",
}: {
  icon: React.ReactNode;
  position: string;
  delay?: string;
}) {
  return (
    <div className={`orbit-chip ${position}`} style={{ animationDelay: delay }} aria-hidden="true">
      <span className="orbit-chip-inner">{icon}</span>
    </div>
  );
}
