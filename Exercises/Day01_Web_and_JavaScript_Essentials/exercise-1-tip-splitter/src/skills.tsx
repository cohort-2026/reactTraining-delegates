const skills = [
  'React',
  'TypeScript',
  'JavaScript',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'Vite',
  'Git',
  'GitHub',
  'Node.js',
  'REST API',
  'IT Support',
  'Network Engineering',
  'Microsoft 365',
  'Active Directory',
  'SAP',
]

function Skills() {
  return (
    <section id="skills" className="px-6 py-20">

      <div className="mx-auto max-w-6xl">

        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
          Technologies
        </p>

        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Skills
        </h2>

        <div className="mt-8 flex flex-wrap gap-3">

          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 transition hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-400"
            >
              {skill}
            </span>
          ))}

        </div>
      </div>
    </section>
  )
}

export default Skills