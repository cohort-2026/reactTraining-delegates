import { useSearchParams } from 'react-router'
import AddTaskForm from '../components/AddTaskForm'
import Board from '../components/Board'
import { useBoard } from '../hooks/useBoard'

export default function Dashboard() {
  const { tasks, onAdd, onStatusChange, onRename, onDelete } = useBoard()
  const [searchParams, setSearchParams] = useSearchParams()

  if (tasks === null) return <p>Loading starter tasks...</p>

  const query = searchParams.get('q') ?? ''
  const visibleTasks = tasks.filter((task) => task.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <section>
      <div className="page-title"><h2>Dashboard</h2><span>{visibleTasks.length} tasks</span></div>
      <AddTaskForm onAdd={(task) => onAdd(task, 'website')} />
      <div className="search-row">
        <label htmlFor="task-search">Search tasks</label>
        <input id="task-search" className="search-input" value={query}
          onChange={(event) => setSearchParams(event.target.value ? { q: event.target.value } : {})} />
      </div>
      <Board tasks={visibleTasks} onStatusChange={onStatusChange} onRename={onRename} onDelete={onDelete} />
    </section>
  )
}