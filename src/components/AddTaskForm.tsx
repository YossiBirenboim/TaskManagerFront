// src/components/AddTaskForm.tsx
import React, { useState } from 'react'
import { useTaskStore } from '../store/useTaskStore'

const AddTaskForm = () => {
  const [task, setTask] = useState('')
  const addTask = useTaskStore((state) => state.addTask)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task.trim()) {
      addTask(task)
      setTask('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="הכנס משימה"
      />
      <button type="submit">הוסף</button>
    </form>
  )
}

export default AddTaskForm
