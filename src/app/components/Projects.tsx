"use client";
import { motion } from "framer-motion";
import projects from "./../data/projects.json";
import { Github, Globe } from "lucide-react";

export default function Projects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mb-32"
    >


      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition p-6 flex flex-col"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="rounded-xl mb-4 object-cover h-40 w-full"
              />
            )}

            <h3 className="text-xl font-bold text-slate-900">
              {project.title}
            </h3>
            <p className="text-sm text-slate-600 mt-2 flex-grow">
              {project.description}
            </p>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition"
                >
                  <Github size={16} /> Code
                </a>
              )}
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:scale-105 transition"
                >
                  <Globe size={16} /> Live
                </a>
              ) : (
                <span className="px-3 py-2 rounded-lg border text-xs text-slate-400 border-slate-200">
                  Demo coming soon
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
