import { ThemeProvider } from '@emotion/react'
import { Button, ButtonGroup } from '@mui/material'
import { useState } from 'react'
import { theme } from '../../utils/theme'
import { CustomInput } from '../CustomInput'

// ** https://www.google.com/search?q=LAC%2BUSC+logo&tbm=isch&ved=2ahUKEwiZ0rHp9v_2AhWiFjQIHX-9DdwQ2-cCegQIABAA&oq=LAC%2BUSC+logo&gs_lcp=CgNpbWcQAzIECAAQHjIGCAAQCBAeMgYIABAIEB46BwgjEO8DECc6BQgAEIAEOgYIABAHEB46BAgAEBhQ6wFYrAhg8QloAHAAeACAAV-IAeYDkgEBNpgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=UslNYpnhE6Kt0PEP__q24A0&bih=919&biw=1385&rlz=1C1VDKB_enUS961US961#imgrc=vS_GVmlBFc8G9M **//

import {
  initialState,
  usePredictionModel,
} from '../../utils/model1'

import {
  submitData,
} from '../../utils/submit'

export const Model1 = () => {
  const modelNum = 1
  const [state, setState] = useState(initialState)
  const [isMTP, setIsMTP] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [resultSerialNumber, setResultSerialNumber] = useState()
  const recalculatePrediction = usePredictionModel()

  recalculatePrediction({ state, setIsMTP })

  const onPredict = () => {
    submitData({state, isMTP, setShowResults, setResultSerialNumber, modelNum})
  }

  const onReset = () => {
    setState(initialState)
    setShowResults(false)
    setResultSerialNumber()
  }

  return (
    <>
      <div className='model-input-zone'>
        <CustomInput
          defaultValue={25}
          inputNumber='(1/14)'
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
          inputNumber='(2/14)'
          inputType='slide'
          name='SBP'
          range={[1, 200]}
          setState={setState}
          state={state}
          title='Systolic Blood Pressure'
        />

        <CustomInput
          defaultValue={80}
          description='(mm Hg)'
          inputNumber='(3/14)'
          inputType='slide'
          name='DBP'
          range={[1, 200]}
          setState={setState}
          state={state}
          title='Diastolic Blood Pressure'
        />

        <CustomInput
          defaultValue={12}
          description='(Breaths per minute)'
          inputNumber='(4/14)'
          inputType='slide'
          name='RR'
          range={[1, 40]}
          setState={setState}
          state={state}
          title='Respiratory Rate'
        />

        <CustomInput
          defaultValue={12}
          description='(O2%)'
          inputNumber='(5/14)'
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
          inputNumber='(6/14)'
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
          inputNumber='(7/14)'
          inputType='options'
          name='PR'
          options={['Not Performed', 'Positive', 'Negative']}
          setState={setState}
          state={state}
          title='Pelvis Exam Result'
        />

        <CustomInput
          defaultValue='No'
          inputNumber='(8/14)'
          inputType='options'
          name='SPF'
          options={['Yes', 'No']}
          setState={setState}
          state={state}
          title='Severe Pelvis Fracture'
        />

        <CustomInput
          defaultValue='Negative'
          inputNumber='(9/14)'
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
          inputNumber='(10/14)'
          inputType='options'
          name='PNR'
          options={['Yes', 'No']}
          setState={setState}
          state={state}
          title='Penetrating Trauma'
        />

        <CustomInput
          defaultValue='No'
          inputNumber='(11/14)'
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
          inputNumber='(12/14)'
          inputType='options'
          name='GCSEO'
          options={[
            'Spontaneously +4',
            'To Verbal Commend +3',
            'To Pain +2',
            'No Eye Opening +1',
            'Not Testable +0'
          ]}
          setState={setState}
          state={state}
          title='GCS Eye Opening'
        />

        <CustomInput
          defaultValue='Not Testable/Intubated +0'
          inputNumber='(13/14)'
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

        <CustomInput
          defaultValue='Not Testable +0'
          inputNumber='(14/14)'
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
        {
          showResults && !resultSerialNumber &&
          <p className="submit-error">An error occured when submitting prediction results. Please retry in a few minutes.</p>
        }
        {
          showResults  && resultSerialNumber &&
            <p className="submit-success">Record Serial Number <strong>{resultSerialNumber}</strong> to link patient data to prediction result.</p>
        }
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
