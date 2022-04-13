import Slider from '@mui/material/Slider'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Checkbox, FormControlLabel } from '@mui/material'
import { theme } from '../../utils/theme'
import { ThemeProvider } from '@emotion/react'
export const CustomInput = (params) => {
  const {
    defaultValue,
    title,
    description,
    range,
    setState,
    name,
    inputType,
    options,
    state,
    inputNumber
  } = params

  const onChangeSlider = e => setState(previous => {
    return { ...previous, [e.target.name]: Number(e.target.value) }
  })

  const onChangeOption = e => setState(previous => {
    return { ...previous, [e.target.name]: e.target.value }
  })

  const onChangeCheckbox = (e) => setState(previous => {
    return { ...previous, [e.target.name]: !previous[e.target.name] }
  })

  return (
    <ThemeProvider theme={theme}>
      <div className='div-input-card'>
        <h1 className='div-input-card__title'>{title} <span className='div-input-card__number'>{inputNumber}</span></h1>
        {description && <p className='div-input-card__descrption'>{description}</p>}
        <div className='div-input-card__input'>
          {
            inputType === 'slide' && (

              <>
                <div className='div-input-card__input__slide'>

                  <Slider
                    defaultValue={defaultValue}
                    step={1}
                    min={range[0]}
                    max={range[1]}
                    value={state[name]}
                    marks={[
                      {
                        value: range[0],
                        label: `${range[0]}`
                      },
                      {
                        value: range[1],
                        label: `${range[1]}`
                      }
                    ]}
                    name={name}
                    onChange={onChangeSlider}
                  />
                </div>

                <input
                  className='div-input-card__input__value'
                  onChange={onChangeSlider}
                  value={state[name]}
                  type='number'
                  name={name}
                />

              </>
            )

          }
          {
            inputType === 'options' &&
              <Select
                value={state[name]}
                onChange={onChangeOption}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                name={name}
              >
                {options.map(element =>
                  <MenuItem
                    key={element}
                    value={element}

                  >
                    {element}
                  </MenuItem>
                )}
              </Select>
        }

          {

            inputType === 'checkbox' &&

              <div>
                {
                  options.map(element =>
                    <FormControlLabel
                      key={element.name}
                      control={<Checkbox />}
                      label={element.label}
                      value
                      name={element.name}
                      onChange={onChangeCheckbox}
                      checked={state[element.name]}
                    />
                  )
                }
              </div>

        }
        </div>
      </div>

    </ThemeProvider>

  )
}
