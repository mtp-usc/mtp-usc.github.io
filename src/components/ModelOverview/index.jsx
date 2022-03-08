export const ModelOverview = () => {
  return (
    <>
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
    </>
  )
}
