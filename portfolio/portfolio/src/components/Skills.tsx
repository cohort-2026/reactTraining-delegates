import { skillGroups } from '../data/cv'
import SectionHeading from './SectionHeading'

function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading number="02" title="Technical skills" />

        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-xl border border-red-200 p-6 dark:border-red-900"
            >
              <h3 className="font-mono text-sm font-medium text-red-600 dark:text-red-500">
                {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-red-100 px-3 py-1 text-sm dark:bg-red-950"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills