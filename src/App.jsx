
import { useState } from 'react'
import { Header } from './components/Header'
import { TopInfo } from './components/TopInfo'
import { Model } from './components/Model'

function App () {
  const [model, setModel] = useState('overview')
  const [top, setTop] = useState('default')
  return (
    <>
      <Header />
      <TopInfo model={model} top={top} setTop={setTop} />
      <Model model={model} setModel={setModel} />
    </>
  )
}

export default App
