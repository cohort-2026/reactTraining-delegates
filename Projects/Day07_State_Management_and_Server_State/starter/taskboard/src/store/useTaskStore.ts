import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Task = {
  id: string
  title: string
  columnId: string
}

type TaskStore = {
  tasks: Task[]
  addTask: (task: Task) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, columnId: string) => void
  renameTask: (id: string, title: string) => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
      moveTask: (id, columnId) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, columnId } : t))
      })),
      renameTask: (id, title) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, title } : t))
      })),
    }),
    { name: 'tasks-storage' }
  )
)