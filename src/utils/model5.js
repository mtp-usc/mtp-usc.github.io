import { useEffect } from 'react'

export const AGE_CLASSES = {
  C0: 'Less than 40 years',
  C1: 'More or equal to 40 years'
}

export const O2_CLASSES = {
  C0: 'Less than 61%',
  C1: 'Between 62% and 76%',
  C2: 'Between 77% and 94%',
  C3: 'More or equal than 95%'
}

export const initialState = {
  AGE: AGE_CLASSES.C0,
  SBP: 120,
  O2: O2_CLASSES.C2,
  HR: 120,
  PR: 'Not Performed',
  SPF: 'No',
  FC: false,
  FRLPA: false,
  PNR: 'No',
  BLR: 'No',
  GCSEO: 'Not Testable +0',
  GCSVR: 'Not Testable/Intubated +0',
  GCSMR: 'Not Testable +0',
  INTERCEPT: 1
}

export const coef = {
  BLR: 0.90953739,
  AGE_C1: 0.51961701,
  O2_C2: 0.34700517,
  HR: 0.01612016,
  SBP: -0.02161408,
  O2_C1: -0.02425944,
  GCSMR: -0.32412496,
  O2_C3: -0.56184593,
  INTERCEPT: -0.29867478
}

const THRESHOLD = 0.079345094

const predictionModel = ({ state, setIsMTP }) => {
  const tempState = { ...state }
  tempState.INTERCEPT = 1

  tempState.O2_C1 = 0
  tempState.O2_C2 = 0
  tempState.O2_C3 = 0

  switch (tempState.O2) {
    case O2_CLASSES.C1:
      tempState.O2_C1 = 1
      break
    case O2_CLASSES.C2:
      tempState.O2_C2 = 1
      break
    case O2_CLASSES.C3:
      tempState.O2_C3 = 1
      break
  }

  tempState.AGE_C1 = 0

  tempState.AGE === AGE_CLASSES.C1 && (tempState.AGE_C1 = 1)

  tempState.GCSMR_C1 = 0
  tempState.GCSMR_C2 = 0
  tempState.GCSMR_C3 = 0
  tempState.GCSMR_C4 = 0
  tempState.GCSMR_C5 = 0
  tempState.GCSMR_C6 = 0

  switch (tempState.GCSMR) {
    case 'Obeys Commands +6':
      tempState.GCSMR_C6 = 6
      break
    case 'Localizes Pain +5':
      tempState.GCSMR_C5 = 5
      break
    case 'Withdrawal from Pain +4':
      tempState.GCSMR_C4 = 4
      break
    case 'Flexion to Pain +3':
      tempState.GCSMR_C3 = 3
      break
    case 'Extension to Pain +2':
      tempState.GCSMR_C2 = 2
      break
    case 'No Motor Response +1':
      tempState.GCSMR_C1 = 1
      break
  }

  tempState.SPF = tempState.SPF === 'Yes' ? 1 : 0
  tempState.PNR = tempState.PNR === 'Yes' ? 1 : 0
  tempState.BLR = tempState.BLR === 'Yes' ? 1 : 0
  tempState.PLRA = 0
  tempState.PLRN = 0

  switch (tempState.PR) {
    case 'Positive':
      tempState.PLRN = 1
      break
    case 'Negative':
      tempState.PLRA = 1
      break
  }

  switch (tempState.GCSVR) {
    case 'Oriented +5':
      tempState.GCSVR = 5
      break
    case 'Confused +4':
      tempState.GCSVR = 4
      break
    case 'Inappropiate Words +3':
      tempState.GCSVR = 3
      break
    case 'Incomprehensible Sounds +2':
      tempState.GCSVR = 2
      break
    case 'No Verbal Response +1':
      tempState.GCSVR = 1
      break
    default:
      tempState.GCSVR = 0
      break
  }

  switch (tempState.GCSMR) {
    case 'Obeys Commands +6':
      tempState.GCSMR = 6
      break
    case 'Localizes Pain +5':
      tempState.GCSMR = 5
      break
    case 'Withdrawal from Pain +4':
      tempState.GCSMR = 4
      break
    case 'Flexion to Pain +3':
      tempState.GCSMR = 3
      break
    case 'Extension to Pain +2':
      tempState.GCSMR = 2
      break
    case 'No Motor Response +1':
      tempState.GCSMR = 1
      break
    default:
      tempState.GCSMR = 0
      break
  }

  let prediction = 0
  Object.keys(coef).forEach((key) => {
    prediction += tempState[key] * coef[key]
  })
  prediction = 1 / (1 + Math.exp(-prediction))
  const SI = tempState.HR / tempState.SBP

  setIsMTP(previous => ({
    ...previous,
    model: {
      protocol: prediction > THRESHOLD,
      label: prediction > THRESHOLD ? 'should' : "shouldn't",
      prediction
    },
    SI: {
      protocol: SI >= 1,
      label: SI >= 1 ? 'should' : "shouldn't",
      prediction: SI
    }
  }))
}

export const usePredictionModel = () => {
  const recalculatePrediction = ({ state, setIsMTP }) => {
    useEffect(() => {
      predictionModel({ state, setIsMTP })
    }, [state])
  }
  return recalculatePrediction
}
