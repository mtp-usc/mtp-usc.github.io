import { useEffect } from 'react'

export const initialState = {
  AGE: 25,
  SBP: 120,
  O2: 80,
  HR: 120,
  PR: 'Not Performed',
  SPF: 'No',
  FC: false,
  FRLPA: false,
  PNR: 'No',
  BLR: 'No',
  GCSVR: 'Not Testable/Intubated +0',
  INTERCEPT: 1
}

export const coef = {
  BLR: 0.888268,
  PLRN: 0.771484,
  GCSVR_C1: 0.489351,
  PNR: 0.472831,
  FC: 0.314009,
  GCSVR_C2: 0.209177,
  PLRA: 0.187797,
  GCSVR_C3: 0.055359,
  AGE: 0.024492,
  HR: 0.020412,
  SBP: -0.017623,
  GCSVR_C4: -0.030220,
  O2: -0.040032,
  FRLPA: -0.465055,
  GCSVR_C5: -0.791150,
  INTERCEPT: -0.067483

}

const THRESHOLD = 0.079345094

const predictionModel = ({ state, setIsMTP }) => {
  const tempState = { ...state }
  tempState.INTERCEPT = 1
  tempState.SPF = tempState.SPF === 'Yes' ? 1 : 0
  tempState.PNR = tempState.PNR === 'Yes' ? 1 : 0
  tempState.BLR = tempState.BLR === 'Yes' ? 1 : 0
  tempState.PLRA = 0
  tempState.PLRN = 0

  tempState.GCSVR_C1 = 0
  tempState.GCSVR_C2 = 0
  tempState.GCSVR_C3 = 0
  tempState.GCSVR_C4 = 0
  tempState.GCSVR_C5 = 0

  switch (tempState.GCSVR) {
    case 'Oriented +5':
      tempState.GCSVR_C5 = 1
      break
    case 'Confused +4':
      tempState.GCSVR_C4 = 1
      break
    case 'Inappropiate Words +3':
      tempState.GCSVR_C3 = 1
      break
    case 'Incomprehensible Sounds +2':
      tempState.GCSVR_C2 = 1
      break
    case 'No Verbal Response +1':
      tempState.GCSVR_C1 = 1
      break
  }

  switch (tempState.PR) {
    case 'Positive':
      tempState.PLRN = 1
      break
    case 'Negative':
      tempState.PLRA = 1
      break
  }

  let prediction = 0
  Object.keys(coef).forEach((key) => {
    prediction += tempState[key] * coef[key]
  })
  prediction = 1 / (1 + Math.exp(-prediction))
  const SI = tempState.HR / tempState.SBP

  let ABC = 0
  ABC += tempState.PNR ? 1 : 0
  ABC += tempState.SBP > 90 ? 1 : 0
  ABC += tempState.HR > 120 ? 1 : 0
  ABC += tempState.FC + tempState.FRLPA > 0 ? 1 : 0

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
    },
    ABC: {
      protocol: ABC >= 2,
      label: ABC >= 2 ? 'should' : "shouldn't",
      prediction: ABC
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
