import { useState } from 'react'
import './App.css'
import WordResultDisplay from './components/WordResultDisplay'

function App() {
  const [] = useState(0)

  return (
    <div className='app'>
      <h1 className='app_title'>Wordle</h1>
      <WordResultDisplay />
    </div>
  )
}

export default App
