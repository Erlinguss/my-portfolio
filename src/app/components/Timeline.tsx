"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimelineItem {
  _id: string;
  year: string;
  role: string;
  desc: string;
}

export default function Timeline() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  useEffect(() => {
    fetch("/api/timeline")
      .then((res) => res.json())
      .then((data) => setTimeline(data));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mb-32"
    >
      <h3 className="text-center text-2xl font-bold text-slate-900 mb-16">
        Journey & Milestones
      </h3>
      <div className="relative max-w-4xl mx-auto">
        {/* vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />

        {timeline.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative w-1/2 px-6 py-6 ${
              i % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left ml-auto"
            }`}
          >
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow-md" />
            <p className="text-sm text-slate-500">{item.year}</p>
            <h4 className="font-semibold text-slate-900">{item.role}</h4>
            <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
