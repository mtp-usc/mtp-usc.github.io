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
  BLR: 0.906485,
  PLRN: 0.843454,
  PNR: 0.481155,
  FC: 0.377460,
  AGE: 0.025756,
  HR: 0.021960,
  SBP: -0.017905,
  O2: -0.030895,
  GCSVR: -0.388106,
  FRLPA: -0.492113,
  INTERCEPT: -0.041033
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
