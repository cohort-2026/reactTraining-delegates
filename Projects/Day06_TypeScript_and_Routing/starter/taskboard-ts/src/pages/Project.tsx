import { Link, useParams } from 'react-router'
import AddTaskForm from '../components/AddTaskForm'
import Board from '../components/Board'
import { useBoard } from '../hooks/useBoard'
import { PROJECTS } from '../types'

export default function Project() {
  const { projectId } = useParams()
  const { tasks, onAdd, onStatusChange, onRename, onDelete } = useBoard()
  const project = PROJECTS.find((item) => item.id === projectId)

  if (!project) return <section><h2>Project not found</h2><Link to="/">Back to dashboard</Link></section>
  if (tasks === null) return <p>Loading starter tasks...</p>

  const projectTasks = tasks.filter((task) => task.projectId === project.id)

  return (
    <section>
      <div className="page-title"><h2>{project.name}</h2><span>{projectTasks.length} tasks</span></div>
      <AddTaskForm onAdd={(task) => onAdd(task, project.id)} />
      <Board tasks={projectTasks} onStatusChange={onStatusChange} onRename={onRename} onDelete={onDelete} />
    </section>
  )
}