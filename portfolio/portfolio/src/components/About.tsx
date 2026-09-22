import { profile } from '../data/cv'
import SectionHeading from './SectionHeading'

function About() {
  return (
    <section id="about" className="bg-red-50 px-6 py-24 dark:bg-red-950/40">
      <div className="mx-auto max-w-5xl">
        <SectionHeading number="01" title="About me" />
        <p className="max-w-3xl text-lg leading-8 text-slate-700 dark:text-red-200">
          {profile.summary}
        </p>
        <p className="mt-6 font-mono text-sm text-slate-500 dark:text-red-300">
          Based in {profile.location}
        </p>
      </div>
    </section>
  )
}

export default About