import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './selectInput.style.scss'

const SelectInput = ({ fieldName, options, placeholder, onChange }) => {
  const [active, toggleActive] = useState(false)

  return (
    <div className="field">
      <div className="field-name">{fieldName}</div>
      <div className="select-box">
        <div className={`options-container ${active ? 'active' : ''}`}>
          {options.map(option => (
            <div key={option.input.id} className="option">
              <input
                className="radio"
                {...option.input}
                onClick={e => {
                  onChange(e)
                  toggleActive(!active)
                }}
              />
              <label htmlFor={option.input.id}>{option.label}</label>
            </div>
          ))}
        </div>
        <div className="selected" onClick={() => toggleActive(!active)}>
          {placeholder}
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </div>
  )
}

SelectInput.propTypes = {
  fieldName: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default SelectInput
