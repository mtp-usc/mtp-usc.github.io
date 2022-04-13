export const ModelOverview = () => {
  return (
    <>
      <div className='div-overview'>

        <p>To predict when a patient will need an MTP, we develop 5 models where we realized some experiments, reducing the number of variables included as well splitting the numerical variables into categories. Those models are:</p>
        <p><strong>Model 1 (M1): </strong>This is the base model where we used the 16 variables available.</p>
        <p><strong>Model 2 (M2): </strong>This model uses all the variables, but the following were split into categories:</p>
        <ul>
          <li><i>Diastolic Blood Pressure: </i>There were created 4 categories: Less than 62, between 63 and 110, between 111 and 187, and more or equal than 188.</li>
          <li><i>Respiration Rate: </i>There were created 5 categories: Less than 10, between 11 and 21, between 22 and 39, between 40 and 47, and more or equal than 48.</li>
          <li><i>Oxygen Saturation %: </i>There were created 4 categories: Less than 61, between 62 and 76, between 77 and 94, and more or equal than 95.</li>
          <li><i>GCS - Eye Opening: </i>This variable was treated as categorical rather than numerical.</li>
        </ul>
        <p><strong>Model 3 (M3): </strong>This model only uses the following variables: age, systolic blood pressure, oxygen saturation, heart rate, pelvis exam result, FAST exam result, penetrating trauma, blunt trauma, and GCS - verbal response.</p>
        <p><strong>Model 4 (M4): </strong>This model uses the same variables as model 3, but the variable GCS - verbal response is treated as categorical.</p>
        <p><strong>Model 5 (M5): </strong>This model only uses the following variables: age, systolic blood pressure, oxygen saturation, heart rate, pelvis exam result, blunt trauma, and GCS - motion response. Additionally, the following variables were split into categories:</p>
        <ul>
          <li><i>Age: </i>There were created 2 categories: Less than 39 and more than 40 years old.</li>
          <li><i>Oxygen Saturation %: </i>There were created 4 categories: Less than 61, between 62 and 76, between 77 and 94, and more or equal than 95.</li>
        </ul>
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
          <i className='top bottom'><strong>AFN</strong></i>
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
          <p>0.893</p>
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
          <p>0.92</p>
          <p>0.836</p>
          <p>0.067</p>
          <p>23</p>
          <p>76</p>
          <p>388</p>
          <p>2</p>
          <p>10</p>
          <p>5</p>
          <p>5</p>
          <p>0.864</p>
          <p>0.92</p>
          <p>0.808</p>
          <p>0.063</p>
          <p>23</p>
          <p>89</p>
          <p>375</p>
          <p>2</p>
          <p>15</p>
          <p>11</p>
          <p>4</p>
          <p className='bottom'>0.872</p>
          <p className='bottom'>0.84</p>
          <p className='bottom'>0.862</p>
          <p className='bottom'>0.073</p>
          <p className='bottom'>21</p>
          <p className='bottom'>64</p>
          <p className='bottom'>400</p>
          <p className='bottom'>4</p>
          <p className='bottom'>8</p>
          <p className='bottom'>5</p>
          <p className='bottom'>3</p>
        </div>

      </div>
    </>
  )
}
