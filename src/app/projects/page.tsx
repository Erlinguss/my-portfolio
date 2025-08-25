import Projects from "../components/Projects";

export default function ProjectsPage() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Featured Projects
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          A selection of my best work — from frontend design to backend APIs and
          automation testing. Each project highlights different skills in my
          full-stack journey.
        </p>
      </div>

      {/* Projects Grid */}
      <Projects />
    </section>
  );
}
