function Hero() {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-[85vh] max-w-6xl items-center px-6 py-20"
    >
      <div className="max-w-3xl">

        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
          Hello, I'm
        </p>

        <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
          Cloupas Mokgohloa
        </h1>

        <h2 className="mt-5 text-2xl font-semibold text-slate-300 sm:text-3xl">
          Junior Software Developer
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          I am a junior developer with a background in Information Technology
          and Network Engineering. I enjoy building useful applications,
          solving technical problems, and learning new technologies.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">

          <a
            href="#projects"
            className="rounded-lg bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-300"
          >
            View My Projects
          </a>

          <a
            href="#contact"
            className="rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-200 transition hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-400"
          >
            Contact Me
          </a>

        </div>
      </div>
    </section>
  )
}

export default Hero