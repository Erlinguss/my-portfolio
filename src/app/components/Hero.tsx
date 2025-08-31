"use client";

import React from "react";
import Image from "next/image";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import TechStack from "./TechStack";
import ContactLink from "./ContactLink";
import { Mail, Download } from "lucide-react";

export default function Hero() {
  return (
    <>
      <section className="pt-20 md:pt-32" id="about">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <div>
            <p className="text-slate-500 font-semibold text-xl sm:text-2xl mb-4">
              Hello there <span className="inline-block">👋</span>
            </p>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              I’m <span className="text-slate-900">Erling Munguia</span>,<br />a{" "}
              <span className="shimmer bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Web Developer
              </span>
            </h1>

            <p className="mt-5 text-slate-600 text-lg leading-relaxed max-w-xl">
              I design and engineer end-to-end systems — from{" "}
              <strong>React UIs</strong> to <strong>.NET microservices</strong>,
              databases, and <strong>automation pipelines</strong> that scale
              with confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/ErlingEduardoMunguiaUrbinaCV.pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-[14px] font-semibold text-white shadow hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>

              <ContactLink
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 
          bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                <Mail className="h-4 w-4" /> Contact
              </ContactLink>
            </div>
          </div>

          {/* Right — image + chips */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-blue-50 to-purple-50" />
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-white max-w-[260px] sm:max-w-xs md:max-w-sm mx-auto">
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

            {/* Responsive FloatChips */}
            <FloatChip
              icon={<FaReact size={20} className="text-blue-500" />}
              position="top-0 left-0 sm:-top-5 sm:-left-5"
            />
            <FloatChip
              icon={<SiNextdotjs size={18} />}
              position="top-4 right-2 sm:top-6 sm:-right-6"
              delay=".2s"
            />
            <FloatChip
              icon={<SiTypescript size={18} className="text-blue-600" />}
              position="bottom-0 left-4 sm:-bottom-5 sm:left-6"
              delay=".4s"
            />
            <FloatChip
              icon={<SiTailwindcss size={18} className="text-sky-400" />}
              position="bottom-6 right-0 sm:bottom-10 sm:-right-8"
              delay=".6s"
            />
            <FloatChip
              icon={<FaNodeJs size={18} className="text-green-600" />}
              position="top-1/2 -left-6 sm:-left-10"
              delay=".8s"
            />
          </div>
        </div>
      </section>

      <TechStack />
    </>
  );
}

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
    <div
      className={`absolute orbit-chip ${position}`}
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      <span className="orbit-chip-inner">{icon}</span>
    </div>
  );
}
