import { Logo } from '../Logo'
const LogoSize = 100
export const Header = () => {
  return (
    <div className='header'>

      <div className='header-title'>
        <h1>Massive Blood Transfusion Prediction in Trauma Patients</h1>
        <Logo className='logo' width={LogoSize} height={LogoSize} />
      </div>
      <h2>Usability Surveys</h2>
      <p>
        <strong>1.</strong>  Please complete the {}
        <a href='https://docs.google.com/forms/d/e/1FAIpQLSf4OFb47nXxH-alEAhS0pK9W9RJlwJDZV_XxmgpoINMGxPFSA/viewform' target='_blank' rel='noreferrer'>Systems Usability Surver</a> {}
        after testing the app.
      </p>
      <p>
        <strong>2.</strong> Please complete the {}
        <a href='https://docs.google.com/forms/d/e/1FAIpQLSf4OFb47nXxH-alEAhS0pK9W9RJlwJDZV_XxmgpoINMGxPFSA/viewform' target='_blank' rel='noreferrer'>Usefulness, Satisfaction, and Ease of Use questionnaire</a> {}
        after testing the app.
      </p>
    </div>
  )
}
