"use client";

import Image from "next/image";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs, SiTypescript, SiTailwindcss, SiDocker, SiGithub, SiMysql, SiMongodb,  SiPostman,
} from "react-icons/si";
import { AiOutlineApi } from "react-icons/ai";

export default function Hero() {
  return (
    <section className="pt-10 md:pt-14">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left — text */}
        <div>
          <p className="text-slate-500 font-medium mb-2">
            Hello there <span className="inline-block">👋</span>
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            I’m <span className="text-slate-900">Erling Munguia</span>,<br />
            a <span className="text-blue-600">Web Developer</span>
          </h1>

          <p className="mt-5 text-slate-600 text-lg leading-relaxed max-w-xl">
            I build clean, responsive, and future-ready applications — blending
            modern frameworks with sleek UI design to create a lasting impression.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 text-white px-5 py-3 text-sm font-semibold hover:bg-blue-700"
            >
              View Projects
            </a>
            <a
              href="/Erling_Munguia_CV.pdf"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Download CV
            </a>
          </div>

          {/* Tech badges */}
          <div className="mt-10 flex gap-3 flex-wrap py-2">
            <SkillBadge icon={<SiNextdotjs size={20} />} label="Next.js" />
            <SkillBadge icon={<FaReact size={20} className="text-blue-500" />} label="React" />
            <SkillBadge icon={<SiTypescript size={20} className="text-blue-600" />} label="TypeScript" />
            <SkillBadge icon={<SiTailwindcss size={20} className="text-sky-400" />} label="Tailwind" />
            <SkillBadge icon={<FaNodeJs size={20} className="text-green-600" />} label="Node.js" />
            <SkillBadge icon={<AiOutlineApi size={20} />} label="REST API" />
            <SkillBadge icon={<SiGithub size={20} />} label="GitHub" />
            <SkillBadge icon={<SiDocker size={20} className="text-blue-500" />} label="Docker" />
            <SkillBadge icon={<SiMysql size={20} className="text-blue-600" />} label="MySQL" />
            <SkillBadge icon={<SiMongodb size={20} className="text-green-600" />} label="MongoDB" />
            <SkillBadge icon={<SiPostman size={20} className="text-orange-500" />} label="Postman" />

            </div>
        </div>

        {/* Right — image + floating icons */}
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-blue-50 to-purple-50"></div>

          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white">
            <Image
              src="/ErlingMunguia.jpg"
              alt="Erling Munguia portrait"
              width={600}
              height={1000}
              className="object-cover"
              priority
            />
          </div>

          {/* Floating icons */}
          <FloatingIcon position="-top-6 -left-6" delay="0s">
            <FaReact size={26} className="text-blue-500" />
          </FloatingIcon>
          <FloatingIcon position="top-8 -right-8" delay="0.4s">
            <SiNextdotjs size={26} />
          </FloatingIcon>
          <FloatingIcon position="-bottom-6 left-8" delay="0.8s">
            <SiTypescript size={26} className="text-blue-600" />
          </FloatingIcon>
          <FloatingIcon position="bottom-10 -right-10" delay="1.2s">
            <SiTailwindcss size={26} className="text-sky-400" />
          </FloatingIcon>
          <FloatingIcon position="top-1/2 -left-10" delay="1.6s">
            <FaNodeJs size={26} className="text-green-600" />
          </FloatingIcon>
           </div>
      </div>
    </section>
  );
}

/** Small skill badge */
function SkillBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 whitespace-nowrap">
      {icon} {label}
    </span>
  );
}

/** Floating circular icon */
function FloatingIcon({
  children,
  position,
  delay = "0s",
}: {
  children: React.ReactNode;
  position: string;
  delay?: string;
}) {
  return (
    <div
      className={`absolute ${position} animate-float-slow`}
      style={{ animationDelay: delay }}
    >
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-md border border-slate-200">
        {children}
      </span>
    </div>
  );
}
