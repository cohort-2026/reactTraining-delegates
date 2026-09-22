import { certifications, education } from '../data/cv'
import SectionHeading from './SectionHeading'

function Education() {
  return (
    <section
      id="education"
      className="bg-red-50 px-6 py-24 dark:bg-red-950/40"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading number="05" title="Education & certifications" />

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="font-mono text-sm font-medium text-red-600 dark:text-red-500">
              Education
            </h3>
            <ul className="mt-4 space-y-4">
              {education.map((item) => (
                <li key={item.institution}>
                  <p className="font-bold">{item.institution}</p>
                  <p className="text-slate-600 dark:text-red-200">
                    {item.qualification}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm font-medium text-red-600 dark:text-red-500">
              Certifications
            </h3>
            <ul className="mt-4 space-y-3">
              {certifications.map((certification) => (
                <li key={certification} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-600 dark:bg-red-500" />
                  <span>{certification}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education