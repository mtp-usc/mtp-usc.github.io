import { ThemeProvider } from '@emotion/react'
import { MenuItem, Select } from '@mui/material'
import { theme } from '../../utils/theme'
import { CommentsSurvey } from '../CommentsSurvey'
import { Model1 } from '../Model1'
import { Model2 } from '../Model2'
import { Model3 } from '../Model3'
import { Model4 } from '../Model4'
import { Model5 } from '../Model5'
import { ModelOverview } from '../ModelOverview'

const ModelOptions = [
  { value: 'overview', name: 'Models Overview' },
  { value: 'model1', name: 'Model 1' },
  { value: 'model2', name: 'Model 2' },
  { value: 'model3', name: 'Model 3' },
  { value: 'model4', name: 'Model 4' },
  { value: 'model5', name: 'Model 5' }
]

export const Model = ({ model, setModel }) => {
  const onChangeOption = e => setModel(e.target.value)
  return (
    <div className='model'>
      <ThemeProvider theme={theme}>
        <Select
          value={model}
          onChange={onChangeOption}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          name='model'
          className='model-select'
        >
          {ModelOptions.map(element =>
            <MenuItem
              key={element.value}
              value={element.value}
            >
              {element.name}
            </MenuItem>
          )}
        </Select>
        {model === 'overview' && <ModelOverview />}
        {model === 'model1' && <Model1 />}
        {model === 'model2' && <Model2 />}
        {model === 'model3' && <Model3 />}
        {model === 'model4' && <Model4 />}
        {model === 'model5' && <Model5 />}
        {model !== 'overview' && <CommentsSurvey />}

      </ThemeProvider>
    </div>
  )
}
