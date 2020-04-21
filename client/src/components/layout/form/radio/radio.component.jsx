import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import './radio.style.scss'

const Radio = ({ options, onChange }) => {
  return (
    <Fragment>
      {options.map(option => (
        <label className="radio-container" key={option.input.id}>
          <input
            type="radio"
            {...option.input}
            onChange={e => onChange(e)}
            onClick={e => onChange(e)}
          />
          <span className="checkmark">{option.label}</span>
        </label>
      ))}
    </Fragment>
  )
}

Radio.propTypes = {
  fieldName: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
}

export default Radio
