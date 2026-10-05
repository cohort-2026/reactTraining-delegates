import { useParams } from 'react-router-dom'

export default function Project(){
  const { projectId } = useParams()
  const tasks = useStore(s => s.tasks)
  const filtered = tasks.filter(t => t.projectId === projectId)

  if(!filtered.length)  return <div>Project not found</div>
    return <TaskList tasks={filtered} />
}