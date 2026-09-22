import { profile } from '../data/cv'
import SectionHeading from './SectionHeading'

function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading number="06" title="Get in touch" />

        <p className="max-w-2xl text-lg text-slate-600 dark:text-red-200">
          Interested in working together, or just want to say hello? My inbox
          is open.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:-translate-y-1 hover:bg-red-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
          >
            Email me
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-red-300 px-5 py-3 font-medium transition hover:-translate-y-1 hover:border-red-600 dark:border-red-800 dark:hover:border-red-500"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-red-300 px-5 py-3 font-medium transition hover:-translate-y-1 hover:border-red-600 dark:border-red-800 dark:hover:border-red-500"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact