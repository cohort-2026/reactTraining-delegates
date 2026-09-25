import type { Role, Task } from '@taskboard/shared'

export type Action = 'task.create' | 'task.update' | 'task.move' | 'task.delete'

/**
 * The ONE place that decides who may do what.
 *
 * | Role   | create | update | move | delete                  |
 * |--------|--------|--------|------|-------------------------|
 * | owner  | yes    | yes    | yes  | any task                |
 * | member | yes    | yes    | yes  | only tasks they created |
 * | viewer | no     | no     | no   | no                      |
 *
 * `role` is undefined when the user is not (or no longer) a member of the board.
 */
export function can(
  _role: Role | undefined,
  _action: Action,
  _userId: string,
  _task?: Pick<Task, 'createdBy'>,
): boolean {
  // TODO (milestone 3): implement the table above. Deny by default.
  throw new Error('TODO: can (milestone 3)')
}
