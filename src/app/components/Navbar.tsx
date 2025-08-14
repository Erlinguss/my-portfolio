export default function Navbar() {
  return (
    <header className="sticky top-4 z-50">
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between bg-white/80 backdrop-blur border border-slate-200 rounded-2xl shadow-sm px-5 py-3">


<div className="flex items-center gap-2">
  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg shadow-md">
    EM
  </div>
</div>
          <ul className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <li><a href="#about" className="hover:text-slate-900">About</a></li>
            <li><a href="#projects" className="hover:text-slate-900">Projects</a></li>
            <li><a href="#skills" className="hover:text-slate-900">Skills</a></li>
            <li><a href="#contact" className="hover:text-slate-900">Contact</a></li>
          </ul>

          <a
            href="mailto:munguia.erling4@gmail.com"
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            munguia.erling4@gmail.com
          </a>
        </div>
      </nav>
    </header>
  );
}
