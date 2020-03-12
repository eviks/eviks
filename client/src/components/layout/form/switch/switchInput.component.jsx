import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import './switchInput.style.scss'

const SwitchInput = ({ fieldName, options, onChange }) => {
  return (
    <div className="field">
      <div className="field-name">{fieldName}</div>
      <div className="radio-group">
        {options.map(option => (
          <Fragment key={option.input.id}>
            <input {...option.input} onChange={e => onChange(e)} />
            <label htmlFor={option.input.id}>{option.label}</label>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

SwitchInput.propTypes = {
  fieldName: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
}

export default SwitchInput
