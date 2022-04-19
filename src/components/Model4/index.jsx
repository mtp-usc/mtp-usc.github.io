import { ThemeProvider } from '@emotion/react'
import { Button, ButtonGroup } from '@mui/material'
import { useState } from 'react'
import { theme } from '../../utils/theme'
import { CustomInput } from '../CustomInput'

// ** https://www.google.com/search?q=LAC%2BUSC+logo&tbm=isch&ved=2ahUKEwiZ0rHp9v_2AhWiFjQIHX-9DdwQ2-cCegQIABAA&oq=LAC%2BUSC+logo&gs_lcp=CgNpbWcQAzIECAAQHjIGCAAQCBAeMgYIABAIEB46BwgjEO8DECc6BQgAEIAEOgYIABAHEB46BAgAEBhQ6wFYrAhg8QloAHAAeACAAV-IAeYDkgEBNpgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=UslNYpnhE6Kt0PEP__q24A0&bih=919&biw=1385&rlz=1C1VDKB_enUS961US961#imgrc=vS_GVmlBFc8G9M **//

import {
  initialState,
  usePredictionModel
} from '../../utils/model4'

export const Model4 = () => {
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
          inputNumber='(1/10)'
          inputType='slide'
          name='AGE'
          range={[16, 100]}
          setState={setState}
          state={state}
          title='Age'
        />

        <CustomInput
          defaultValue={120}
          description='(mm Hg)'
          inputNumber='(2/10)'
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
          inputNumber='(3/10)'
          inputType='slide'
          name='O2'
          range={[1, 100]}
          setState={setState}
          state={state}
          title='Oxygen Saturation %'
        />

        <CustomInput
          defaultValue={120}
          description='(Beats per minute)'
          inputNumber='(4/10)'
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
          defaultValue='Not Performed'
          inputNumber='(5/10)'
          inputType='options'
          name='PR'
          options={['Not Performed', 'Positive', 'Negative']}
          setState={setState}
          state={state}
          title='Pelvis Exam Result'
        />

        <CustomInput
          defaultValue='No'
          inputNumber='(6/10)'
          inputType='options'
          name='SPF'
          options={['Yes', 'No']}
          setState={setState}
          state={state}
          title='Severe Pelvis Fracture'
        />

        <CustomInput
          defaultValue='Negative'
          inputNumber='(7/10)'
          inputType='checkbox'
          name='FAST'
          options={[
            { name: 'FC', label: 'Positive Chest' },
            { name: 'FRLPA', label: 'Positive RUQ, LUQ, Pelvis, Abdomen' }
          ]}
          setState={setState}
          state={state}
          title='FAST Exam Result'
        />

        <CustomInput
          defaultValue='No'
          inputNumber='(8/10)'
          inputType='options'
          name='PNR'
          options={['Yes', 'No']}
          setState={setState}
          state={state}
          title='Penetrating Trauma'
        />

        <CustomInput
          defaultValue='No'
          inputNumber='(9/10)'
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
          defaultValue='Not Testable/Intubated +0'
          inputNumber='(10/10)'
          inputType='options'
          name='GCSVR'
          options={[
            'Oriented +5',
            'Confused +4',
            'Inappropiate Words +3',
            'Incomprehensible Sounds +2',
            'No Verbal Response +1',
            'Not Testable/Intubated +0'
          ]}
          setState={setState}
          state={state}
          title='GCS Verbal Response'
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
        <h1>ABC Score</h1>
        {
          showResults &&
            <p>A ABC Score of <strong>{isMTP.ABC.prediction}</strong> suggests that massive transfusion protocol <span className={`result-${isMTP.ABC.protocol}`}> {isMTP.ABC.label} </span> be initiated.</p>
        }
      </div>

    </>
  )
}
