import { useState, useEffect, useRef } from 'react'
import './index.css'

function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 10)
      }, 10)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning])

  const formatTime = (timeInMs) => {
    const minutes = Math.floor(timeInMs / 60000)
    const seconds = Math.floor((timeInMs % 60000) / 1000)
    const milliseconds = Math.floor((timeInMs % 1000) / 10)
    
    const displayMins = minutes.toString().padStart(2, '0')
    const displaySecs = seconds.toString().padStart(2, '0')
    const displayMs = milliseconds.toString().padStart(2, '0')
    
    return `${displayMins}:${displaySecs}.${displayMs}`
  }

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
  }

  return (
    <div className="app-container">
      <div className="stopwatch-container">
        <h1 className="title">Stopwatch</h1>
        
        <div className="time-display">
          {formatTime(time)}
        </div>

        <div className="controls">
          <button 
            className={`btn ${isRunning ? 'btn-stop' : 'btn-start'}`}
            onClick={handleStartStop}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>

          <button 
            className="btn btn-reset"
            onClick={handleReset}
            disabled={time === 0 && !isRunning}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
export default App