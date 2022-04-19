import { TopInfoButtons } from '../TopInfoButtons'

const modelInfo = {
  overview: {
    variables: 9,
    threshold: 0.0667
  },
  model1: {
    variables: 14,
    threshold: 0.079
  },
  model2: {
    variables: 14,
    threshold: 0.065
  },
  model3: {
    variables: 10,
    threshold: 0.067
  },
  model4: {
    variables: 10,
    threshold: 0.063
  },
  model5: {
    variables: 6,
    threshold: 0.073
  }
}

export const TopInfo = (params) => {
  const { model, top, setTop } = params

  return (
    <div className='top-info'>
      <TopInfoButtons setTop={setTop} />

      {
          top === 'overview' &&
            <>
              <p>
                Massive transfusion protocol (MTP) should be initiated when it is anticipated that a patient will need a massive blood transfusion (MT).
              </p>
              <p>
                We define a MT as needing 10 or more units of packed red blood cells (PRBC) within 24 hours. The decision to initiate MTP has traditionally been made via physician judgement, but scoring methods such as ABC score are popular tools for assisting in the decision making process.
              </p>
              <p>
                The following tool is aimed to predict which patients will need MTP using a comprehensive set of variables that will likely be available to the physician at the time of the decision. We also present predictions for Shock Index and ABC Score for the user.
              </p>
            </>
        }
      {
          top === 'default' &&
            <p>Please select from each tab to see More information</p>
        }
      {
          top === 'ui' &&
            <>
              <p>
                In this interface, we considered {modelInfo[model].variables} variables in our model, in order to provide you with the most accurate result.
              </p>
              <p>
                For all the numeric input, we designed slider for all of them, users can scroll across the slider to choose the number, the maximum and the minimum are shown on the two sides of the slider bar.
              </p>
              <p>
                For categorical input, we used radioButtons for all of them.
              </p>
            </>
        }
      {
          top === 'missing' &&
            <>
              <p>
                In this model, the only required input is the age of patients.
              </p>
              <p>
                For the text vitals variables, if each value is missing, we will use the defaulted value, which is shown on the slider bar at initial screen.
              </p>
              <p>
                If any one of the included examinations or tests is not performed, the default value is either negative or not performed.
              </p>
            </>
        }
      {
          top === 'criteria' &&
            <>
              <p>
                In this model, we have three criteria for initiating Massive Transfusion Protocol.
              </p>
              <ul>
                <p>
                  <li>&bull; Estimated Probability greater or equal to {modelInfo[model].threshold}.</li>
                </p>
                <p>
                  <li>&bull; Shock Index greater or equal to 1.</li>
                </p>
                {
                  model !== 'model5' &&
                    <p>
                      <li>&bull; ABC score greater or equal to 2.</li>
                    </p>
                }
              </ul>
            </>
        }

    </div>
  )
}
