"use client";

import { motion } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFigma,
  SiDotnet, SiDocker, SiMysql, SiMongodb,
  SiGithubactions
} from "react-icons/si";
import { Mail, Download, GitBranch } from "lucide-react";
import CountUp from "react-countup";
import Lottie from "react-lottie-player";
import codingAnimation from "@/../public/animations/coding.json";
import Timeline from "./Timeline";
import ContactLink from "./ContactLink";

/* ---------- Reusable Chip ---------- */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      whileHover={{ scale: 1.08 }}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-medium text-slate-800 shadow-sm transition"
    >
      {children}
    </motion.span>
  );
}

export default function AboutPage() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28">
     
{/* ---------- ABOUT HERO (Premium Style) ---------- */}
<section className="relative mb-32">
  {/* Background gradient accent */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute left-1/4 top-10 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
  </div>

  <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-20">
    {/* Left - Text */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center lg:text-left space-y-6 max-w-2xl"
    >
  <h1 className="text-6xl font-extrabold tracking-tight leading-[1.15] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
  Erling Munguia
</h1>

      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
        Full-Stack Engineering & Automation
      </p>
      <p className="text-lg leading-relaxed text-slate-700">
        Designing and delivering robust software solutions — combining{" "}
        <strong>front-end elegance</strong>,{" "}
        <strong>scalable back-end systems</strong>, and{" "}
        <strong>QA automation</strong> into products that inspire confidence.
      </p>

      {/* Mini Stats Row */}
      <div className="grid grid-cols-3 gap-6 pt-6">
        <div className="rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
          <p className="text-2xl font-bold text-indigo-600">20+</p>
          <p className="text-xs text-slate-600">Projects</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
          <p className="text-2xl font-bold text-indigo-600">3+</p>
          <p className="text-xs text-slate-600">Years Exp</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 shadow-sm">
          <p className="text-2xl font-bold text-indigo-600">CI/CD</p>
          <p className="text-xs text-slate-600">Automation</p>
        </div>
      </div>
    </motion.div>

    {/* Right - Animation */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative flex justify-center lg:justify-end"
    >
      {/* Glow under animation */}
      <div className="absolute w-[650px] h-[650px] rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"></div>

      <Lottie
        loop
        play
        animationData={codingAnimation}
        style={{ width: 650, height: 650 }}
      />
    </motion.div>
  </div>


</section>


      {/* ---------- SKILLS GRID ---------- */}
      <div className="grid gap-6 lg:grid-cols-3 mb-32">
        {/* Frontend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg"
        >
          <h4 className="font-bold text-slate-900">Frontend Engineering</h4>
          <p className="mt-1 text-sm text-slate-600">
            React, Next.js, TypeScript, Tailwind, Figma
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip><SiReact /> React</Chip>
            <Chip><SiNextdotjs /> Next.js</Chip>
            <Chip><SiTypescript /> TS</Chip>
            <Chip><SiTailwindcss /> Tailwind</Chip>
            <Chip><SiFigma /> Figma</Chip>
          </div>
        </motion.div>

        {/* Backend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg"
        >
          <h4 className="font-bold text-slate-900">Backend & Microservices</h4>
          <p className="mt-1 text-sm text-slate-600">C#, .NET, Docker, SQL, MongoDB</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip><SiDotnet /> .NET</Chip>
            <Chip><SiDocker /> Docker</Chip>
            <Chip><SiMysql /> MySQL</Chip>
            <Chip><SiMongodb /> MongoDB</Chip>
          </div>
        </motion.div>

        {/* QA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg"
        >
          <h4 className="font-bold text-slate-900">QA Automation & CI/CD</h4>
          <p className="mt-1 text-sm text-slate-600">Playwright, ReadyAPI, pipelines</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip><SiGithubactions /> CI/CD</Chip>
            <Chip><GitBranch size={16}/> Pipelines</Chip>
          </div>
        </motion.div>
      </div>

      {/* ---------- TIMELINE ---------- */}
    <Timeline/>

      {/* ---------- COUNTERS ---------- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mb-32">
        {[
          { label: "Projects", value: 20 },
          { label: "Years Experience", value: 3 },
          { label: "Technologies", value: 10 },
          { label: "Teams Collaborated", value: 5 }
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-white/70 backdrop-blur-lg shadow-md p-6 border border-slate-200"
          >
            <p className="text-3xl font-extrabold text-indigo-600">
              <CountUp end={s.value} duration={2} />+
            </p>
            <p className="mt-2 text-sm font-medium text-slate-600">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ---------- VALUES ---------- */}
      <div className="grid md:grid-cols-3 gap-6 mb-32">
        {[
          { title: "Do work that inspires", desc: "I strive to deliver impactful software that raises the bar for teams." },
          { title: "Collaboration over ego", desc: "Strong teams build strong products — I value open communication & growth." },
          { title: "Raise the bar", desc: "Constantly improving systems, quality, and developer experience." }
        ].map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 shadow-lg"
          >
            <h4 className="font-semibold">{v.title}</h4>
            <p className="mt-2 text-sm text-slate-300">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* ---------- CLOSING CTA ---------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
          Let’s build something impactful together 🚀
        </h3>
        <div className="flex justify-center gap-3">
          <a
            href="/ErlingEduardoMunguiaUrbinaCV.pdf"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:scale-105 transition"
          >
            <Download className="h-4 w-4" /> Download CV
          </a>
          <ContactLink
            href="mailto:munguia.erling4@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:scale-105 transition"
          >
            <Mail className="h-4 w-4" /> Contact Me
          </ContactLink>
        </div>
      </motion.div>
    </section>
  );
}
 