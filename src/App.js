import React from 'react'
import Background from './components/Background'
import Foreground from './components/Foreground'
import Notice from './components/Notice'
import Copyright from './components/Copyright'

const App = () => {
  return (
    <div className='relative w-full h-screen bg-zinc-800'>
      <Notice />
      <Background />
      <Foreground />
      <Copyright />
    </div>
  )
}

export default App