
import { useState } from 'react'
import { Header } from './components/Header'
import { TopInfo } from './components/TopInfo/index,jsx'
import { ModelOverview } from './components/ModelOverview'
import { Model1 } from './components/Model1'
import { Model2 } from './components/Model2'
import { Model3 } from './components/Model3'
import { Model4 } from './components/Model4'
import { Model5 } from './components/Model5'

function App () {
  const [model, setModel] = useState('overview')
  const [top, setTop] = useState('default')
  return (
    <>
      <Header />
      <div>
        <input type='button' value='Overview' onClick={() => setTop('overview')} />
        <input type='button' value='UI Style' onClick={() => setTop('ui')} />
        <input type='button' value='Missing Value' onClick={() => setTop('missing')} />
        <input type='button' value='Criteria' onClick={() => setTop('criteria')} />
        <input type='button' value='Reset' onClick={() => setTop('default')} />
        <TopInfo model={model} top={top} />
      </div>
      <div>
        <input type='button' value='Models Overview' onClick={() => setModel('overview')} />
        <input type='button' value='Model 1' onClick={() => setModel('model1')} />
        <input type='button' value='Model 2' onClick={() => setModel('model2')} />
        <input type='button' value='Model 3' onClick={() => setModel('model3')} />
        <input type='button' value='Model 4' onClick={() => setModel('model4')} />
        <input type='button' value='Model 5' onClick={() => setModel('model5')} />
        {model === 'overview' && <ModelOverview />}
        {model === 'model1' && <Model1 />}
        {model === 'model2' && <Model2 />}
        {model === 'model3' && <Model3 />}
        {model === 'model4' && <Model4 />}
        {model === 'model5' && <Model5 />}
      </div>
    </>
  )
}

export default App
