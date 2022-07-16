// Link to Google App Script Deployment, can be found in Deployment - Web app - URL.
// Update if creating a new deployment version of the App Script.
const scriptUrl = "https://script.google.com/macros/s/AKfycbzF4piYCsyh3cW3RkbT24O87jQczGN88FIDtYySYKuTEat2GnY4R2sPtwTKiW9DT_GK8Q/exec"

// Send a POST request to App Script.
export const submitData = ({ state, isMTP, setShowResults, setResultSerialNumber, modelNum }) => {
    let requestBody = {
      ...state
    }
    if (isMTP.model) {
        requestBody['model'] = isMTP.model.prediction
        requestBody['model_label'] = isMTP.model ? isMTP.model.label : undefined
    }
    if (isMTP.SI) {
        requestBody['SI'] = isMTP.SI.prediction
        requestBody['SI_label'] = isMTP.SI.label
    }
    if (isMTP.ABC) {
        requestBody['ABC'] = isMTP.ABC.prediction
        requestBody['ABC_label'] = isMTP.ABC.label
    }
    requestBody['modelNum'] = modelNum
  
    fetch(scriptUrl, {
      method: 'POST',
      body: JSON.stringify(
        requestBody
      ),})
    .then(res => {
        console.log(res)
        res.json().then(json => {
          // Receives App Script property serial number as response.
          setResultSerialNumber(json.serialNumber)
        })
    })
    .catch(err => console.log(err))
    .finally(() => {
      setShowResults(true)
    }) 
  }