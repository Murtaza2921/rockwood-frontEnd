import { useState } from 'react'
import MainLayout from './component/MainLayout'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<MainLayout/>
    </>
  )
}

export default App
