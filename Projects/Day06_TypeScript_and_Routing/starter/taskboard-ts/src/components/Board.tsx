import type { Status, Task } from '../types'
import Column from './Column'

type BoardProps = {
  tasks: Task[]
  onStatusChange: (id: string, status: Status) => void
  onRename: (id: string, title: string) => void
  onDelete: (id: string) => void
}

const columns: [Status, string][] = [['todo', 'To do'], ['doing', 'In progress'], ['done', 'Done']]

export default function Board({ tasks, onStatusChange, onRename, onDelete }: BoardProps) {
  return (
    <div className="board">
      {columns.map(([status, heading]) => (
        <Column key={status} heading={heading} tasks={tasks.filter((task) => task.status === status)}
          onStatusChange={onStatusChange} onRename={onRename} onDelete={onDelete} />
      ))}
    </div>
  )
}