import { useEffect } from 'react'

export const initialState = {
  AGE: 25,
  DBP: 80,
  SBP: 120,
  RR: 12,
  O2: 80,
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
  AGE: 0.028639,
  BLR: 0.733616,
  DBP: 0.026174,
  FC: 0.368150,
  FRLPA: -0.468946,
  GCSEO: -0.273304,
  GCSMR: -0.203207,
  GCSVR: -0.039935,
  HR: 0.017893,
  INTERCEPT: -0.053250,
  O2: -0.028192,
  PLRA: 0.142923,
  PLRN: 0.756816,
  PNR: 0.418793,
  RR: 0.037764,
  SBP: -0.037519,
  SPF: 0.326484
}

const THRESHOLD = 0.079345094

const scriptUrl = "https://script.google.com/macros/s/AKfycbxA6nQ1qegL-3iBwI0Q0G-gPkR59YbRgYhUvUSpruVT2RMeSSwnUwXiET9VZGhHJ61MHQ/exec"

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

  switch (tempState.GCSEO) {
    case 'Spontaneously +4':
      tempState.GCSEO = 4
      break
    case 'To Verbal Commend +3':
      tempState.GCSEO = 3
      break
    case 'To Pain +2':
      tempState.GCSEO = 2
      break
    case 'No Eye Opening +1':
      tempState.GCSEO = 1
      break
    default:
      tempState.GCSEO = 0
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

export const submitData = ({ state, isMTP, setResultSerialNumber }) => {
  // Send a POST request to App Script.
  let requestBody = {
    ...state
  }
  requestBody['model'] = isMTP.model.prediction
  requestBody['SI'] = isMTP.SI.prediction
  requestBody['ABC'] = isMTP.ABC.prediction

  fetch(scriptUrl, {method: 'POST', body: requestBody})
  .then(res => {
      console.log(res)
      setResultSerialNumber(res.serialNumber)
  })
  .catch(err => console.log(err))
}
