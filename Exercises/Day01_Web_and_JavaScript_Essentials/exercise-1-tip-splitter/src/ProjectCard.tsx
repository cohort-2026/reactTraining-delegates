type ProjectCardProps = {
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
}

function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
}: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-500/60">

      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-400">
        {description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">

        {technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-md bg-slate-800 px-3 py-1 text-xs font-medium text-cyan-300"
          >
            {technology}
          </span>
        ))}

      </div>

      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block font-semibold text-cyan-400 hover:underline"
        >
          View on GitHub →
        </a>
      )}

    </article>
  )
}

export default ProjectCard