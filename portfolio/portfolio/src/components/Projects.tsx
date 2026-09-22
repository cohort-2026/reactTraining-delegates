import { projects } from '../data/cv'
import ProjectCard from './ProjectCard'
import SectionHeading from './SectionHeading'

function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading number="04" title="Featured projects" />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects