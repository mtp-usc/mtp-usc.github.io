import { useState } from 'react'
import { CustomInput } from '../CustomInput'

export const Model1 = () => {
  const [state, setState] = useState({
    age: 25,
    dbp: 120,
    sbp: 80,
    rr: 12,
    o2: 95,
    hr: 120,
    pr: 'Not Performed'
  })

  console.log(state)
  return (
    <>
      <CustomInput
        inputType='slide'
        title='Age'
        range={[16, 100]}
        defaultValue={25}
        name='age'
        setState={setState}
      />

      <CustomInput
        inputType='slide'
        title='Systolic Blood Pressure'
        description='(1st ED) (mm Hg)'
        range={[1, 200]}
        defaultValue={120}
        name='sbp'
        setState={setState}
      />

      <CustomInput
        inputType='slide'
        title='Diastolic Blood Pressure'
        description='(1st ED) (mm Hg)'
        range={[1, 200]}
        defaultValue={80}
        name='dbp'
        setState={setState}
      />

      <CustomInput
        inputType='slide'
        title='Respiratory Rate'
        description='(1st ED) (Breaths per minute)'
        range={[1, 40]}
        defaultValue={12}
        name='rr'
        setState={setState}
      />

      <CustomInput
        inputType='slide'
        title='Oxygen Saturation %'
        description='(1st ED) (O2%)'
        range={[1, 100]}
        defaultValue={12}
        name='o2'
        setState={setState}
      />

      <CustomInput
        inputType='slide'
        title='Heart Rate'
        description='(1st ED) (Beats per minute)'
        range={[1, 200]}
        defaultValue={120}
        name='hr'
        setState={setState}
      />

      <CustomInput
        inputType='options'
        title='Pelvis Exam Result'
        description='(12/14)'
        range={[1, 200]}
        defaultValue='Not Performed'
        name='pr'
        setState={setState}
        options={['Not Performed', 'Positive', 'Negative']}
      />

    </>
  )
}
