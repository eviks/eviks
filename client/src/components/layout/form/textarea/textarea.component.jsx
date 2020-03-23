import React from 'react'
import PropTypes from 'prop-types'

import './textarea.style.scss'

const Textarea = ({ fieldName, options, onChange }) => {
  return (
    <div className="field">
      <div className="field-name">{fieldName}</div>
      <textarea
        className="textarea-field"
        {...options}
        onChange={e => onChange(e)}
      ></textarea>
    </div>
  )
}

Textarea.propTypes = {
  fieldName: PropTypes.string,
  options: PropTypes.object,
  onChange: PropTypes.func
}

export default Textarea
