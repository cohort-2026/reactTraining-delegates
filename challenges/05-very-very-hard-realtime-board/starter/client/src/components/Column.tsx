import { COLUMN_TITLES, COLUMNS, type ColumnId, type Task } from '@taskboard/shared'
import type { BoardHandlers } from './Board'
import { NewTaskForm } from './NewTaskForm'
import { TaskCard } from './TaskCard'

interface Props extends BoardHandlers {
  column: ColumnId
  tasks: Task[]
  pendingIds: Set<string>
  canEdit: boolean
  canDelete: (task: Task) => boolean
}

export function Column({ column, tasks, pendingIds, canEdit, canDelete, onCreate, ...handlers }: Props) {
  const index = COLUMNS.indexOf(column)
  const headingId = `column-${column}`
  return (
    <section className="column" aria-labelledby={headingId}>
      <h3 id={headingId}>
        {COLUMN_TITLES[column]} <span className="count">{tasks.length}</span>
      </h3>
      <ul className="cards">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            pending={pendingIds.has(task.id)}
            canEdit={canEdit}
            canDelete={canDelete(task)}
            canMoveLeft={index > 0}
            canMoveRight={index < COLUMNS.length - 1}
            {...handlers}
          />
        ))}
      </ul>
      {tasks.length === 0 && <p className="empty">Nothing here yet.</p>}
      {canEdit && <NewTaskForm onAdd={(title) => onCreate(title, column)} label={`Add a task to ${COLUMN_TITLES[column]}`} />}
    </section>
  )
}
