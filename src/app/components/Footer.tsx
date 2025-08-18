"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-28 md:mt-36" aria-labelledby="site-footer">
      {/* top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600" />

      <div id="site-footer" className="bg-[#0b0f19] text-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2">
            
            {/* LEFT — headline + contact */}
            <section>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-400">
                Let’s build reliable, scalable apps
              </h2>
              <p className="mt-3 text-slate-400 max-w-[46ch]">
                Full-stack developer with strong QA automation background. 
                Focused on building clean code, scalable systems, and 
                delivering real business value.
              </p>

              <div className="mt-6 space-y-4">
                {/* email */}
                <a
                  href="mailto:munguia.erling4@gmail.com"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/[0.08] transition"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                    <FaEnvelope aria-hidden />
                  </span>
                  <div>
                    <div className="text-sm text-slate-300">Email</div>
                    <div className="text-slate-200 font-semibold">
                      munguia.erling4@gmail.com
                    </div>
                  </div>
                </a>

                {/* location */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                    <FiMapPin aria-hidden />
                  </span>
                  <div>
                    <div className="text-sm text-slate-300">Location</div>
                    <div className="text-slate-200 font-semibold">
                      Ireland                  </div>
                  </div>
                </div>
              </div>
            </section>

            {/* RIGHT — services + links */}
            <section className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-slate-300">Quick Links</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li><Link className="hover:text-white" href="#about">About</Link></li>
                  <li><Link className="hover:text-white" href="#projects">Projects</Link></li>
                  <li><Link className="hover:text-white" href="#skills">Skills</Link></li>
                  <li><a className="hover:text-white" href="/api/cv?v=1">Download CV</a></li>
                  <li><a className="hover:text-white" href="mailto:munguia.erling4@gmail.com">Contact</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-300">Services</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="text-slate-400 hover:text-white">Full-Stack Development</li>
                  <li className="text-slate-400 hover:text-white">API Design & Testing</li>
                  <li className="text-slate-400 hover:text-white">Databases & Data Modeling</li>
                  <li className="text-slate-400 hover:text-white">Automation & CI/CD</li>
                  <li className="text-slate-400 hover:text-white">Agile & Collaboration</li>
                </ul>

                {/* socials */}
                <div className="mt-5 flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/erling-munguia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white hover:bg-blue-400"
                  >
                    <FaLinkedin size={18} />
                  </a>
                  <a
                    href="https://github.com/Erlinguss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/[0.08]"
                  >
                    <FaGithub size={18} />
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* bottom bar */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-5">
            <p className="text-xs text-slate-400">
              © {year} Erling Munguia — Built with Next.js & Tailwind.
            </p>
            <a
              href="#top"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/[0.08] text-slate-200 text-xs"
            >
              ↑ Back to Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
