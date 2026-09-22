function About() {
  return (
    <section
      id="about"
      className="border-y border-slate-800 bg-slate-900/60 px-6 py-20"
    >
      <div className="mx-auto max-w-4xl">

        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
          About
        </p>

        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          About Me
        </h2>

        <p className="mt-6 leading-8 text-slate-400">
          I have a Diploma in Information Technology with a specialization
          in Network Engineering. I am developing my skills through practical
          projects using React, TypeScript, JavaScript, and modern web
          technologies.
        </p>

        <p className="mt-4 leading-8 text-slate-400">
          I am interested in software development, systems support,
          networking, and building solutions that make everyday tasks
          easier and more efficient.
        </p>

      </div>
    </section>
  )
}

export default About