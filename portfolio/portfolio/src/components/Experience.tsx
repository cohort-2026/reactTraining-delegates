import { jobs } from '../data/cv'
import SectionHeading from './SectionHeading'

function Experience() {
  return (
    <section
      id="experience"
      className="bg-red-50 px-6 py-24 dark:bg-red-950/40"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading number="03" title="Work experience" />

        <ol className="space-y-10 border-l border-red-300 pl-6 dark:border-red-800">
          {jobs.map((job) => (
            <li key={`${job.company}-${job.period}`} className="relative">
              <span className="absolute -left-[1.9rem] top-2 h-3 w-3 rounded-full bg-red-600 dark:bg-red-500" />

              <p className="font-mono text-sm text-slate-500 dark:text-red-300">
                {job.period}
              </p>
              <h3 className="mt-1 text-xl font-bold">{job.role}</h3>
              <p className="text-slate-600 dark:text-red-200">{job.company}</p>

              {job.highlights.length > 0 && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700 marker:text-red-600 dark:text-red-100 dark:marker:text-red-500">
                  {job.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Experience