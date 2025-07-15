

import './App.css'
import React, { useEffect, useState } from 'react'
import { useTaskStore } from './store/useTaskStore'
import AddTaskForm from './components/AddTaskForm'

const App = () => {
  const { tasks, fetchTasks, updateTask, deleteTask } = useTaskStore()
  const [editId, setEditId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

return (
  <>
    <h1>רשימת משימות</h1>
    <AddTaskForm />
    <ul>
      {tasks.map((item) => (
        <li key={item._id} className={item.completed ? 'completed' : ''}>
          {editId === item._id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className="task-buttons">
                <button onClick={() => {
                  updateTask(item._id, { task: editText })
                  setEditId(null)
                }}>💾 שמור</button>
              </div>
            </>
          ) : (
            <>
              <div>
                <span>{item.task}</span><br />
                <small className="task-date">
                  {new Date(item.createdAt).toLocaleString('he-IL')}
                </small>
              </div>
              <div className="task-buttons">
                <button onClick={() => {
                  setEditId(item._id)
                  setEditText(item.task)
                }}>✏️ ערוך</button>
                <button onClick={() => updateTask(item._id, { completed: !item.completed })}>
                  {item.completed ? '✅ בוצע' : '⬜️ סמן'}
                </button>
                <button onClick={() => {
                  if (window.confirm('למחוק משימה?')) deleteTask(item._id)
                }}>🗑️ מחק</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  </>
)
}

export default App
