"use client";

import TestResults from "../components/TestResults";

export default function CicaPage() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28">
      <div className="mb-16 text-center">
        {/* Page Title */}
      <h1
        className="text-[2.6rem] font-extrabold tracking-tight 
                  bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                  bg-clip-text text-transparent"
      >
        CI/CD Dashboard
      </h1>

        {/* Intro paragraph */}
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Automating the <span className="font-semibold">Portfolio Website</span>. 
          This dashboard showcases an automated{" "}
          <span className="font-semibold">C# + Playwright</span> test suite 
          running daily on{" "}
          <span className="font-semibold">GitHub Actions</span>. 
          Results are parsed from each pipeline run and displayed below.
        </p>
      </div>

      {/* Dashboard */}
      <TestResults />
    </section>
  );
}
