import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>ABOUT ME</h1>
      <p>I am Visalachi, a passionate 3rd-year B.Tech Information Technology student at SNS College of Engineering. With strong problem-solving and time management skills, I have a keen interest in data science and full-stack development.
I have worked on multiple projects, including Fiesta Indiana (a tourism website), Inner Peace AI (a mental health platform), Aara (an image recognition chatbot), and a Library Management System with data visualization.
      </p>
      <img src='visa.jpeg'></img>
    </>
  )
}

export default App
