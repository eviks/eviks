import React from 'react'
import PropTypes from 'prop-types'

import './checkbox.style.scss'

const Checkbox = ({ label, showFieldName, options, onChange }) => {
  return (
    <div className="field">
      {showFieldName && <div className="field-name"></div>}
      <label htmlFor={options.id} className="checkbox-label">
        <input {...options} type="checkbox" onChange={onChange} />
        <span className="checkmark"></span>
        <div>{label}</div>
      </label>
    </div>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  showFieldName: PropTypes.bool,
  options: PropTypes.object,
  onChange: PropTypes.func
}

export default Checkbox
