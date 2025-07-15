// src/store/useTaskStore.ts
import { create } from 'zustand'
import axios from 'axios'

type Task = {
  _id: string
  task: string
  completed: boolean
  createdAt: string
}

type TaskStore = {
  tasks: Task[]
  fetchTasks: () => void
  addTask: (task: string) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  fetchTasks: async () => {
    const res = await axios.get<Task[]>('https://taskmanager-dweg.onrender.com/task')
    set({ tasks: res.data })
  },
  addTask: async (task) => {
    const res = await axios.post<Task>('https://taskmanager-dweg.onrender.com/task', { task })
    set((state) => ({ tasks: [...state.tasks, res.data] }))
  },
  updateTask: async (id, updates) => {
    const res = await axios.put<Task>(`https://taskmanager-dweg.onrender.com/task/${id}`, updates)
    set((state) => ({
      tasks: state.tasks.map((t) => (t._id === id ? res.data : t))
    }))
  },
  deleteTask: async (id) => {
    await axios.delete(`https://taskmanager-dweg.onrender.com/task/${id}`)
    set((state) => ({
      tasks: state.tasks.filter((t) => t._id !== id)
    }))
  }
}))


