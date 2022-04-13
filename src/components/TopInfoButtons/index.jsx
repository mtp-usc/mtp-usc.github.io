import { ThemeProvider } from '@emotion/react'
import { Button, ButtonGroup } from '@mui/material'
import { theme } from '../../utils/theme'

export const TopInfoButtons = ({ setTop }) => {
  return (
    <div className='info-buttons'>
      <ThemeProvider theme={theme}>

        <ButtonGroup
          variant='contained'
          aria-label='outlined primary button group'
          size='small'
        >
          <Button
            onClick={() => setTop('overview')}
          >Overview
          </Button>
          <Button
            onClick={() => setTop('ui')}
          >UI Style
          </Button>
          <Button
            onClick={() => setTop('missing')}
          >Missing Value
          </Button>

        </ButtonGroup>

        <ButtonGroup
          variant='contained'
          aria-label='outlined primary button group'
          size='small'
        >
          <Button
            onClick={() => setTop('criteria')}
          >Criteria
          </Button>
          <Button
            onClick={() => setTop('default')}
          >Reset
          </Button>
        </ButtonGroup>

      </ThemeProvider>

    </div>
  )
}
