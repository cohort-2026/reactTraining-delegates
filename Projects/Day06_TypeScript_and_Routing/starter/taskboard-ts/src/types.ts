export type Status = 'todo' | 'doing' | 'done'

export type Task = {
  id: string
  title: string
  assignee?: string
  points: number
  status: Status
  projectId: string
}

export type NewTask = Pick<Task, 'title' | 'assignee' | 'points'>

export const PROJECTS = [
  { id: 'website', name: 'Website' },
  { id: 'mobile', name: 'Mobile app' },
] as const

export type ProjectInfo = (typeof PROJECTS)[number]