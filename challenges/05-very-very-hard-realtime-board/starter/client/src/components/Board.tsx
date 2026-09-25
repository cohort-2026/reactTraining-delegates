import { COLUMNS, type ColumnId, type Task } from '@taskboard/shared'
import { Column } from './Column'

export interface BoardHandlers {
  onCreate: (title: string, column: ColumnId) => void
  /** `baseVersion` is the version the user started editing from. */
  onRename: (task: Task, title: string, baseVersion: number) => void
  /** -1 moves one column left, +1 one column right. */
  onMove: (task: Task, direction: -1 | 1) => void
  onDelete: (task: Task) => void
}

interface Props extends BoardHandlers {
  tasks: Task[]
  pendingIds: Set<string>
  canEdit: boolean
  canDelete: (task: Task) => boolean
}

export function Board({ tasks, ...rest }: Props) {
  return (
    <div className="board">
      {COLUMNS.map((column) => (
        <Column key={column} column={column} tasks={tasks.filter((t) => t.column === column)} {...rest} />
      ))}
    </div>
  )
}
