import type { Project } from '../data/cv'

type ProjectCardProps = Project

function ProjectCard({
  title,
  summary,
  highlights,
  technologies,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-red-200 bg-white p-6 transition hover:-translate-y-1 dark:border-red-900 dark:bg-black">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-slate-600 dark:text-red-200">{summary}</p>

      {highlights.length > 0 && (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 marker:text-red-600 dark:text-red-100 dark:marker:text-red-500">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-md bg-red-100 px-3 py-1 text-xs dark:bg-red-950"
          >
            {technology}
          </span>
        ))}
      </div>

      {(githubUrl || liveUrl) && (
        <div className="mt-5 flex gap-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline hover:text-red-600 dark:hover:text-red-500"
            >
              GitHub
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline hover:text-red-600 dark:hover:text-red-500"
            >
              Live Demo
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export default ProjectCard