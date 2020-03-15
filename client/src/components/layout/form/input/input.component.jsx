import React from 'react'
import PropTypes from 'prop-types'

import './input.style.scss'

const TextInput = ({ fieldName, options, onChange }) => {
  return (
    <div className="field">
      <div className="field-name">{fieldName}</div>
      <input
        className="input-field"
        type="text"
        {...options}
        onChange={e => onChange(e)}
      />
    </div>
  )
}

TextInput.propTypes = {
  fieldName: PropTypes.string,
  options: PropTypes.object,
  onChange: PropTypes.func
}

export default TextInput
