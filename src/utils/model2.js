import { useEffect } from 'react'

export const DBP_CLASSES = {
  C0: 'Less than 62',
  C1: 'Between 63 and 110',
  C2: 'Between 111 and 187',
  C3: 'More or equal than 188'
}

export const RR_CLASSES = {
  C0: 'Less than 10',
  C1: 'Between 11 and 21',
  C2: 'Between 22 and 39',
  C3: 'Between 40 and 47',
  C4: 'More or equal than 48'
}

export const O2_CLASSES = {
  C0: 'Less than 61%',
  C1: 'Between 62% and 76%',
  C2: 'Between 77% and 94%',
  C3: 'More or equal than 95%'
}

export const initialState = {
  AGE: 25,
  DBP: DBP_CLASSES.C2,
  SBP: 120,
  RR: RR_CLASSES.C2,
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
  AGE: 0.023330,
  BLR: 0.759472,
  DBP_C1: -0.507755,
  DBP_C2: 0.712088,
  DBP_C3: -0.003424,
  FC: 0.277094,
  FRLPA: -0.594136,
  GCSEO_C1: -0.153282,
  GCSEO_C2: 0.139984,
  GCSEO_C3: 0.122044,
  GCSEO_C4: -0.363056,
  GCSMR: -0.271706,
  GCSVR: -0.106724,
  HR: 0.014272,
  INTERCEPT: -0.254309,
  O2_C1: -0.043937,
  O2_C2: 0.283156,
  O2_C3: -0.429971,
  PLRA: 0.222336,
  PLRN: 0.810265,
  PNR: 0.405756,
  RR_C1: -0.367808,
  RR_C2: 0.226070,
  RR_C3: -0.135370,
  RR_C4: 0.144202,
  SBP: -0.022975,
  SPF: 0.362566
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

  tempState.RR_C1 = 0
  tempState.RR_C2 = 0
  tempState.RR_C3 = 0
  tempState.RR_C4 = 0

  switch (tempState.RR) {
    case RR_CLASSES.C1:
      tempState.RR_C1 = 1
      break
    case RR_CLASSES.C2:
      tempState.RR_C2 = 1
      break
    case RR_CLASSES.C3:
      tempState.RR_C3 = 1
      break
    case RR_CLASSES.C4:
      tempState.RR_C4 = 1
      break
  }

  tempState.DBP_C1 = 0
  tempState.DBP_C2 = 0
  tempState.DBP_C3 = 0

  switch (tempState.DBP) {
    case DBP_CLASSES.C1:
      tempState.DBP_C1 = 1
      break
    case DBP_CLASSES.C2:
      tempState.DBP_C2 = 1
      break
    case DBP_CLASSES.C3:
      tempState.DBP_C3 = 1
      break
  }

  tempState.GCSEO_C1 = 0
  tempState.GCSEO_C2 = 0
  tempState.GCSEO_C3 = 0
  tempState.GCSEO_C4 = 0

  switch (tempState.GCSEO) {
    case 'Spontaneously +4':
      tempState.GCSEO_C4 = 4
      break
    case 'To Verbal Commend +3':
      tempState.GCSEO_C3 = 3
      break
    case 'To Pain +2':
      tempState.GCSEO_C2 = 2
      break
    case 'No Eye Opening +1':
      tempState.GCSEO_C1 = 1
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
