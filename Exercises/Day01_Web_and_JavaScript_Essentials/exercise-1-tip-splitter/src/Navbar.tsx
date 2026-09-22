function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <a
          href="#home"
          className="text-xl font-bold text-cyan-400"
        >
          Cloupas<span className="text-white">.dev</span>
        </a>

        <div className="hidden gap-6 text-sm md:flex">
          <a
            href="#about"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            About
          </a>

          <a
            href="#skills"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            Skills
          </a>

          <a
            href="#projects"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            Projects
          </a>

          <a
            href="#contact"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            Contact
          </a>
        </div>

      </div>
    </nav>
  )
}

export default Navbar