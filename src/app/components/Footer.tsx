"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import Copy from "./CopyClipboard";
import ContactLink from "./ContactLink";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-28 md:mt-36" aria-labelledby="site-footer">
      {/* Top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600" />

      <div id="site-footer" className="bg-[#0b0f19] text-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2">
            {/* LEFT — headline + contact */}
            <section aria-labelledby="footer-title">
              {/* <h2
                id="footer-title"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-400"
              >
                Let’s build reliable, scalable apps
              </h2> */}

<h2
  id="footer-title"
  className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100"
>
  Let’s build <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">reliable, scalable apps</span>
</h2>

              <p className="mt-3 text-slate-400 max-w-[46ch]">
                Full-stack developer with strong QA automation background.
                Focused on building clean code, scalable systems, and delivering
                real business value.
              </p>

              <div className="mt-6 space-y-4">
                {/* Email card */}
                <FooterCard>
                  <a
                    href="mailto:munguia.erling4@gmail.com"
                    className="flex min-w-0 items-center gap-4 group"
                    aria-label="Email: munguia.erling4@gmail.com"
                  >
                    <IconCircle>
                      <FaEnvelope aria-hidden />
                    </IconCircle>

                    <div className="min-w-0">
                      <div className="text-sm text-slate-300">Email</div>
                      <div className="truncate text-slate-100 font-semibold">
                        munguia.erling4@gmail.com
                      </div>
                    </div>
                  </a>

                  {/* Copy button on the right */}
                  <Copy
                    value="munguia.erling4@gmail.com"
                    className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/[0.08]"
                  />
                </FooterCard>

                {/* Location card */}
                <FooterCard>
                  <div className="flex min-w-0 items-center gap-4">
                    <IconCircle>
                      <FiMapPin aria-hidden />
                    </IconCircle>

                    <div className="min-w-0">
                      <div className="text-sm text-slate-300">Location</div>
                      <div className="text-slate-100 font-semibold">Ireland</div>
                    </div>
                  </div>
                  {/* right side empty to keep layout symmetry */}
                  <div aria-hidden className="h-10 w-10" />
                </FooterCard>
              </div>
            </section>

            {/* RIGHT — services + links */}
            <section className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-slate-300">Quick Links</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded" href="#about">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded" href="#projects">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded" href="#skills">
                      Skills
                    </Link>
                  </li>
                  <li>
                    <a
                      className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded"
                      href="/api/cv?v=1"
                    >
                      Download CV
                    </a>
                  </li>
                  <li>
                    {/* Opens modal; looks like a link */}
                    <ContactLink className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded">
                      Contact
                    </ContactLink>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-300">Services</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="text-slate-400 hover:text-white">Full-Stack Development</li>
                  <li className="text-slate-400 hover:text-white">API Design &amp; Testing</li>
                  <li className="text-slate-400 hover:text-white">Databases &amp; Data Modeling</li>
                  <li className="text-slate-400 hover:text-white">Automation &amp; CI/CD</li>
                  <li className="text-slate-400 hover:text-white">Agile &amp; Collaboration</li>
                </ul>

                {/* Socials */}
                <div className="mt-5 flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/erling-munguia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                    aria-label="Open LinkedIn profile"
                  >
                    <FaLinkedin size={18} />
                  </a>
                  <a
                    href="https://github.com/Erlinguss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                    aria-label="Open GitHub profile"
                  >
                    <FaGithub size={18} />
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-5">
            <p className="text-xs text-slate-400">
              © {year} Erling Munguia — Built with Next.js &amp; Tailwind.
            </p>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/[0.08] text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
              aria-label="Back to top"
            >
              ↑ 
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      {children}
    </div>
  );
}

function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 ring-1 ring-inset ring-white/10 transition-colors group-hover:bg-blue-500/25">
      {children}
    </span>
  );
}
