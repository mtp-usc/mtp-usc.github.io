import { ThemeProvider } from '@emotion/react'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { useState } from 'react'
import { theme } from '../../utils/theme'

export const ModelOverview = () => {
  const [expanded, setExpanded] = useState(null)

  const handleChange = (panel) => (event) => {
    setExpanded(expanded === panel ? null : panel)
  }

  return (
    <>

      <ThemeProvider theme={theme}>
        <div className='div-overview'>

          <p style={{ marginBottom: 10 }}>To predict when a patient will need an MTP, we develop 5 models where we realized some experiments, reducing the number of variables included as well splitting the numerical variables into categories. Those models are:</p>

          <Accordion
            onChange={handleChange('model1')}
            expanded={expanded === 'model1'}
          >
            <AccordionSummary
              aria-controls='model1-content'
              id='model1'
            >
              <strong>Model 1 (M1)</strong>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                This is the base model where we used the 16 variables available.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            onChange={handleChange('model2')}
            expanded={expanded === 'model2'}
          >
            <AccordionSummary
              aria-controls='model2-content'
              id='model2'
            >
              <strong>Model 2 (M2)</strong>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                This model uses all the variables, but the following were split into categories:
              </p>
              <ul>
                <li><i>Diastolic Blood Pressure: </i>There were created 4 categories: Less than 62, between 63 and 110, between 111 and 187, and more or equal than 188.</li>
                <li><i>Respiration Rate: </i>There were created 5 categories: Less than 10, between 11 and 21, between 22 and 39, between 40 and 47, and more or equal than 48.</li>
                <li><i>Oxygen Saturation %: </i>There were created 4 categories: Less than 61, between 62 and 76, between 77 and 94, and more or equal than 95.</li>
                <li><i>GCS - Eye Opening: </i>This variable was treated as categorical rather than numerical.</li>
              </ul>
            </AccordionDetails>
          </Accordion>

          <Accordion
            onChange={handleChange('model3')}
            expanded={expanded === 'model3'}
          >
            <AccordionSummary
              aria-controls='model3-content'
              id='model3'
            >
              <strong>Model 3 (M3)</strong>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                This model only uses the following variables: age, systolic blood pressure, oxygen saturation, heart rate, pelvis exam result, FAST exam result, penetrating trauma, blunt trauma, and GCS - verbal response.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            onChange={handleChange('model4')}
            expanded={expanded === 'model4'}
          >
            <AccordionSummary
              aria-controls='model4-content'
              id='model4'
            >
              <strong>Model 4 (M4)</strong>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                This model uses the same variables as model 3, but the variable GCS - verbal response is treated as categorical.
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion
            onChange={handleChange('model5')}
            expanded={expanded === 'model5'}
          >
            <AccordionSummary
              aria-controls='model5-content'
              id='model5'
            >
              <strong>Model 5 (M5)</strong>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                This model only uses the following variables: age, systolic blood pressure, oxygen saturation, heart rate, pelvis exam result, blunt trauma, and GCS - motion response. Additionally, the following variables were split into categories:
              </p>
              <ul>
                <li><i>Age: </i>There were created 2 categories: Less than 39 and more than 40 years old.</li>
                <li><i>Oxygen Saturation %: </i>There were created 4 categories: Less than 61, between 62 and 76, between 77 and 94, and more or equal than 95.</li>
              </ul>
            </AccordionDetails>
          </Accordion>

          <p>The following table shows the performance of each model.</p>
        </div>
        <div className='div-table'>
          <div className='div-table__left'>
            <i className='top bottom'><strong>Model</strong></i>
            <p>M1</p>
            <p>M2</p>
            <p>M3</p>
            <p>M4</p>
            <p className='bottom'>M5</p>
          </div>
          <div className='div-table__right'>
            <i className='top bottom'><strong>AUC</strong></i>
            <i className='top bottom'><strong>Sensitivity</strong></i>
            <i className='top bottom'><strong>Specificity</strong></i>
            <i className='top bottom'><strong>Cutoff</strong></i>
            <i className='top bottom'><strong>TP</strong></i>
            <i className='top bottom'><strong>FP</strong></i>
            <i className='top bottom'><strong>TN</strong></i>
            <i className='top bottom'><strong>FN</strong></i>
            <i className='top bottom'><strong>Variables</strong></i>
            <i className='top bottom'><strong>Numerical</strong></i>
            <i className='top bottom'><strong>Categorical</strong></i>
            <p>0.858</p>
            <p>0.72</p>
            <p>0.849</p>
            <p>0.079</p>
            <p>18</p>
            <p>70</p>
            <p>394</p>
            <p>7</p>
            <p>16</p>
            <p>7</p>
            <p>9</p>
            <strong>0.893</strong>
            <p>0.88</p>
            <p>0.821</p>
            <p>0.065</p>
            <p>22</p>
            <p>83</p>
            <p>381</p>
            <p>3</p>
            <p>26</p>
            <p>21</p>
            <p>5</p>
            <p>0.872</p>
            <strong>0.92</strong>
            <p>0.836</p>
            <p>0.067</p>
            <strong>23</strong>
            <p>76</p>
            <p>388</p>
            <strong>2</strong>
            <p>10</p>
            <p>5</p>
            <p>5</p>
            <p>0.864</p>
            <strong>0.92</strong>
            <p>0.808</p>
            <p>0.063</p>
            <strong>23</strong>
            <p>89</p>
            <p>375</p>
            <strong>2</strong>
            <p>15</p>
            <p>11</p>
            <p>4</p>
            <p className='bottom'>0.872</p>
            <p className='bottom'>0.84</p>
            <strong className='bottom'>0.862</strong>
            <p className='bottom'>0.073</p>
            <p className='bottom'>21</p>
            <strong className='bottom'>64</strong>
            <strong className='bottom'>400</strong>
            <p className='bottom'>4</p>
            <p className='bottom'>8</p>
            <p className='bottom'>5</p>
            <p className='bottom'>3</p>
          </div>
        </div>
        <i style={{
          fontSize: 12,
          marginBottom: 15,
          marginTop: 5
        }}
        >*Bold values are referred to the best value for each metric.
        </i>

      </ThemeProvider>
    </>
  )
}
