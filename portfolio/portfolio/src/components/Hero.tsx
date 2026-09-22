import { profile } from '../data/cv'

function Hero() {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-[80vh] max-w-5xl items-center px-6 py-20"
    >
      <div>
        <p className="font-mono text-sm uppercase tracking-widest text-red-600 dark:text-red-500">
          Hello, I'm
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">
          {profile.name}
        </h1>

        <p className="mt-4 text-xl text-slate-600 sm:text-2xl dark:text-red-200">
          {profile.title}
        </p>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-red-200">
          {profile.tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {profile.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-red-300 bg-red-100 px-3 py-1 font-mono text-xs text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:-translate-y-1 hover:bg-red-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
          >
            View my projects
          </a>
          <a
            href={profile.cvUrl}
            download
            className="rounded-lg border border-red-300 px-5 py-3 font-medium transition hover:-translate-y-1 hover:border-red-600 dark:border-red-800 dark:hover:border-red-500"
          >
            Download CV
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-red-300 px-5 py-3 font-medium transition hover:-translate-y-1 hover:border-red-600 dark:border-red-800 dark:hover:border-red-500"
          >
            Contact me
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero