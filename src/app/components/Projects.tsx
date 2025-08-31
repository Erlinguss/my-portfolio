"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Globe, X } from "lucide-react";
import projects from "../data/projects.json";

interface Project {
  image?: string;
  title: string;
  description: string;
  collaboration?: string;
  stack: string[];
  github?: string | null;
  live?: string | null;
}

function ProjectCard({
  project,
  i,
  type,
}: {
  project: Project;
  i: number;
  type: "featured" | "collaboration";
}) {
  const [open, setOpen] = useState(false);

  // ESC key + lock/unlock body scroll
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Card */}
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.1 }}
        className="rounded-2xl border border-slate-200 bg-white shadow-lg 
                  hover:shadow-2xl hover:-translate-y-2 transition p-6 
                  flex flex-col min-h-[520px]"
      >
        {/* Image trigger */}
        {project.image && (
          <div
            onClick={() => setOpen(true)}
            className={`w-full flex justify-center items-center rounded-xl mb-4 overflow-hidden cursor-pointer
              ${type === "featured" ? "aspect-[16/9] bg-white" : "h-72 bg-slate-50"}`}
          >
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-full transition-transform duration-300 hover:scale-105
                ${type === "featured" ? "object-cover" : "object-contain"}`}
            />
          </div>
        )}

        {/* Content (title, description, stack) */}
        <div className="flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
          <p className="text-sm text-slate-600 mt-2">{project.description}</p>
          {project.collaboration && (
            <p className="text-xs text-slate-500 mt-1 italic">
              {project.collaboration}
            </p>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.stack.map((tech: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Spacer pushes buttons down */}
          <div className="flex-grow" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg 
                        bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition"
            >
              <Github size={16} /> Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg 
                        bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                        text-sm font-semibold hover:scale-105 transition"
            >
              <Globe size={16} /> Live
            </a>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <img
              src={project.image}
              alt={project.title}
              className="max-h-[80vh] max-w-[80vw] w-auto h-auto 
                        object-contain rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            onClick={() => setOpen(false)}
            title="Close"
            className="fixed top-6 right-6 flex items-center justify-center 
                      w-10 h-10 text-white bg-black/70 rounded-full 
                      hover:bg-black/90 transition shadow-lg z-[1010]"
          >
            <X size={22} />
          </motion.button>
        </div>
      )}
    </>
  );
}

export default function Projects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mb-32"
    >
      {/* Featured Projects */}
      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {projects.featured.map((p, i) => (
          <ProjectCard key={i} project={p} i={i} type="featured" />
        ))}
      </div>

      {/* Collaborations */}
      <h2 className="text-center text-3xl font-bold text-slate-900 mb-6">
        Collaborations
      </h2>
      <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
        Team-based projects where I contributed to automation, QA, backend
        testing, and UX/UI design.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.collaborations.map((p, i) => (
          <ProjectCard key={i} project={p} i={i} type="collaboration" />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-20">
        <p className="text-slate-600 mb-4">
          Want to see more projects and experiments?
        </p>
        <a
          href="https://github.com/Erlinguss"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 
                    text-sm font-semibold text-white shadow-lg hover:bg-slate-700 transition"
        >
          View More on GitHub
        </a>
      </div>
    </motion.section>
  );
}
