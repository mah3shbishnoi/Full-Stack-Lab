import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      return JSON.parse(savedTodos)
    } else {
      return [
        { id: 1, text: 'Learn React', completed: true },
        { id: 2, text: 'Build a premium UI', completed: false },
        { id: 3, text: 'Master animations', completed: false }
      ]
    }
  })
  
  const [inputValue, setInputValue] = useState('')
  const [removingId, setRemovingId] = useState(null)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }
    
    setTodos([newTodo, ...todos])
    setInputValue('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setRemovingId(id)
    setTimeout(() => {
      setTodos(todos.filter(todo => todo.id !== id))
      setRemovingId(null)
    }, 300)
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>Task Manager</h1>
        <p>Stay organized, stay focused.</p>
      </div>

      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="add-btn">
          Add Task
        </button>
      </form>

      {todos.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Add one above! ✨</p>
        </div>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <li 
              key={todo.id} 
              className={`todo-item ${todo.completed ? 'completed' : ''} ${removingId === todo.id ? 'removing' : ''}`}
            >
              <input
                type="checkbox"
                className="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
              <button 
                className="delete-btn" 
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default App