import Slider from '@mui/material/Slider'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

export const CustomInput = (params) => {
  const {
    defaultValue,
    title,
    description,
    range,
    setState,
    name,
    inputType,
    options
  } = params

  const onChange = (e) => setState(previous => {
    return { ...previous, [e.target.name]: e.target.value }
  })

  const marks = [
    {
      value: range[0],
      label: `${range[0]}`
    },
    {
      value: range[1],
      label: `${range[1]}`
    }
  ]

  return (
    <>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <div style={{ width: 200, marginTop: 50 }}>
        {
            inputType === 'slide' &&
              <Slider
                aria-label='Always visible'
                defaultValue={defaultValue}
                step={1}
                min={range[0]}
                max={range[1]}
                valueLabelDisplay='on'
                marks={marks}
                name={name}
                onChange={onChange}
              />
        }
        {
            inputType === 'options' &&
              <Select
                label='Age'
                value={defaultValue}
              >
                {options.map(element =>
                  <MenuItem
                    key={element}
                    value={element}
                    name={name}
                    onChange={onChange}
                  >
                    {element}
                  </MenuItem>
                )}

              </Select>
        }
      </div>

    </>

  )
}
