"use client";

import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript,
  SiDocker, SiGithub, SiMysql, SiMongodb, SiPostman, SiJest,
  SiGit,
  SiKubernetes,
} from "react-icons/si";
import { AiOutlineApi } from "react-icons/ai";

type Badge = { icon: React.ReactNode; label: string };
type Pillar = { title: string; blurb: string; badges: Badge[]; bullets: string[] };

const PILLARS: Pillar[] = [
  {
    title: "Frontend",
    blurb: "Accessible UI with performance budgets and component systems.",
    badges: [
      { icon: <SiNextdotjs size={18} />, label: "Next.js" },
      { icon: <FaReact size={18} className="text-blue-500" />, label: "React" },
      { icon: <SiTypescript size={18} className="text-blue-600" />, label: "TypeScript" },
      { icon: <SiTailwindcss size={18} className="text-sky-400" />, label: "Tailwind" },
      { icon: <SiJavascript size={18} className="text-yellow-500" />, label: "JavaScript" },
    ],
    bullets: [
      "SSR/ISR routing, metadata, and SEO",
      "Design systems & reusable components",
      "Core Web Vitals: CLS < 0.1, LCP < 2.5s",
      "Responsive layouts for all devices",
      "Accessibility-first design (WCAG AA)",
    ]
  },
  {
    title: "Backend",
    blurb: "Typed APIs with auth, validation and data modeling.",
    badges: [
      { icon: <FaNodeJs size={18} className="text-green-600" />, label: "Node.js" },
      { icon: <AiOutlineApi size={18} />, label: "REST API" },
      { icon: <SiMongodb size={18} className="text-green-600" />, label: "MongoDB" },
      { icon: <SiMysql size={18} className="text-blue-600" />, label: "MySQL" },
      { icon: <SiJest size={18} className="text-red-500" />, label: "Jest (Testing)" },
    ],
    bullets: [
      "CRUD & pagination patterns",
      "JWT/session auth & role guards",
      "Input validation & error handling",
      "Database schema design & migrations",
      "Unit/integration testing with Jest",
    ]
  },
  {
    title: "Tools & Ops",
    blurb: "Ship fast with CI, containers and pragmatic testing.",
    badges: [
    { icon: <SiGithub size={18} />, label: "GitHub" },
  { icon: <SiGit size={18} className="text-orange-600" />, label: "Git" },
  { icon: <SiDocker size={18} className="text-blue-500" />, label: "Docker" },
  { icon: <SiKubernetes size={18} className="text-blue-400" />, label: "Kubernetes" },
  { icon: <SiPostman size={18} className="text-orange-500" />, label: "Postman" },
 { icon: <SiNextdotjs size={18} />, label: "CI/CD" },
  { icon: <SiJest size={18} className="text-red-500" />, label: "Jest" },
 ],
    bullets: [
      "CI checks (lint, type, build)",
      "Dockerized dev/prod parity",
      "API collections & environments",
      "Version control & branching strategies",
      "Continuous deployment pipelines",
    ]
  }
];

export default function TechStack() {
  return (
    <section id="skills" className="mt-28 md:mt-36 pt-16 pb-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
          Tech stack I ship with
        </h2>

        <div className="grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className="group relative rounded-2xl border border-slate-200/70 bg-white shadow-[0_8px_30px_rgba(2,6,23,.06)] overflow-hidden"
            >
              {/* subtle gradient edge */}
              <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-blue-50/70 to-transparent" />

              <header className="relative px-5 pt-5 pb-2">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 shadow-[0_0_0_6px_rgba(99,102,241,.08)]" />
                  {p.title}
                </div>
                <p className="mt-2 text-sm text-slate-600">{p.blurb}</p>
              </header>

              <div className="relative px-5 pb-4">
                {/* Badges */}
                <ul className="flex flex-wrap gap-2.5">
                  {p.badges.map((b) => (
                    <li key={String(b.label)}>
                      <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] font-semibold text-slate-800 shadow-sm">
                        <span
                          aria-hidden="true"
                          className="grid place-items-center w-6 h-6 rounded-full bg-slate-50 border border-slate-200"
                        >
                          {b.icon}
                        </span>
                        {b.label}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Capability bullets */}
                <ul className="mt-5 space-y-2.5 text-sm text-slate-700">
                  {p.bullets.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-[6px] inline-block w-1.5 h-1.5 rounded-full bg-blue-500/80"
                      />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* hover ring */}
              <div className="absolute inset-0 rounded-2xl ring-0 ring-blue-500/0 transition group-hover:ring-4 group-hover:ring-blue-500/10" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
