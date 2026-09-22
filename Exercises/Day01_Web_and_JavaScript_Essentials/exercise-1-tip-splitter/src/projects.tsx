import ProjectCard from './ProjectCard'

const projects = [
  {
    title: 'Inventory Management System',
    description:
      'A React and TypeScript application designed to help manage products, inventory quantities, stock movements, and low-stock information in one place.',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'REST API',
    ],
  },

  {
    title: 'Developer Portfolio',
    description:
      'A responsive personal portfolio built to present my technical skills, projects, background, and contact information.',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Git',
    ],
  },
]

function Projects() {
  return (
    <section
      id="projects"
      className="border-y border-slate-800 bg-slate-900/60 px-6 py-20"
    >

      <div className="mx-auto max-w-6xl">

        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
          My Work
        </p>

        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Projects
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              {...project}
            />
          ))}

        </div>

      </div>
    </section>
  )
}

export default Projects