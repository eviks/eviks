import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import './radio.style.scss'

const Radio = ({ options, size, onChange }) => {
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
          {option.icon ? (
            <Fragment>
              <div className={`checkmark checkmark-${size}`}>{option.icon}</div>
              <span className="radio-label">{option.label}</span>
            </Fragment>
          ) : (
            <span className={`checkmark checkmark-${size}`}>
              {option.label}
            </span>
          )}
        </label>
      ))}
    </Fragment>
  )
}

Radio.defaultProps = {
  size: 'md'
}

Radio.propTypes = {
  options: PropTypes.array,
  size: PropTypes.string,
  onChange: PropTypes.func
}

export default Radio
