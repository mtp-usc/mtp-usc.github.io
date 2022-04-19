import { ThemeProvider } from '@emotion/react'
import { Button, ButtonGroup } from '@mui/material'
import { useState } from 'react'
import { theme } from '../../utils/theme'
import { CustomInput } from '../CustomInput'

// ** https://www.google.com/search?q=LAC%2BUSC+logo&tbm=isch&ved=2ahUKEwiZ0rHp9v_2AhWiFjQIHX-9DdwQ2-cCegQIABAA&oq=LAC%2BUSC+logo&gs_lcp=CgNpbWcQAzIECAAQHjIGCAAQCBAeMgYIABAIEB46BwgjEO8DECc6BQgAEIAEOgYIABAHEB46BAgAEBhQ6wFYrAhg8QloAHAAeACAAV-IAeYDkgEBNpgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=UslNYpnhE6Kt0PEP__q24A0&bih=919&biw=1385&rlz=1C1VDKB_enUS961US961#imgrc=vS_GVmlBFc8G9M **//

import {
  AGE_CLASSES,
  initialState,
  O2_CLASSES,
  usePredictionModel
} from '../../utils/model5'

export const Model5 = () => {
  const [state, setState] = useState(initialState)
  const [isMTP, setIsMTP] = useState({})
  const [showResults, setShowResults] = useState(false)
  const recalculatePrediction = usePredictionModel()

  recalculatePrediction({ state, setIsMTP })

  const onPredict = () => {
    setShowResults(true)
  }

  const onReset = () => {
    setState(initialState)
    setShowResults(false)
  }

  return (
    <>
      <div className='model-input-zone'>

        <CustomInput
          defaultValue={25}
          inputNumber='(1/6)'
          inputType='options'
          name='AGE'
          options={[
            AGE_CLASSES.C0,
            AGE_CLASSES.C1
          ]}
          setState={setState}
          state={state}
          title='Age'
        />

        <CustomInput
          defaultValue={120}
          description='(mm Hg)'
          inputNumber='(2/6)'
          inputType='slide'
          name='SBP'
          range={[1, 200]}
          setState={setState}
          state={state}
          title='Systolic Blood Pressure'
        />

        <CustomInput
          defaultValue={12}
          description='(O2%)'
          inputNumber='(3/6)'
          inputType='options'
          name='O2'
          options={[
            O2_CLASSES.C0,
            O2_CLASSES.C1,
            O2_CLASSES.C2,
            O2_CLASSES.C3
          ]}
          setState={setState}
          state={state}
          title='Oxygen Saturation %'
        />

        <CustomInput
          defaultValue={120}
          description='(Beats per minute)'
          inputNumber='(4/6)'
          inputType='slide'
          name='HR'
          range={[1, 200]}
          setState={setState}
          state={state}
          title='Heart Rate'
        />
      </div>

      <h1 style={{ marginTop: 40 }}>Examination</h1>

      <div className='model-input-zone'>

        <CustomInput
          defaultValue='No'
          inputNumber='(5/6)'
          inputType='options'
          name='BLR'
          options={['Yes', 'No']}
          setState={setState}
          state={state}
          title='Blunt Trauma'
        />

      </div>

      <h1 style={{ marginTop: 40 }}>GCS Test</h1>

      <div className='model-input-zone'>

        <CustomInput
          defaultValue='Not Testable +0'
          inputNumber='(6/6)'
          inputType='options'
          name='GCSMR'
          options={[
            'Obeys Commands +6',
            'Localizes Pain +5',
            'Withdrawal from Pain +4',
            'Flexion to Pain +3',
            'Extension to Pain +2',
            'No Motor Response +1',
            'Not Testable +0'
          ]}
          setState={setState}
          state={state}
          title='GCS Motor Response'
        />

      </div>

      <div className='info-buttons'>

        <ThemeProvider theme={theme}>

          <ButtonGroup
            variant='contained'
            aria-label='outlined primary button group'
            size='large'
          >
            <Button
              onClick={onPredict}
            >Predict
            </Button>
            <Button
              onClick={onReset}
            >Reset
            </Button>

          </ButtonGroup>

        </ThemeProvider>
      </div>

      <div className='div-results'>
        <h1>Prediction</h1>
        {
          showResults &&
            <p>A estimated probability of <strong>{parseFloat(isMTP.model.prediction).toFixed(3)}</strong> suggests that massive transfusion protocol <span className={`result-${isMTP.model.protocol}`}> {isMTP.model.label} </span> be initiated.</p>
        }
        <h1>Shock Index</h1>
        {
          showResults &&
            <p>A Shock Index of <strong>{parseFloat(isMTP.SI.prediction).toFixed(3)}</strong> suggests that massive transfusion protocol <span className={`result-${isMTP.SI.protocol}`}> {isMTP.SI.label} </span> be initiated.</p>
        }

      </div>

    </>
  )
}
