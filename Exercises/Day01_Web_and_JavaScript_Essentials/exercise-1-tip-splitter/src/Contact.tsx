function Contact() {
  return (
    <section id="contact" className="px-6 py-20">

      <div className="mx-auto max-w-4xl text-center">

        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
          Get In Touch
        </p>

        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Contact Me
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
          I am open to junior software development, IT support, and
          technology opportunities where I can learn, contribute, and grow.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <a
            href="mailto:cloupasmokgohloa95@gmail.com"
            className="rounded-lg bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-300"
          >
            Email Me
          </a>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-700 px-6 py-3 font-bold transition hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-400"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-700 px-6 py-3 font-bold transition hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-400"
          >
            LinkedIn
          </a>

        </div>

      </div>
    </section>
  )
}

export default Contact