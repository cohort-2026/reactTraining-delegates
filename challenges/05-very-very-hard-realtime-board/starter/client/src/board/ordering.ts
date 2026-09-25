import type { ColumnId, Task } from '@taskboard/shared'

/** An `order` value that puts a task at the bottom of `column`. */
export function orderAtEnd(tasks: Task[], column: ColumnId): number {
  const orders = tasks.filter((t) => t.column === column).map((t) => t.order)
  return orders.length ? Math.max(...orders) + 1 : 1
}
