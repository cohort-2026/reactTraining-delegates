import { useOutletContext } from 'react-router'
import type { BoardContext } from '../pages/Layout'

export function useBoard() {
  const context = useOutletContext<BoardContext>()
  return {
    tasks: context.tasks,
    onAdd: context.onAdd,
    onStatusChange: context.onStatusChange,
    onRename: context.onRename,
    onDelete: context.onDelete,
  }
}